// const Authormodel=require('../Model.js/Authormodel')
const Blogmodel=require('../Model.js/Blogmodel')
// const Authormodel=require('../Model.js/Authormodel')
const jwt=require('jsonwebtoken')
const authmiddleware = async (req, res, next) => {
    try {
        let id = req.params.blogid
        console.log(id)
        let blog = await Blogmodel.findById(id)
        if (!blog) {
            return res.status(404).send({status:false,msg:"blog is not found given id"})
        }
        let authorId=blog.authorId
        

        let token = req.headers['x-api-key']
        if (!token) {
            return res.status(400).send({status:false,msg:"Header must be present !"})
        }
        jwt.verify(token,"this is a secreat key" , async function (err, valid) {
            if (err) {
                return res.status(400).send({status:false,msg:"Invalid token !"})
            }
            if (valid) {
                if (valid.userId == authorId) { //here I checked user have permit to access this resources
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

module.exports.authmiddleware=authmiddleware