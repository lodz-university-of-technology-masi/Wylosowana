import config from "../../config";
import { Auth } from 'aws-amplify';

const  AWS = require('aws-sdk');
let cogUsers = [];

const params = {
    UserPoolId: config.cognito.USER_POOL_ID,
    AttributesToGet: [], // if null return all
    // Filter: 'profile ^= \"candidate\"',
};

const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider({
    apiVersion: '2016-04-18',
    region: config.cognito.REGION,
    credentials: new AWS.Credentials('ASIAZ2J3YGNP35O54QET', 'kktQqQ7eQ/AFhCSwQHGFmoQMxtjoMZWr/NKZRBUs',
        'FwoGZXIvYXdzELD//////////wEaDN7AGB1d2Nh7EyYrUCLDAWUSAsLdGvvp586AZf4VZtuIqt4kv4RprCnrVMebk7JFQ27OvV+OyXW5kE/Au9Q075OXqFsVlhmhudTLR1MNzgNwtLPYnwsTjtRtB4Lc0FJ1xayWIUY8CIeKcK3SEzJhXJnko50NOI7Qg4lIW8wQyV3553gOdoUdObFDedAUUycbSrpLZJY2vgFjrnUnTq96G9BwXonpLzktidQA3Myua5i+zlFA8uoOpevEp3dBTgJoxxeMb94YRr0QfEf8ZWBkU0MnbCiW9onvBTItm760Jz650PCMxlz4rynPGzceFQxhpJKxnLfNEaifmdVUzEEcQWcOknAJhHKy') // !!! what here
});


function getUsersFromCognito()  {
    cognitoidentityserviceprovider.listUsers(params, function(err, data) {
        if (err)
            console.log(err, err.stack);
        else
            console.log(data)   // wyciaga wszystkich userow. Pobierac gdy filter: profile = candidate
    });
}

function getCandidatesFromCogntio(){
    getUsersFromCognito()
}

export default getCandidatesFromCogntio;
