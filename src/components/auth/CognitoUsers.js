import config from "../../config";

const  AWS = require('aws-sdk');

export const params = {
    UserPoolId: config.cognito.USER_POOL_ID,
    AttributesToGet: ["name"], // if null return all
    Filter: 'name ^= \"Candidate\"',
};

export const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider({
    apiVersion: '2016-04-18',
    region: config.cognito.REGION,
    credentials: new AWS.Credentials('ASIAZ2J3YGNP5QXLBY4Z','EIAOpz9Bl/lu5UFH8szRI05D+V/vmxowfaEL1Vqv','FwoGZXIvYXdzEGEaDLS0cVFmnwbfGfph5CLDAd7j1pOervP0B0eZTtJZ0nl+yqv87Tw18TpPuT4vPeuzolYl5BMBXvKUejUJ1cnzPs8Kpu4cxc1hSCfDEGYc5QKxYaQTA/HaGtybunZTU+ExLiHoW2iTdFK4agPt8xLAO9zuA7W90MFnBoFgXMHbD7IGHE57l+Ve7xvQjtwUCQVR4ndxZ08aWQmE6Eriht2HzxqEJj/42RisX7QmqP9i04fbAkjfH6H/tYRuHuxqn0tuQGHSoAyulmYUP+XQ9ObbivTeoyjf0tnwBTItZp/WpmB5Z9AjDBEPOownJKScnD3JcswVdaYyYzSdJ2/PRdH74NGmXDoIYEEW') /// !!! klucze od Seby
});
