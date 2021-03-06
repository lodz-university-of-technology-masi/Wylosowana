const Constants = {
    TRANSLATE: require('yandex-translate')('trnsl.1.1.20191219T153918Z.bad67cf36c9d3490.89ddc43eea27a08206cf10db04a374b748ad5d16'),
    DICTIONARY: require('yandex-dictionary')('dict.1.1.20200108T131311Z.8bda1d7d97c3a36a.4c363b15079be40c15229e09711c35a6d1d30d15')
};
export default Constants

const COGNITO_BASE_URL = 'https://dkue6ysvr4.execute-api.us-east-1.amazonaws.com/dev';

export const URL = {
    cognito: {
        listCandidates: COGNITO_BASE_URL + '/candidates',
        deleteUser: COGNITO_BASE_URL + '/deleteuser/',
        createUser: COGNITO_BASE_URL + '/createUser',
    }
};
