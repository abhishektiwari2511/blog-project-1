const express = require('express');
const router=express.Router()

const authorController = require('../controller.js/authorController')

router.post('/authors',authorController.createAuthor)

module.exports = router;
// adding this comment for no reason