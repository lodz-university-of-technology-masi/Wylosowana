import config from "../../config";
import { Auth } from 'aws-amplify';

const  AWS = require('aws-sdk');

export const params = {
    UserPoolId: config.cognito.USER_POOL_ID,
    AttributesToGet: ["name"], // if null return all
    Filter: 'name ^= \"Candidate\"',
};

export const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider({
    apiVersion: '2016-04-18',
    region: config.cognito.REGION,
    credentials: new AWS.Credentials('ASIAZ2J3YGNP3QIEIBUF',
        'motiyKjgFaXQpMXk7tvUUZJ2R2P9D1PypFhCAsbd', 'FwoGZXIvYXdzELv//////////wEaDByKeAwfzZoqqXYZwCLDAR/QTeTlze1GudqQS8LxPmmfpDPOv0/EVbi6JSxxjJPt5hPC8JD11Gp9BROxUEP4ziuRlag4zylxeHKIQrVl3rZnaCykIMjU1rXJ1siDj/9l23KgYwozK/sAjiZ6qcATim8j0K31+ESvEroVB9sCYts7H5AxbYLBPgJy0ueE3nMKkmTou1MSHX9BEJweJLWvxBtoujZYK5jmil7ogO/ZWncNVHJ4zpRxXTXZXGK4k/oRr9EKXNtxVJqji81+LLO7QKb0WCiq3MTvBTIth7Unwq6f5QHjkzAhCltIanaQ832mEms6VwgknQTw0Frg4sT/TLbIkF4i/PR3') // !!! uzupelnic, klucze od Seby !!!
});

