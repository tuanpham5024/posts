const config = require('config');
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const connectDB = require('./config/db');

// routes
const posts = require('./routes/posts');


// start application
const app = express();

// start Hanlebars middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars')

// start bodyParser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// start methodOverride middleware
app.use(methodOverride('_method'));

// start express middleware
app.use(express.json());

// connecting database
connectDB();

const port = config.get('PORT') || 4000;


// use

app.get('/', (req, res) => res.render('index'));
app.get('/about', (req, res) => res.render('about'));

app.use('/posts', posts);


app.listen(port , ()=> console.log(`Server is starting on port: ${port}`));