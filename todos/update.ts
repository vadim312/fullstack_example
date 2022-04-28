import { Handler, APIGatewayEvent, Context } from "aws-lambda";
import { dynamoDb } from "../util/dynamoHelper";
import { errorResponse, successResponse } from "../util/responseHelper";

export const update: Handler = async (
  event: APIGatewayEvent,
  context: Context
) => {
  const timestamp = new Date().getTime();
  if (!event.body) return errorResponse(400, `Body is required`);
  const data = JSON.parse(event.body);

  // validation
  if (
    typeof data.title !== "string" ||
    typeof data.description !== "string" ||
    typeof data.published !== "boolean"
  ) {
    console.error("Validation Failed");
    return errorResponse(400, `Couldn't update the todo item`);
  }

  const params = {
    TableName: process.env.DYNAMODB_TABLE as string,
    Key: {
      id: event.pathParameters!.id,
    },
    ExpressionAttributeNames: {
      "#title": "title",
    },
    ExpressionAttributeValues: {
      ":title": data.title,
      ":description": data.description,
      ":published": data.published,
      ":updatedAt": timestamp,
    },
    UpdateExpression:
      "SET #title = :title, description = :description, published = :published, updatedAt = :updatedAt",
    ReturnValues: "ALL_NEW",
  };

  // update the todo in the database
  try {
    const res = await dynamoDb.update(params).promise();
    return successResponse(res.Attributes);
  } catch (error) {
    return errorResponse(
      error.statusCode || 501,
      `Couldn't fetch the todo item. Error: ${error.toString()}`
    );
  }
};
