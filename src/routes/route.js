const express = require('express');
const router=express.Router()

const authorController = require('../controller.js/authorController')
const Blogcontroller=require('../controller.js/blogcontroller')
const Authmidd=require('../Middleware/auth-2')
const authmiddleware=require('../Middleware/auth')


router.post('/authors',authorController.createAuthor)
router.post('/blogs', Authmidd.authmid ,Blogcontroller.createblog)
router.get('/blogs' , Authmidd.authmid ,Blogcontroller.getblogs)
router.put('/blogs/:blogid',authmiddleware.authmiddleware ,Blogcontroller.blogsUpdate)
router.delete("/blogs/:blogid" ,authmiddleware.authmiddleware ,Blogcontroller.deleted)
router.delete('/deletekar',authmiddleware.filter, Blogcontroller.deleteblog)
router.post("/login",authorController.login)

module.exports = router;
// adding this comment for no reason