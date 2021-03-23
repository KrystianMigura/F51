async function verifyUser(req, res) {
    res.status(200).send({message: "OK"})
}


module.exports = { verifyUser }