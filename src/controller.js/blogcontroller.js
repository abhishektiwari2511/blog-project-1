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

const deleted = async function (req, res) {
    try {
        //Validate: The blogId is present in request path params or not.
        let blog_Id = req.params.blogId
        if (!blog_Id) return res.status(400).send({ status: false, msg: "Blog Id is required" })

        //Validate: The blogId is valid or not.
        let blog = await Blogmodel.findById(blog_Id)
        if (!blog) return res.status(404).send({ status: false, msg: "Blog does not exists" })

        //Validate: If the blogId is not deleted (must have isDeleted false)
        let is_Deleted = blog.isDeleted
        if (is_Deleted == true) return res.status(404).send({ status: false, msg: "Blog is already deleted" })

        //Delete a blog by changing the its isDeleted to true.
        let deletedBlog = await Blogmodel.findOneAndUpdate({ _id: blog_Id },
            { $set: { isDeleted: true, deletedAt: new Date() } }, { new: true })
        //Sending the Deleted response after updating isDeleted : true
        return res.status(200).send({ status: true, msg: "Blog deleted succesfully" })
    }
    catch (err) {
        console.log("This is the error :", err.message)
        return res.status(500).send({ status: false, msg: " Server Error", error: err.message })
    }
}

module.exports.createblog=createblog
module.exports.blogsUpdate=blogsUpdate
module.exports.deleted=deleted
