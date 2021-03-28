const jwt = require('jsonwebtoken');

async function verifyUser(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err){
            res.status(403).send({"error":"Unauthorization"})
        } else {
            res.status(200).send(authData)
        }
    });
}


module.exports = { verifyUser }