# Serverless REST API with DynamoDB and offline support

This example demonstrates how to run a service locally, using the
[serverless-offline](https://github.com/dherault/serverless-offline) plugin. It
provides a REST API to manage Todos stored in a DynamoDB, similar to the
[aws-node-rest-api-with-dynamodb](https://github.com/serverless/examples/tree/master/aws-node-rest-api-with-dynamodb)
example. A local DynamoDB instance is provided by the
[serverless-dynamodb-local](https://github.com/99xt/serverless-dynamodb-local)
plugin.

## Use-case

Test your service locally, without having to deploy it first.

## Setup

Note: Your node version must be v15.4 or below, or POST requests will not work with serverless offline.
PS: I tested it on node version v17.9, it worked fine on Mac. probably won't work on Windows.

```bash
npm i -g serverless@2.72.3
npm install or yarn install
serverless dynamodb install (or to use a persistent docker dynamodb instead, open a new terminal: cd ./dynamodb && docker-compose up -d)
serverless offline start (This will automatically migrate schema)
serverless dynamodb migrate (this imports schema)
```

## Run service offline

```bash
serverless offline start
```

## Run front-end
Go to frontend directory and run following command. Then you will test CRUD on front-end side.

```bash
npm install or yarn install
npm start or yarn start
```

## Usage

You can create, retrieve, update, or delete todos with the following commands:

### Create a Todo

```bash
curl -X POST -H "Content-Type:application/json" http://localhost:4000/dev/todos --data '{ "title":"Tutorial1","description": "Learn Serverless" }'
```

Example Result:
```bash
{"title":"Tutorial1","description":"Learn Serverless","id":"ee6490d0-aa11e6-9ede-afdfa051af86","createdAt":1479138570824,"published":false,"updatedAt":1479138570824}%
```

### List all Todos

```bash
curl -H "Content-Type:application/json" http://localhost:4000/dev/todos
```

Example output:
```bash
[{"title":"Tutorial1","description":"Deploy my first service","id":"ac90feaa11e6-9ede-afdfa051af86","published":true,"updatedAt":1479139961304},{"title":"Tutorial2","description":"Learn Serverless","id":"206793aa11e6-9ede-afdfa051af86","createdAt":1479139943241,"published":false,"updatedAt":1479139943241}]%
```

### Get one Todo

```bash
# Replace the <id> part with a real id from your todos table
curl -H "Content-Type:application/json" http://localhost:4000/dev/todos/<id>
```

Example Result:
```bash
{"title":"Tutorial1","description":"Learn Serverless","id":"ee6490d0-aa11e6-9ede-afdfa051af86","createdAt":1479138570824,"published":false,"updatedAt":1479138570824}%
```

### Update a Todo

```bash
# Replace the <id> part with a real id from your todos table
curl -X PUT -H "Content-Type:application/json" http://localhost:4000/dev/todos/<id> --data '{ "title": "Learn Serverless", "published": true }'
```

Example Result:
```bash
{"title":"Tutorial1","description":"Learn Serverless","id":"ee6490d0-aa11e6-9ede-afdfa051af86","createdAt":1479138570824,"published":true,"updatedAt":1479138570824}%
```

### Remove one Todo

```bash
# Replace the <id> part with a real id from your todos table
curl -X DELETE http://localhost:4000/dev/<id> -H "Content-Type:application/json"
```

Example Result:
```bash
{}
```

No output