import { DynamoDB } from "aws-sdk";

export const dynamoDb = new DynamoDB.DocumentClient({
  region: "us-east-1",
  endpoint: "http://localhost:19000",
  accessKeyId: "xxxx",
  secretAccessKey: "xxxx",
});
