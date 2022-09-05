const express = require('express');
const router=express.Router()

const authorController = require('../controller.js/authorController')
const Blogcontroller=require('../controller.js/blogcontroller')

router.post('/authors',authorController.createAuthor)
router.post('/blogs',Blogcontroller.createblog)

module.exports = router;
// adding this comment for no reason