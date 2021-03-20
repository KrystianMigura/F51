const express = require('express');
const env = require('dotenv').config();
const routes = require('../server/route/routing');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
const http = require('http');
const https = require('https');
const path = require('path');


class Server {
    constructor() {
        this.app = app;
        this.privateKey = fs.readFileSync('ssl/server.key');
        this.certificate = fs.readFileSync('ssl/server.cert');
        this.credentials = { key: this.privateKey, cert: this.certificate };
        this.route = routes;
        this.createRouting(this.route);
        this.createServer();

    }

    createRouting(routeJson) {
        const keys = Object.keys(routeJson.routes);
        const element = routeJson.routes;


        app.use(bodyParser.json({parameterLimit: 1000, limit: '10mb'}));
        app.use(bodyParser.urlencoded({limit: '2mb', extended: true}));
        app.use(express.static("public"));

        this.app.use((req, res, next) => {
            res.setHeader("Content-Type", "application/json");
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "*");
            res.header("Access-Control-Allow-Headers", "authorization", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });

        keys.map( async a => {
            await element[a].forEach(singleElement => {
                console.log(singleElement)
                try {
                    this.app[`${a}`](`${singleElement.endpointName}`, singleElement.middle, require(`${singleElement.path}`)[`${singleElement.function}`]);
                } catch(e) {
                    this.app[`${a}`](`${singleElement.endpointName}`, require(`${singleElement.path}`)[`${singleElement.function}`]);

                }
            })
        })
    }

    createServer() {

        const httpsServer = https.createServer(this.credentials, this.app);
        const httpServer = http.createServer(this.app);

        try {
            httpServer.listen(process.env.HTTPPORT);
        } catch (err) {
            console.log(err);
        }

        try {
            httpsServer.listen(process.env.HTTPSPORT);
        } catch(err) {
            console.log(err);
        }

    }


}

module.exports = { server: new Server()}