const jwt = require('jsonwebtoken');
const path = require('path');
const { mongo } = require('../DB/DB');
const { users } = require('../../model/users');

async function login(req, res){
    const { username, password } = req.body;

    function test (user) {
        if (user._id ) {
            try {
                jwt.sign({user: user}, 'secretkey', {expiresIn: '3600s'}, (err, token) => {
                    res.status(200).json({
                        token
                    })
                })
            } catch (e) {
                res.status(403).send({message: "ERROR"})
            }
        } else {
            res.status(401).send({message: "Unauthorized"})
        }
    }

    try {
        mongo.search(users.collection, {"nickName": username, password: password}, test);
    } catch (e) {
        console.log(e);
        res.status(400).send({message: "Search Error"});
    }
}



module.exports = { login };