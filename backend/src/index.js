// FileName: index.js
// Import express
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { createContact, deleteContact, getContact, updateContact, viewContact } from '../controllers/contact-controller.js';
const router = express.Router()
// Initialize the app
let app = express();
app.use(bodyParser.urlencoded({
     extended: true
  }));
 app.use(bodyParser.json());
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

if(mongoDB == undefined){
  mongoose.connect("mongodb://localhost:27017/mydb", { useNewUrlParser: true , useUnifiedTopology: true});
} else{
  mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
}

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