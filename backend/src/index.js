import * as dotenv from 'dotenv';
dotenv.config({path:'./../.env'})
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import { createContact, deleteContact, getContact, updateContact, viewContact } from '../controllers/contact-controller.js';
const router = express.Router()
// Initialize the app
let app = express();
app.use(bodyParser.urlencoded({
     extended: true
  }));
 app.use(bodyParser.json());

const corsOptions ={
    origin:['https://hybrid-dolphin-364409.de.r.appspot.com', 'http://localhost:3000'],
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
// Setup server port
var port = process.env.PORT || 8080;
router.get('/', function (req, res) {
     res.json({
         status: 'API Its Working',
         message: 'Welcome to RESTHub crafted with love!'
     });
 });
 
// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express'));
router.get('/contacts', getContact)
router.post('/contacts', createContact)

router.get('/contacts/:contact_id',viewContact)
router.patch('/contacts/:contact_id',updateContact)
router.put('/contacts/:contact_id',updateContact)
router.delete('/contacts/:contact_id',deleteContact)

let mongoDB = process.env.ENV == "PROD" ? process.env.DB_CLOUD_URI : process.env.DB_LOCAL_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});


var db = mongoose.connection;
if(!db){
     console.log("Error connecting db")}
else{
     console.log("Db connected successfully")}
// Use Api routes in the App
app.use('/api', router)
// Launch app to listen to specified port
app.listen(port, function () {
     console.log("Running RestHub on port " + port);
});

export default app