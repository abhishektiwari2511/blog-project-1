const Blogmodel=require('../Model.js/Blogmodel')
const Authormodel=require('../Model.js/Authormodel')
const createblog = async (req, res)=>{

    try {
        if (Object.keys(req.body).length == 0) {
            return res.status(400).send({ Error: "Body  should be not emety" })
        }
        let id=req.body.authorId
        let author=await Authormodel.findById(id)
        if(!author){
            return res.status(404).send({status:false,msg:"User not found"})
        }

        let data = new Blogmodel(req.body)
        let result = await data.save()
        res.status(201).send({status:true,data:result})
    }
    catch (error) {
        return res.status(500).send({status:false,msg:error.message})
    }


}

const blogsUpdate = async (req,res)=> {
    try {
        let id = req.params.blogid 
         let blogid = await Blogmodel.findById(id)
         console.log(blogid);
        if(blogid.isDeleted == true ){
            res.status(404).send("unable to update")
        } 
         blog = await Blogmodel.findOneAndUpdate({_id : id}, {$set :req.body} ).select({title: 1 , body :1 , tag :1 , subcategory :1 , isPublihed : true   });
         res.status(200).send(blog)
    
        
    } catch (error) {
        return res.status(500).send({status:false,msg:error.message})
    }
}

module.exports.createblog=createblog
module.exports.blogsUpdate=blogsUpdate
