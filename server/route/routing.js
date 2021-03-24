'use strict';
const { authorization } = require('../middle/auth');

const routes = {
    get: [
        {
            "endpointName" : "/dashboard",
            "function" : "verifyUser",
            "middle" : authorization,
            "path" : './api/dashboard'
        },
        {
            "endpointName" : "/home",
            "function" : "homePage",
            // "middle" : authorization, //autoryzacja w warstwie middle
            "path" : './api/homePage'
        },
        {
            "endpointName" : "/isadmin",
            "function" : "findAdmin",
            "path" : './api/users'
        },
        {
            "endpointName" : "/getFamily",
            "function" : "getFamily",
            "middle" : authorization,
            "path" : './api/family'
        },

    ],
    post: [
        {
            "endpointName" : "/login",
            "function" : "login",
            //"middle" : authorization, //autoryzacja w warstwie middle
            "path" : './api/login'
        },
        // {
        //     "endpointName" : "/auth",
        //     "function" : "authorization",
        //     "path" : './middle/auth'
        // },
        {
            "endpointName" : "/adminCreate",
            "function" : "createAdmin",
            "path" : './api/users'
        },
        {
            "endpointName" : "/familyDetails",
            "function" : "getOne",
            "middle" : authorization,
            "path" : './api/family'
        },
    ],
    put: [],
    delete: [],
};

module.exports = { routes };