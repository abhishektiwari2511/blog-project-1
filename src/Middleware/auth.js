const Authormodel=require('../Model.js/Authormodel')
const Blogmodel=require('../Model.js/Blogmodel')
const authmiddleware = async (req, res, next) => {
    try {
        let id = req.params.id
        let user = await Authormodel.findById(id)
        if (!user) {
            return res.status(404).send("user not found")
        }
        let token = req.headers['x-auth-token']
        if (!token) {
            return res.status(400).send("header is mandatory")
        }
        jwt.verify(token, jwtKey, async function (err, valid) {
            if (err) {
                return res.status(400).send("invalid token")
            }
            if (valid) {
                if (valid.userId == id) { //here I checked user have permit to access this resources

                    next()
                } else {
                    return res.status(403).send({ status: false, msg: "you have not authorized person!!" })
                }
            }
        });
    } catch (error) {
        return res.status(500).send({ Error: error.message })
    }
}