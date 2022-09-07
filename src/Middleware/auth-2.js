const jwt=require('jsonwebtoken')
const authmid = async (req, res, next) => {
    try {
        let token = req.headers['x-api-key']
        if (!token) {
            return res.status(400).send({ status: false, msg: "Header must be present !" })
        }
        jwt.verify(token, "this is a secreat key", async function (err, valid) {
            if (err) {
                return res.status(400).send({ status: false, msg: "Invalid token !" })
            }
            if (valid) {
                if (valid) { //here I checked user have permit to access this resources
                    next()
                }
            }
        });
    } catch (error) {
        return res.status(500).send({ Error: error.message })
    }
}
module.exports.authmid=authmid