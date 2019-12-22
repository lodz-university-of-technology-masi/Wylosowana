'use strict'
const AWS = require('aws-sdk');

exports.handler = async(event, context) => {
    const documentClient = new AWS.DynamoDB.DocumentClient();

    let responseBody = "";
    let statusCode = 0;
    
    const id  = event.id;
    const candidate_logins = event.candidate_logins;
    const params = {
        TableName: "Tests",
        Key: {
            'id': parseInt(id),
        },
        UpdateExpression: "set candidate_logins = :logins",
        ExpressionAttributeValues: {
            ":logins": candidate_logins
        },
        ReturnValues: "UPDATED_NEW"
    };

    try {
        const data = await documentClient.update(params).promise();
        responseBody = JSON.stringify(data);
        statusCode = 204;

    } catch (err) {
        responseBody = `Unable to update test: ${err}`;
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