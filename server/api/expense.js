'use strict';
const { mongo } = require('../DB/DB');
const { expenses } = require('../../model/expenses');
const ObjectId = require('mongodb').ObjectId;


async function getMany(req, res) {
    function listener(data) {
        console.log( " <<<<< DAta" , data)
        res.status(200).send(data);
    }

    let query = {};
    if(req.body.nickName) {
        query = {familyID: ObjectId(req.body.familyID), nickName: req.body.nickName}
    } else {
        query = {familyID: ObjectId(req.body.familyID)};
    }

    mongo.search(`${expenses.collection}`,query, listener, )
}



module.exports = { getMany }