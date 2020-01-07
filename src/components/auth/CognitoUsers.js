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
    credentials: new AWS.Credentials('ASIAZ2J3YGNPVHEUFLHK', 'YuY4o+42m3ixyWARZJGWBq3sYQfjdhMb9mPcMNVy', 'FwoGZXIvYXdzEEMaDD6bAEnYFpw3yCCUHSLDAbOmA3gbnty5bPBfQuH/PjHVjfVM/BcW4n+VYe4mGWk+VIv74fIZrLnzjG31sayZWRH5z5xkTZhr2bI40FC+Qc5GjljVag4kaidfYZnxLZoSzW1t4s7igYoQ68rtJf7sNa8qz4szQmuthLzIEY+o/y1V6VW1pIY9TQSYSzpHbeSZLFXYdWAKL+sJ1nabI9MdxFhgCVeh65QHcuGoes6r1r34f8tcYIUA0s/oEgz/mo73JOfPfT5QZ9T+b2K/PH0IZMFGVyjqhdPwBTItdNfym3OXjUqTUZRNcn3EMe/UywR4LUWiP1cC3dufvHejgdlFv/YUBdijfUeg') /// !!! klucze od Seby
});
