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
    credentials: new AWS.Credentials('ASIAZ2J3YGNPS5XMW5MB', 'dmNENoJyM/wGpoUNKt6E2bDvlBLXKbr6VBnferNK', 'FwoGZXIvYXdzEM7//////////wEaDAxN2yZQ1Q0hbraoXCLDAXUNvPPkEXTdVub9154HuHbwGrUKV0gecQAKOclPhCit40WNtxjaKs5NK5O8TBjraXB1ENPhliK+yEQpQ3AINrNkMBviCI78hgDDbM0iUw8kVuMS3VQbdwD3quVtLtptXA+5ltHmfE4cdlfCeZ50YqjH1j4Ju7EjcnL61uHej8Q4TGFiZFAoPjfCZw05XozyYAZzqYf++b/nbNbzTis+PjWxHTmGgAt9B5O6eTbqkxYHqm4uezvPKkgrjhS1r59ZPxe/lSiur7nwBTIth4KoswA5yT7Exapb8WyAnNJY6jyFvsEtSerWHLbGy3ISu4JZ9561N2b6aStK') /// !!! klucze od Seby
});
