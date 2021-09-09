const config = require('config');
const express = require('express');
const connectDB = require('./config/db');

// start application
const app = express();

// start express middleware
app.use(express.json());

// connecting database
connectDB();

const port = config.get('PORT') || 4000;
console.log(port);

app.listen(port , ()=> console.log(`Server is starting on port: ${port}`));