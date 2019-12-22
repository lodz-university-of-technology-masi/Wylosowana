'use strict'
const AWS = require('aws-sdk');

exports.handler = async(event, context) => {
    const documentClient = new AWS.DynamoDB.DocumentClient();

    let responseBody = "";
    let statusCode = 0;

    const answersParams = {
    TableName: "Answers",
    ProjectionExpression: "testId, login"
  };

  const testsParams = {
    TableName: "Tests",
    ProjectionExpression: "id, testName"
  };

    try {
        const testsData = await documentClient.scan(testsParams).promise();
        const answersData = await documentClient.scan(answersParams).promise();
        
        let solvedTestsIds = answersData.Items.map(e =>  e.testId);
        solvedTestsIds = Array.from(new Set(solvedTestsIds));
        
        let solvedTestsWithNamesAndLogins = solvedTestsIds.map( testId => {
            let name = testsData.Items.filter( test => test.id == testId)[0].testName;
            let logins = answersData.Items.filter(answer => answer.testId == testId).map(answer => answer.login);
            return {"id": testId, "name": name, "candidate_logins": logins};
        });
        
        
        responseBody = JSON.stringify(solvedTestsWithNamesAndLogins);
        statusCode = 200;

    } catch (err) {
        responseBody = `Unable to get tests: ${err}`;
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