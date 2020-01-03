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
    credentials: new AWS.Credentials('ASIAZ2J3YGNP2XYCHNHR', 'Ya9FQMsY/dWd110BPXpZW5f4lD0c6aORzklyO4fa', 'FwoGZXIvYXdzEOP//////////wEaDNz9zQY4OrRYVQUk6iLDAeb1vcXoaRx7sKDbNIAiYX4p1fbZAZ3ve8VmqiAW9GwZPMcIVJpPdWD41MCmT75E1n+XbfFYaYhfAqpYvqgO3HB3BiXx97nZmisylAEwFvIuqKe8hbJHEcJ8i+ZLB40su2T8kpi3LPNFCg3CQYDCBTcnjKm1uTbREtpem1A0aDgszuYuUcw8jc3Q5x2aKYMKuvabhxm/3b/xKVqJE19XzdG7DFViaouiOybfmeBgUz+QFvcdjGWkNLqQnpWCYRbhQsq04iin9L3wBTItWC/zE5NSiCvgorYBC5F2NWEe7Gvul1A1aQidrZEVHp5DZA30tVNN04rC9yQh') /// !!! klucze od Seby
});