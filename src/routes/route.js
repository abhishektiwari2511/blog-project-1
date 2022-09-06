const express = require('express');
const router=express.Router()

const authorController = require('../controller.js/authorController')
const Blogcontroller=require('../controller.js/blogcontroller')

router.post('/authors',authorController.createAuthor)
router.post('/blogs',Blogcontroller.createblog)
router.put('/blogs/:blogid',Blogcontroller.blogsUpdate)
router.delete("/blogs/:blogId",Blogcontroller.deleted)
router.delete('/deletekar',Blogcontroller.deleteblog)

module.exports = router;
// adding this comment for no reason