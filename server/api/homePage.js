const { getDataFromToken } = require('../middle/auth')

async function homePage(req, res){
    let userDetail;
    try {
        userDetail = await getDataFromToken(req.token);
    } catch (e) {
        console.log(e);
        res.status(400).send({message: "Error with Token"})
    }
    res.status(200).send({userDetail, homepage: "homepage"});
}

module.exports = { homePage };