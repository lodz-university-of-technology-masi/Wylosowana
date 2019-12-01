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
    credentials: new AWS.Credentials('ASIAZ2J3YGNP6GIVNXNN', 'kw2BLE0MqywZ2LTlkeRtrFnp0knuB/lPXiWGk+xq',
        'FwoGZXIvYXdzEMn//////////wEaDJABDLtrWpp8294uJSLDAdNeDGc8HHL9LzXrflIyyAJhcAizl1Emm9qocbH1RJt+0fpbOek+3u2uwX+SxpnJwexgdKvttASzOqTRiRIMtwNTGoaAU0WlBVufsX9XotPS/NWWY6BnqziWAG+hqHsB2Tifs9TaQzjcBlGaMaEvM3p8CUXAJ/VykQZAaeUbnMVCtnw2hVQ36EHmOE6LzZU+oxu6kiF9APz5jCf4cthEe48Fwspinqzd7BhBm7C9yf9HlBWDzOtq3hjlNPPa6UMnV1yuXSiqs4/vBTItr/KPpdyD1usNVeX7eqfRWWGaMUS2gTy+MCIFP6CJL73wT73IdOac0Zs9Dc/3') // !!! what here
});

