'use strict'
const AWS = require('aws-sdk');

exports.handler = async(event, context) => {
  const documentClient = new AWS.DynamoDB.DocumentClient();

  let responseBody = "";
  let statusCode = 0;
  
  const { login, testId } = JSON.parse(event.pathParameters);

  const answersParams = {
    TableName: "Answers",
    FilterExpression: "login = :login",
    ExpressionAttributeValues: {
      ":login": login 
    }
  };

  const testsParams = {
    TableName: "Tests",
    FilterExpression : "id = :testId",
    ExpressionAttributeValues: {
      ":testId": testId 
    }
  };

  
  try {
    const answersData = await documentClient.scan(answersParams).promise();
    const testsData = await documentClient.scan(testsParams).promise();
    
    let answersLanguage = answersData.Items[0].lang;
    let languageTest = testsData.Items[0].langs.filter(obj => obj.lang == answersLanguage);
    let pts = 0;
    let allPts = 0;
    let task = []
    answersData.Items[0].answers.map((obj, indx) => {
      for(let prop in obj){
        if(prop == "answers" && (JSON.stringify(obj[prop]) == JSON.stringify(languageTest[0].questions[indx].correct))){ 
            pts++;
        }
        if(prop == "answers"){
          allPts++;
        }
        else if( prop == "answer"){
          task.push( {"question" : languageTest[0].questions[indx].question, "answer" : obj[prop]} )  
        }
      }
    })
    
    responseBody = JSON.stringify(task);
    responseBody += '\n ' + pts + " na " + allPts;
    statusCode = 200;

  } catch (err) {
    responseBody = `Unable to get ${login}'s answers for test ${testId}: ${err}`;
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