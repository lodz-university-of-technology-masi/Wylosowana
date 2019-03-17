'use strict'
const AWS = require('aws-sdk');

exports.handler = async(event, context) => {
    const documentClient = new AWS.DynamoDB.DocumentClient();

    let responseBody = "";
    let statusCode = 0;

    const params = {
        TableName: "Tests",
        Key: {
            id: 1,
        },
        UpdateExpression: "set name = :n",
        ExpressionAttributeValues: {
            ":n": "Nowa nazwa"
        },
        ReturnValues: "TEST_UPDATED"
    }

    try {
        const data = await documentClient.update(params).promise();
        responseBody = JSON.stringify(data);
        statusCode = 204;

    } catch (err) {
        responseBody = `Unable to ipdate test: ${err}`;
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