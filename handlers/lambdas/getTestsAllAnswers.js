'use strict'
const AWS = require('aws-sdk');
exports.handler = async(event, context) => {
  const documentClient = new AWS.DynamoDB.DocumentClient();

  let responseBody = "";
  let statusCode = 0;

  const testId = parseInt(event.pathParameters.testId, 10);

 const answersParams = {
    TableName: "Answers",
    FilterExpression:'testId = :testId',
    ExpressionAttributeValues:{ ":testId" : testId }
  };

  try {
    const answersData = await documentClient.scan(answersParams).promise();
    responseBody = JSON.stringify(answersData);
    statusCode = 200;

  } catch (err) {
    responseBody = `Unable to get answers for test ${testId}: ${err}`;
    statusCode = 403;
  }

  const response = {
    statusCode: statusCode,
    headers: {
      "Content-Type": "application/json"
    },
    body: responseBody
  };

  return response;
};