'use strict';

const AWS = require('aws-sdk');
AWS.config.update({region: "us-east-1"});

module.exports.get = async (event,context) => {

    const ddb = new AWS.DynamoDB();
    const documentClient = new AWS.DynamoDB.DocumentClient({region: "us-east-1"});

    let responseBody = "";
    let statusCode = 0;

    const params = {
        TableName: "Test",
        Key: {
           ID: "$input.params('ID')"
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
            'Content-Type': 'application/json'
        },
        body:responseBody
    };

};

module.exports.put = async (event,context) => {

    const ddb = new AWS.DynamoDB();
    const documentClient = new AWS.DynamoDB.DocumentClient({region: "us-east-1"});

    const params = {
        TableName: "Test",
        Item: {
            ID: 1,
            name: "Lambda Test"
        }
    };

    let data;
    try{
        data = await documentClient.put(params).promise();
        console.log(data);
    }catch (e) {
        console.log("BLE KUTRA" + e);
    }

    return data;

};