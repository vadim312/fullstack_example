import { Handler, APIGatewayEvent, Context } from "aws-lambda";
import * as uuid from "uuid";
import { dynamoDb } from "../util/dynamoHelper";
import { errorResponse, successResponse } from "../util/responseHelper";

export const create: Handler = async (
  event: APIGatewayEvent,
  context: Context
) => {
  const timestamp = new Date().getTime();
  if (!event.body) return errorResponse(400, `Body is required`);
  const data = JSON.parse(event.body);
  if (typeof data.title !== "string" || typeof data.description !== "string") {
    console.error("Validation Failed");
    return errorResponse(400, `Field 'title' and 'description' is required`);
  }

  const params = {
    TableName: process.env.DYNAMODB_TABLE as string,
    Item: {
      id: uuid.v1(),
      title: data.title,
      description: data.description,
      published: false,
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  };

  // write the todo to the database
  try {
    const res = await dynamoDb.put(params).promise();
    return successResponse(params.Item);
  } catch (error) {
    console.error(error);
    return errorResponse(400, "Couldn't create the todo item.");
  }
};
