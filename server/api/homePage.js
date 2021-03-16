const { getDataFromToken } = require('../middle/auth')

async function homePage(req, res){
    const userDetail = await getDataFromToken(req.token);
    console.log(userDetail);
    res.status(200).send({userDetail, homepage: "homepage"});
}

module.exports = { homePage }