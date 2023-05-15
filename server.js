const express = require('express');
const app = express();
const colors = require('colors');
const cookie_parser = require('cookie-parser');
const path = require('path');
const cors = require('cors');



const dotenv = require('dotenv');
const {connectDB} = require('./db.js');

global.__basedir = __dirname

//Routes
const videos = require('./routes/Videos.js');
const users = require('./routes/Users.js');
const views = require('./routes/Views.js');
const files = require('./routes/Upload.js');

dotenv.config({
    path:'./.env'
})

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.set('view engine','ejs');
app.use(cookie_parser());
app.use(cors({
    origin:'*'
}))




//Mount Routes
app.use('/',views)
app.use('/primetube',views)
app.use('/primetube/videos',videos);
app.use('/primetube/users',users);
app.use('/uploads/thumbnails', express.static(path.join(__dirname, '/uploads/thumbnails')));
app.use('/uploads/videos', express.static(path.join(__dirname, '/uploads/videos')));
app.use('/uploads/media',files);

connectDB();

const PORT = process.env.PORT || 5600;

const server  = app.listen(PORT,console.log(`Server Running on PORT: ${PORT}`.bold.cyan));
