const express = require('express');
var bodyParser = require('body-parser');
// const cors=require('cors')


const { concat } = require("lodash")

const route = require('./routes/route')
const app = express();
const http = require("http");
const mongoose=require('mongoose')
mongoose.connect("mongodb://ABHISHEK:ABHISHEK@ac-z8sfqfr-shard-00-00.2zhuz3d.mongodb.net:27017,ac-z8sfqfr-shard-00-01.2zhuz3d.mongodb.net:27017,ac-z8sfqfr-shard-00-02.2zhuz3d.mongodb.net:27017/?ssl=true&replicaSet=atlas-4htqnt-shard-0&authSource=admin&retryWrites=true&w=majority", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use('/', route);
app.listen(process.env.PORT || 5000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 5000))
});



