"use strict";
const { server } = require('./server/server');
const { mongo } = require('./server/DB/DB');

try {
    mongo.run();
} catch (e) {
    console.log(e);
}