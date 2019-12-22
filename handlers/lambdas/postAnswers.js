'use strict'
const AWS = require('aws-sdk');

exports.handler = async(event, context, callback) => {
  const documentClient = new AWS.DynamoDB.DocumentClient();

  let responseBody = "";
  let statusCode = 0;

  const json = JSON.parse(event.body);
  
  const params = {
    TableName: "Answers",
    Item: {
      id: getUniqueId(),
      testId: json.testId,
      login: json.login,
      answers: json.answers
    }
  }

  try {
    const answers = json.answers;
    validateAnswers(answers);
    const data = await documentClient.put(params).promise();
    statusCode = 201;

  } catch (err) {
    responseBody = `Unable to put answers: ${err}`;
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

let validateAnswers = (answers) => {
  let error;
  answers.forEach( (answer) => {
    if (answer.hasOwnProperty("answers")) {
      if (answer.hasOwnProperty("answer")) {
        throwError();
      }
    }

    if (answer.hasOwnProperty("answer")) {
      if (answer.hasOwnProperty("answers")) {
        throwError();
      }
    }
  });
  
  return error;
}

let throwError = () => { 
  const errorMsg = 'Body can NOT contains answers array AND answer with specified language';
  throw new Error(errorMsg)
}