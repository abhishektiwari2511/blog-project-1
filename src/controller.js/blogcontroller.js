const Blogmodel=require('../Model.js/Blogmodel')
const createblog = async (req, res)=>{

    try {
        if (Object.keys(req.body).length == 0) {
            return res.status(400).send({ Error: "Body  should be not emety" })
        }
        let data = new Blogmodel(req.body)
        let result = await data.save()
        res.status(201).send({status:true,data:result})
    }
    catch (error) {
        return res.status(500).send({status:false,msg:error.message})
    }


}
module.exports.createblog=createblog