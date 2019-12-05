# Chainlink Gas Price Update Service

This service will get the gas price for multiple gas reporting sites and update your Chainlink node with the max "fast" value of the endpoints every minute.

Currently supported endpoints are:
- [ETH Gas Station](https://ethgasstation.info/json/ethgasAPI.json)
- [Anyblock Analytics](https://api.anyblock.tools/latest-minimum-gasprice)
- [POA Network](https://gasprice.poa.network)

## Environment Variables

- `CL_URL`: The URL that your Chainlink node is listening on.
- `CL_EMAIL`: The API email address you use to log into the Chainlink node's GUI.
- `CL_PASSWORD`: The API password you use to log into the Chainlink node's GUI.
- `FALLBACK_GAS_PRICE`: The gas price (measured in wei) to be used if all data sources are down. Will default to 20 Gwei if not set (and all data sources are down).

## Running with Docker

If running the Chainlink node on its own Docker container on the same machine, `CL_URL` will likely need to be updated to that machine's IP, or the Docker interface gateway IP (usually 172.17.0.1).

```
docker run -it -e CL_URL=http://172.17.0.1:6688 -e CL_EMAIL=user@example.com -e CL_PASSWORD=my_password thodges/cl-gas-updater
```

However, if you have named your Chainlink container by adding `--name chainlink` to its run command, then you can link to it while running the cl-gas-updater container by also adding `--link chainlink` to your run command.

```
docker run --link chainlink -it -e CL_URL=http://chainlink:6688 -e CL_EMAIL=user@example.com -e CL_PASSWORD=my_password thodges/cl-gas-updater
```

Alternatively you can build the container yourself and run that:

```
docker build . -t cl-gas-updater
```

## Running locally (for testing and development)

Install dependencies

```
npm install
```

Run the application

```
node app.js
```
