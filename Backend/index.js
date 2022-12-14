var express = require('express');
var app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('./conn');
const userRoutes = require('./routes');
const multer = require('multer');
const port = process.env.port || 8000
const imageModal = require('./imageSection/images.modal');
const imageRoutes = require('./imageRoutes/routes');

//For loading large Images 

app.use(express.json({limit: "10mb", extended: true}))
app.use(express.urlencoded({limit: "10mb", extended: true, parameterLimit: 50000}))

// End Here

var allowCrossDomain = function(req, res) {

   res.setHeader('Access-Control-Allow-Origin', "*")

}
app.use(cors({allowCrossDomain}))
// app.use(cors({origin:'http://localhost:4200/'}));
app.use(bodyParser.json());


app.use('/data',userRoutes);

app.use('/',imageRoutes);



app.listen(port,()=>{

   console.log('Server Started at port 8000');
})
