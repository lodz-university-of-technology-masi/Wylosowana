'use strict';

const AWS = require('aws-sdk');
AWS.config.update({region: "us-east-1"});

module.exports.get = async (event,context) => {

    const documentClient = new AWS.DynamoDB.DocumentClient({region: "us-east-1"});

    let responseBody = "";
    let statusCode = 0;

    const params = {
        TableName: "Test2",
        Key: {
            "id": event['pathParameters']['id']
        }
    };

    try{
        const data = await documentClient.get(params).promise();
        responseBody = JSON.stringify(data.Item);
        statusCode = 200;
    }catch (e) {
        responseBody = 'Unable to get test Data ';
        statusCode = 404;
    }

    return {
        statusCode: statusCode,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body:responseBody
    };
};

module.exports.put = async (event,context) => {

    const ddb = new AWS.DynamoDB();
    const documentClient = new AWS.DynamoDB.DocumentClient({region: "us-east-1"});

    let responseBody = "";
    let statusCode = 0;
    const { id, name } = JSON.parse(event.body);

    const params = {
        TableName: "Test2",
        Item: {
            id: id,
            name: name
        }
    };

    try{
        const data = await documentClient.put(params).promise();
        responseBody = JSON.stringify(data);
        statusCode = 201;
    }catch (e) {
        responseBody = 'Unable to put test Data ';
        statusCode = 404;
    }

    return {
        statusCode: statusCode,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body:responseBody
    };

};

module.exports.put = async (event,context) => {

    const documentClient = new AWS.DynamoDB.DocumentClient({region: "us-east-1"});

    let responseBody = "";
    let statusCode = 0;

    const params = {
        TableName: "Test2",
    };

    try{
        const data = await documentClient.scan(params).promise();
        responseBody = JSON.stringify(data.Items);
        statusCode = 200;
    }catch (e) {
        responseBody = 'Unable to get Data ';
        statusCode = 404;
    }

    return {
        statusCode: statusCode,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body:responseBody
    };

};