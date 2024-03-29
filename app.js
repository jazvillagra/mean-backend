const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const path = require('path');
const postsRoutes = require("./routes/posts");

const app = express();

mongoose.connect('mongodb+srv://admin:huIBafEm1b1TcS5o@cluster0.nwlfr2u.mongodb.net/node-angular?retryWrites=true&w=majority')
    .then(() => {
        console.log('Connected to database!');
    })
    .catch(() => {
        console.log('Connection failed!');
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/images', express.static(path.join(__dirname, '/images')));

app.use((req, res, next) =>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS')
    next();
});

app.use('/api/posts', postsRoutes);

module.exports = app;