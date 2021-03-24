'use strict';
const { mongo } = require('../DB/DB');
const { family } = require('../../model/family');
const ObjectId = require('mongodb').ObjectId;

async function getFamily(req, res) {
    const database = mongo.db;

    database.collection(`${family.collection}`).find({}).toArray((error, object) => {
        if(error) {
            res.status(500).send({message: "Error"});
            console.log(error);
            mongo.dbClose.close();
        } else {
            res.status(200).send(object);
        }
    })
}

async function getOne(req, res) {
    function listener(data) {
        res.status(200).send(data);

    }

    mongo.search(`${family.collection}`,{_id: ObjectId(req.body._id)}, listener)
    // mongo.search(users.collection, {"nickName" : username , password: password}, test);
}

module.exports = { getFamily, getOne }