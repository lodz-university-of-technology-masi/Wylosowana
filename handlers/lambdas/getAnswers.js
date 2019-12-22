'use strict'
const AWS = require('aws-sdk');

exports.handler = async(event, context) => {
  const documentClient = new AWS.DynamoDB.DocumentClient();

  let responseBody = "";
  let statusCode = 0;

  const pathParameters = event.pathParameters;


  const answersParams = {
    TableName: "Answers",
    ProjectionExpression: "answers",
    KeyConditionExpression: "login = :login",
    ExpressionAttributeValues: {
      ":login": pathParameters.candidateLogin
    }
  };

  const testsParams = {
    TableName: "Tests",
    ProjectionExpression: "name, langs",
    FilterExpression: "id = :testId",
    ExpressionAttributeValues: {
      ":testId": pathParameters.testId
    }
  };

  try {
    const answersData = await documentClient.scan(answersParams).promise();
    const testsData = await documentClient.scan(testsParams).promise();

    //merge testu z odpowiedziami

    responseBody = JSON.stringify(answersData);
    responseBody += '\n' + JSON.stringify(testsData);
    statusCode = 200;

  } catch (err) {
    responseBody = `Unable to get ${pathParameters.candidateLogin}'s answers for test ${pathParameters.testId}: ${err}`;
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