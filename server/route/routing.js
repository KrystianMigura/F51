'use strict';
const { authorization } = require('../middle/auth');

const routes = {
    get: [
        {
            "endpointName" : "/home",
            "function" : "homePage",
            // "middle" : authorization, //autoryzacja w warstwie middle
            "path" : './api/homePage'
        },
        {
            "endpointName" : "/details",
            "function" : "Details",
            // "middle" : authorization, //autoryzacja w warstwie middle
            "path" : './api/Details'
        },
        {
            "endpointName" : "/login",
            "function" : "login_panel",
            "path" : './api/login'
        },
        {
            "endpointName" : "/isadmin",
            "function" : "findAdmin",
            "path" : './api/users'
        }
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
        }
    ],
    put: [],
    delete: []
};

module.exports = { routes };