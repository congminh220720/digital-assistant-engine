const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config()

const userRoutes = require('./routes/user-routes')
const targetRoutes = require('./routes/target-routes')
const manageTaskDaily = require('./routes/manageTaskDaily-routes')

const PORT = process.env.PORT

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api',userRoutes.routes)
app.use('/api',targetRoutes.routes)
app.use('/api',manageTaskDaily.routes)



app.listen(PORT, () =>  console.log('servernis running on port:',PORT))



