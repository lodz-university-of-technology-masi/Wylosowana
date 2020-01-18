import config from "../../config";
import axios from "axios";
import {Auth} from "aws-amplify";

const  AWS = require('aws-sdk');

export const params = {
    UserPoolId: config.cognito.USER_POOL_ID,
    AttributesToGet: ["name"], // if null return all
    Filter: 'name ^= \"Candidate\"',
};

export const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider({
    apiVersion: '2016-04-18',
    region: config.cognito.REGION,
    credentials: new AWS.Credentials('ASIAZ2J3YGNP4TSV4W53','gVX9wrR03DG2RrGv5lZsGMKlAVAIK1NdA58+SjP3', 'FwoGZXIvYXdzEEMaDEtX9sWCjXGMtZbwMiLDAaUnCtRl5ThNGpVz1gXdbfLvV61GxYx737Vgf5oalQjqjGjFg8WkaOG7MzvDdMMPcFhC5iwgPFOCvMbe1tpo4r9dOe75DSwtYvb/EfsrhMn6EM174CRpCUVyrhGHIkd53uPH3rYdX3zwK6SWBN32XIWyUIx+VL2PgGA4btndAwjNoB+ja5FfEfib66UBvITYp2XxiNpNH07IwlK3CD5ITumt073+uIApHjCFpmLKZpGI3qLRdLOtZr1MqEDGiKb0Gw2WmiiIlIvxBTItRx34xDVWpznBULcWtEeYafMlOP05KGrzmQRJh2lJzrWjkXAsYG/JbzJCpXO7') /// !!! klucze od Seby
});

export async function listCandidates() {
   return  axios
        .get('https://dkue6ysvr4.execute-api.us-east-1.amazonaws.com/dev/candidates', {
            headers: {
                'Content-Type': 'application/json',
                'authorization': `${(await Auth.currentSession()).getIdToken().getJwtToken()}`,
            }
        });
}

