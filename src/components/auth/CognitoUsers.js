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
    credentials: new AWS.Credentials('ASIAZ2J3YGNPZTUU46PT', '/QqGoOcbeyRvER9ENPTg+M7bjOFuFtdqHWJ5WFNx', 'FwoGZXIvYXdzEDoaDOmNv2uDQD+ozX5oGyLDARfXzhevBCgCIE5JANED9LpSFnJ8YOPZR5jBr7vpa4Tpvt/6rQ2mOj18F0pVhXWeRLJUZYvV8+w+akUc+VuzfImZBbETVlKUTAcMMNVLimPVMjthF0rjMqluHJk+CZ2gfAB2bixvw8lZmTtLw1YVhjKY4MKUBqn+Fvf9uyHqJHxjZl0MhSCu9O4TKkCqddbeTcotIZL++IzHi49jVZEo+ZeeNDymb4Ez/7UGZc34YREpWE9na6IR/dRg8mRxiIBspZEnByj53pjwBTItJ/2C6k66WLih1L99J53rmlsOKkEu19z+AOQKmWBVqyDPDONSwUerJVJjXHLs') /// !!! klucze od Seby
});