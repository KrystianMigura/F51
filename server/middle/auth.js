const jwt = require('jsonwebtoken');

async function authorization (req, res, next) {
    const bearerHeader = req.headers['token'];
    if(typeof bearerHeader !=='undefined') {
        const bearerToken =  bearerHeader.split(' ')[1];
        req.token = bearerToken;

        jwt.verify(req.token, 'secretkey', (err, authData) => {
            if(err){
                res.status(403).send({"error":"Unauthorization"})
            } else {
                next()
            }

        });
    } else {
        res.status(403).send({"error":"Unauthorization"}) //forbidden
    }
}

async function getDataFromToken(token) {
    const information = await (jwt.verify(token, 'secretkey', (err, authData) => {
        if(err){
            return err
        } else {
            return authData
        }
    }))
    return information
}
module.exports = { authorization, getDataFromToken };