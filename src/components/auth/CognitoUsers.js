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
    credentials: new AWS.Credentials('ASIAZ2J3YGNPVDJGEC6K','Jw/tSQy4xdAQrmxXIbIvHtsN8HPUvrC4Nqa1iWJq',
        'FwoGZXIvYXdzEG0aDMceVXEPe9vEH0x26CLDATxYmhI05IO+JYUHij01wFsnbKYdK3GWz+myUftJFimz5VcS3NAbxB2JxluvoRooCOPPjUAm43H7hLaeHlzcm9wEnOrXYVZ8Rrl7aVhhrsh8481Ld1Zc7l1y4KZjc6w17IsAcdWvkhsKHIO4uME+megY0JbPB+uOjJMmn4bKgXUq0BwxjUkQVjVsZ/9OlpRXeZX8a8PMOFOYCpVGWwwBrCraQynrIUCSH46hIKyKqPBYa04RhvVDMtGNiqcfOjXxIl4WtyjDl9zwBTItmJyeayIWN3+vWvPB1uaad3NPP14tX2IUV53yyewNdR1hmLJLL3uh4KFlw3ao') /// !!! klucze od Seby
});
