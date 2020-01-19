'use strict'
const AWS = require('aws-sdk');

exports.handler = async(event, context) => {
    const documentClient = new AWS.DynamoDB.DocumentClient();

    let responseBody = "";
    let statusCode = 0;

    const candidate_login = event.pathParameters.login;
   
    const params = {
        TableName: "Tests",
        ProjectionExpression:"id, testName, langs",
        FilterExpression: "contains (candidateLogins, :candidate_login)",
        ExpressionAttributeValues : {   
            ":candidate_login": candidate_login
        }
    };

    try {
        const data = await documentClient.scan(params).promise();
        responseBody = JSON.stringify(data);
        statusCode = 200;

    } catch (err) {
        responseBody = `Unable to get tests for candidate [${event.pathParameters}]: ${err}`;
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