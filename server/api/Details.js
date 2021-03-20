const jwt = require('jsonwebtoken');
const { getDataFromToken } = require('../middle/auth')
const path = require('path');

async function Details(req, res){
    const dir = path.join(__dirname, "public", '../../../client_panel/login_panel/dashboard.html');
    res.set({'Content-Type': 'text/html'});
    res.status(200).sendFile(dir);

    // const userDetail = await getDataFromToken(req.token);
    // console.log(userDetail);
    // res.status(200).send(userDetail);
}

module.exports = { Details }