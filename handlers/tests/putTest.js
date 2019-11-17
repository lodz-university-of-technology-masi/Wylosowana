'use strict'
const AWS = require('aws-sdk');

exports.handler = async(event, context) => {
    const documentClient = new AWS.DynamoDB.DocumentClient();

    let responseBody = "";
    let statusCode = 0;

    const json = JSON.parse(event.body);

    const params = {
        TableName: "Tests",
        Item: {
            id: getUniqueId(),
            testName: json.testName,
            langs: json.langs,
            candidate_ids: json.candidate_ids
        }
    }

    try {
        const data = await documentClient.put(params).promise();
        responseBody = JSON.stringify(data);
        statusCode = 201;

    } catch (err) {
        responseBody = `Unable to put test: ${err}`;
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

let getUniqueId = () => {
    let id = new Date().getTime();
    id -= 1573950000000;
    id = (id * 64);
    id += Math.floor(Math.random() * 64);
    id = (id * 512) + Math.floor(Math.random() * 512);

    return id;
}