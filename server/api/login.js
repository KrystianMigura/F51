const jwt = require('jsonwebtoken');
const path = require('path');

async function login(req, res){
    //{ username, password } = user
    console.log(req.body)
    const { user } = req.body;
    //cmp in database
    /*
    code
     */
    //generate access token for user
    try {
        jwt.sign({user: req.body}, 'secretkey', {expiresIn: '3600s'}, (err, token) => {
            res.status(200).json({
                token,
            })
        })
    } catch (e) {
        res.status(403).send({message: "ERROR"})
    }

}

async function login_panel(req, res) {
    const dir = path.join(__dirname, "public", '../../../client_panel/login_panel/login.html');
    res.set({'Content-Type': 'text/html'});
    res.status(200).sendFile(dir);

}

module.exports = { login, login_panel }