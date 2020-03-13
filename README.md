# Chainlink Gas Price Update Service

This service will get the gas price for multiple gas reporting sites and update your Chainlink node with the max "fast" value of the endpoints every minute.

Currently tested endpoints are:
- [ETH Gas Station](https://ethgasstation.info/json/ethgasAPI.json)
- [Anyblock Analytics](https://api.anyblock.tools/latest-minimum-gasprice)
- [POA Network](https://gasprice.poa.network)
- [Etherchain](https://etherchain.org/tools/gasPriceOracle)

Using the environment variables, you may add more data sources.

## Environment Variables

### Required environment variables to change

- `CL_EMAIL`: The API email address you use to log into the Chainlink node's GUI.
- `CL_PASSWORD`: The API password you use to log into the Chainlink node's GUI.
- `CL_URL`: The URL that your Chainlink node is listening on.
    - Default value: `'http://localhost:6688'`

### Optional environment variables to change

The `URLS`, `FIELDS`, and `WEI` environment variables need to use the same index for their respective values.

- `URLS`: Comma-separated list of URLs to fetch gas price info
    - Default value: `'https://ethgasstation.info/json/ethgasAPI.json,https://api.anyblock.tools/latest-minimum-gasprice,https://gasprice.poa.network'`
- `FIELDS`: Comma-separated list of fields to parse of the response
    - Default value: `'fast,fast,fast'`
- `WEI`: Comma-separated list of values to multiply the result by to equal wei
    - Default value: `'100000000,1000000000,1000000000'`
- `FALLBACK_GAS_PRICE`: The gas price (measured in wei) to be used if all data sources are down.
    - Default value: `25000000000`
- `ADD_GAS_PRICE`: The amount of gas (in wei) to add to the max of the gas price results.
    - Default value: `1000000000`
- `MAX_GAS_PRICE`: The maximum gas price to send to the node if the data feeds respond with a higher value.
    - Default value: `1000000000000`
- `LOG_LEVEL`: The log level for the output.
    - Default value: `'info'`
- `CRON_SCHEDULE`: The Cron schedule to use for updating gas prices (6 places)
    - Default value: `'0 * * * * *'`


## Running with Docker

If running the Chainlink node on its own Docker container on the same machine, `CL_URL` will likely need to be updated to that machine's IP, or the Docker interface gateway IP (usually 172.17.0.1).

```
docker run --restart unless-stopped -it -e CL_URL=http://172.17.0.1:6688 -e CL_EMAIL=user@example.com -e CL_PASSWORD=my_password thodges/cl-gas-updater
```

However, if you have named your Chainlink container by adding `--name chainlink` to its run command, then you can link to it while running the cl-gas-updater container by also adding `--link chainlink` to your run command.

```
docker run --restart unless-stopped --link chainlink -it -e CL_URL=http://chainlink:6688 -e CL_EMAIL=user@example.com -e CL_PASSWORD=my_password thodges/cl-gas-updater
```

Alternatively you can build the container yourself and run that:

```
docker build . -t cl-gas-updater
```

## Running with Kubernetes

If you are running your Chainlink node within Kubernetes (following the [Secure Data Links tutorial](https://medium.com/secure-data-links/running-chainlink-nodes-on-kubernetes-and-the-google-cloud-platform-1fab922b3a1a)), a service must first be created that exposes your pods locally so we can create a new pod for the gas updater. TO do this run the command

```
kubectl expose deployment.apps/chainlink-deployment
```

You may have a different deployment name however, in this case replace the above with 

```
kubectl expose DEPLOYMENT_NAME
```

where DEPLOYMENT_NAME is your chainlink node deployment name.

Once this is done, simply edit the deploy.yaml file and enter your Chainlink username and password, along with your new services IP as the Chainlink URL. This IP can again be found using

```
kubectl get all

```

and finding the newely deployed service (service/chainlink-deployment)

Finally to run the cl-gas-updater, use the command

```
kubectl apply -f deploy.yaml
```

You should now see your new gas price updater pod running. To confirm the pod is running correctly, simply get the logs of the pod using
```
kubectl logs gas-updater
```

You should see the pod logging the latest pulled gas price.

## Running locally (for testing and development)

Install dependencies

```
npm install
```

Run the application

```
node app.js
```
