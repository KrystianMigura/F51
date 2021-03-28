'use strict';
const { mongo } = require('../DB/DB');
const { expenses } = require('../../model/expenses');
const ObjectId = require('mongodb').ObjectId;

async function getMany(req, res) {
    function listener(data) {
        if(data.error){
            res.status(400).send({message: "Search Error"});
        }
        res.status(200).send(data);
    }

    let query = {};
    if(req.body.nickName) {
        query = {familyID: ObjectId(req.body.familyID), nickName: req.body.nickName}
    } else {
        query = {familyID: ObjectId(req.body.familyID)};
    }
    try {
        mongo.search(`${expenses.collection}`, query, listener,)
    } catch (e) {
        listener({error: true})
        console.log(e)
    }
}



module.exports = { getMany }