'use strict';
const { mongo } = require('../DB/DB');
const { expenses } = require('../../model/expenses');
const ObjectId = require('mongodb').ObjectId;


async function getMany(req, res) {
    function listener(data) {
        console.log( " <<<<< DAta" , data)
        res.status(200).send(data);
    }

    mongo.search(`${expenses.collection}`,{familyID: ObjectId(req.body.familyID)}, listener)
}



module.exports = { getMany }