import React from 'react';
import ReactDOM from 'react-dom';
import 'bulma/css/bulma.min.css';
import App from './App';
import Amplify from 'aws-amplify';
import config from './config';

Amplify.configure({
    Auth: {
        mandatorySingIn: true,
        region: config.cognito.REGION,
        userPoolId: config.cognito.USER_POOL_ID,
        userPoolWebClientId: config.cognito.APP_CLIENT_ID
    }
})

ReactDOM.render(<App/>, document.getElementById('root'));

