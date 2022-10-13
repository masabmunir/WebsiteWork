var express = require('express');
var app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('./conn');
const userRoutes = require('./routes');
const port = process.env.port || 8000



var allowCrossDomain = function(req, res) {

   res.setHeader('Access-Control-Allow-Origin', "*")

}
app.use(cors({allowCrossDomain}))
// app.use(cors({origin:'http://localhost:4200/'}));
app.use(bodyParser.json());


app.use('/data',userRoutes);



app.listen(port,()=>{

   console.log('Server Started at port 8000');
})
