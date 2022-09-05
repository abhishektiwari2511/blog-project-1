const authorModel = require('../Model.js/Authormodel')

const createAuthor = async (req, res)=>{

    try {
        if (Object.keys(req.body).length == 0) {
            return res.status(400).send({ Error: "Body  should be not emety" })
        }
        let data = new authorModel(req.body)
        let result = await data.save()
        res.status(201).send(result)
    }
    catch (error) {
        return res.status(500).send({status:false,msg:error.message})
    }


}

module.exports.createAuthor=createAuthor