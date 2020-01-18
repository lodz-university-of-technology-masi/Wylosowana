import axios from "axios";
import {Auth} from "aws-amplify";
import {URL} from "../Constants"

export async function listCandidates() {
    return axios
        .get(URL.cognito.listCandidates, {
            headers: {
                'Content-Type': 'application/json',
                'authorization': `${(await Auth.currentSession()).getIdToken().getJwtToken()}`,
            }
        });
}

export async function deleteUser(username) {
    return axios
        .delete(URL.cognito.deleteUser + username, {
            headers: {
                'Content-Type': 'application/json',
                'authorization': `${(await Auth.currentSession()).getIdToken().getJwtToken()}`,
            },
        });
}

export async function createUser(username, forceAliasCreation, temporaryPassword, email, profile) {
    return axios
        .post(URL.cognito.createUser, {
            "username": username,
            "forceAliasCreation": forceAliasCreation,
            "temporaryPassword": temporaryPassword,
            "email": email,
            "profile": profile,
            "name": profile,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'authorization': `${(await Auth.currentSession()).getIdToken().getJwtToken()}`,
            }
        });
}

