'use strict';
const { authorization } = require('../middle/auth');

const routes = {
    get: [
        {
            "endpointName" : "/home",
            "function" : "homePage",
            "middle" : authorization,
            "path" : './api/homePage'
        },
        {
            "endpointName" : "/details",
            "function" : "Details",
            "middle" : authorization,
            "path" : './api/Details'
        }
    ],
    post: [
        {
            "endpointName" : "/login",
            "function" : "login",
            //"middle" : authorization,
            "path" : './api/login'
        }
    ],
    put: [],
    delete: []
};

module.exports = { routes };