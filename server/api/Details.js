const jwt = require('jsonwebtoken');
const { getDataFromToken } = require('../middle/auth')

async function Details(req, res){

    const userDetail = await getDataFromToken(req.token);
    console.log(userDetail);
    res.status(200).send(userDetail);
}

module.exports = { Details }