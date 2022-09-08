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

const getblogs=async(req,res)=>{
    try{
        let authorId=req.query.authorId
        let category=req.query.category
        let tags=req.query.tags
        let subcategory =req.query.subcategory
        if((category && authorId && tags && subcategory)){
            let blogs=await Blogmodel.find({subcategory:subcategory, authorId:authorId, tags:tags, subcategory:subcategory ,isDeleted:false,isPublished:true})
            blogs.length == 0 ? res.status(404).send({msg:"Blog are not available given category subcategory tags and author id!!"}) : res.send({status:true,data:blogs})
             
        }
        if(( authorId && category && subcategory)){
            let blogs=await Blogmodel.find({subcategory:subcategory, authorId:authorId, category:category ,isDeleted:false,isPublished:true})
            blogs.length == 0 ? res.status(404).send({msg:"Blog are not available given category subcategory and author id!!"}) : res.send({status:true,data:blogs})
             
        }
        else if((category && subcategory)){
            let blogs=await Blogmodel.find({subcategory:subcategory,category:category, isDeleted:false,isPublished:true})
            blogs.length == 0 ? res.status(404).send({msg:"Blog are not available given category and subcategory!!"}) : res.send({status:true,data:blogs})
    
    
        }
        else if((authorId && category)){
            let blogs=await Blogmodel.find({ authorId:authorId, category:category, isDeleted:false,isPublished:true})
            blogs.length == 0 ? res.status(404).send({msg:"Blog are not available given authorId and category!!"}) : res.send({status:true,data:blogs})
        }
        else if((category && tags)){
            let blogs=await Blogmodel.find({ category:category, tags:tags, isDeleted:false,isPublished:true})
            blogs.length == 0 ? res.status(404).send({msg:"Blog are not available given tags and category!!"}) : res.send({status:true,data:blogs})
        } 
        else if(authorId){
            let blogs=await Blogmodel.find({authorId:authorId, isDeleted:false,isPublished:true})
            blogs.length == 0 ? res.status(404).send({msg:"Blog are not available given id!!"}) : res.send({status:true,data:blogs})
        }
        else if(category){
            let blogs=await Blogmodel.find({category:category,isDeleted:false,isPublished:true})
            blogs.length == 0 ? res.status(404).send({msg:"Blog are not available given category!!"}) : res.send({status:true,data:blogs})
    
        }
        else if(subcategory){
            let blogs=await Blogmodel.find({subcategory:subcategory,isDeleted:false,isPublished:true})
            blogs.length == 0 ? res.status(404).send({msg:"Blog are not available given subcategory!!"}) : res.send({status:true,data:blogs})
    
        } 
        else if(tags){
            let blogs=await Blogmodel.find({tags:tags,isDeleted:false,isPublished:true})
            blogs.length == 0 ? res.status(404).send({msg:"Blog are not available given tags!!"}) : res.send({status:true,data:blogs})
    
        }
       
        else{
            let blogs=await Blogmodel.find({isDeleted:false,isPublished:true})
            blogs.length == 0 ? res.status(404).send({msg:"Blog are not available !!"}) : res.send({status:true,data:blogs})
        }
    }catch(error){
        return res.status(500).send({ status: false, msg: error.message })
    
    }
    
    }

const blogsUpdate = async (req,res)=> {
    try {
        let id = req.params.blogid 
        let title = req.body.title
        let body = req.body.body
        let tags = req.body.tags
        let subcategory = req.body.subcategory
         let blogid = await Blogmodel.findById(id)
        if(blogid.isDeleted == true ){
            res.status(404).send({status:false,msg:" This document already Deleted !!"})
        } 
        let tag=blogid.tags //[]
        tag.push(tags)
        let subcat=blogid.subcategory
        subcat.push(subcategory)
         blog = await Blogmodel.findOneAndUpdate({_id : id}, {$set :{title:title , body:body, tags: tag , subcategory:subcat , isPublished :true ,ispublishedAt:Date.now()} } ,{new : true} );
         res.status(200).send({status:true,data:blog})
    } catch (error) {
        return res.status(500).send({status:false,msg:error.message})
    }
}

const deleted = async function (req, res) {
    try {
        //Validate: The blogId is present in request path params or not.
        let blog_Id = req.params.blogid
        if (!blog_Id) return res.status(400).send({ status: false, msg: "Blog Id is required" })

        //Validate: The blogId is valid or not.
        let blog = await Blogmodel.findById(blog_Id)
        if (!blog) return res.status(404).send({ status: false, msg: "Blog does not exists" })

        //Validate: If the blogId is not deleted (must have isDeleted false)
        let is_Deleted = blog.isDeleted
        if (is_Deleted == true) return res.status(404).send({ status: false, msg: "Blog is already deleted" })

        //Delete a blog by changing the its isDeleted to true.
        let deletedBlog = await Blogmodel.findOneAndUpdate({ _id: blog_Id },
            { $set: { isDeleted: true ,deletedAt:Date.now() } }, { new: true })
        //Sending the Deleted response after updating isDeleted : true
        return res.status(200).send({ status: true, msg: "Blog deleted succesfully" })
    }
    catch (err) {
        console.log("This is the error :", err.message)
        return res.status(500).send({ status: false, msg: " Server Error", error: err.message })
    }
}

const deleteblog = async function (req, res) {

    try {

        let authorId = req.query.authorId
        let categoryname = req.query.category
        let tagname = req.query.tags
        let subcategoryname = req.query.subcategory
        let unpublished = req.query.isPublished
        let Blog = await Blogmodel.findById(authorId)
        if (authorId) {
             await Blogmodel.findOneAndUpdate({ authorId: authorId }, { isDeleted: true,deletedAt:Date.now() }, { new: true })
            return res.status(200).send({ status: true, msg:"Deleted Successfully" })
        }
        if (categoryname) {
            await Blogmodel.findOneAndUpdate({ category: categoryname }, { isDeleted: true,deletedAt:Date.now() }, { new: true })
            return res.status(200).send({ status: true, msg:"Deleted Successfully"})
        }

        if (tagname) {

             await Blogmodel.findOneAndUpdate({ tags: tagname }, { isDeleted: true ,deletedAt:Date.now()}, { new: true })

            return res.status(200).send({ status: true, msg:"Deleted Successfully" })

        }
        if (subcategoryname) {
            await Blogmodel.findOneAndUpdate({ subcategory: categoryname }, { isDeleted: true ,deletedAt:Date.now()}, { new: true })
            return res.status(200).send({ status: true, msg:"Deleted Successfully" })
        }

        if (unpublished) {
             await Blogmodel.findOneAndUpdate({ isPublished: unpublished }, { isDeleted: true, deletedAt:Date.now() }, { new: true })
            return res.status(200).send({ status: true, msg:"Deleted Successfully" })
        }
    }

    catch (error) {
        return res.status(500).send({ error: error.message })
    }

}




module.exports.createblog=createblog
module.exports.getblogs=getblogs
module.exports.blogsUpdate=blogsUpdate
module.exports.deleted=deleted
module.exports.deleteblog = deleteblog

