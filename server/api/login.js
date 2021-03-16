const jwt = require('jsonwebtoken');

async function login(req, res){
    //{ username, password } = user
    const { user } = req.body;
    //cmp in database
    /*
    code
     */
    //end cmp database

    //generate access token for user
    jwt.sign({ user: req.body }, 'secretkey',{expiresIn: '3600s'}, (err, token) => {
        res.status(200).json({
            token,
        })
    })

}

module.exports = { login }