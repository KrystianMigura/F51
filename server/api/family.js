'use strict';
const { mongo } = require('../DB/DB');
const { family } = require('../../model/family');
const { users } = require('../../model/users')
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
        if(data.message) {
            res.status(400).send({message: "Search Error"});
        }
        res.status(200).send(data);
    }
    try {
    mongo.search(`${family.collection}`,{_id: ObjectId(req.body._id)}, listener)
    } catch (e) {
        console.log(e);
        listener({error: "Search Error"});
    }
        // mongo.search(users.collection, {"nickName" : username , password: password}, test);
}

async function getMany(req, res) {
    function listener(data) {
        if(data.message)
        {
            res.status(400).send({message: "Search Error"});
        }
        res.status(200).send(data);
    }

    try {
        mongo.search(`${users.collection}`, {familyID: ObjectId(req.body.familyID)}, listener)
    } catch (e) {
        console.log(e);
        listener({message: "Search Error"});
    }
}

async function accountOperation(req, res) {
    function listener(data) {
        if(data.message) {
            res.status(400).send({message: "Update Error"})
        }
        res.status(200).send(data)
    }

    let user = req.body.user || 'SuperAdmin';
    let description = req.body.description || null;
    let userID = req.body._id || null;

    try {
        await mongo.update(`${family.collection}`, {
            familyID: ObjectId(req.body.familyID),
            Money: req.body.change
        }, listener, user, description, userID)
    } catch (e) {
        console.log(e);
        listener({message: "Update Error"})
    }
}

module.exports = { getFamily, getOne, getMany, accountOperation }