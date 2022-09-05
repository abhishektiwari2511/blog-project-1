const express = require('express');
var bodyParser = require('body-parser');
// const cors=require('cors')


const { concat } = require("lodash")

const route = require('./routes/route')
const app = express();
const http = require("http");
const mongoose=require('mongoose')
mongoose.connect("mongodb+srv://Chanchal25-DB:gFTcvqSDyVwmFSO9@cluster0.ypi01as.mongodb.net/project1", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', route);
app.listen(process.env.PORT || 5000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 5000))
});



