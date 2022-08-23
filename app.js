const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) =>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, PATCH, POST, DELETE, OPTIONS')
    next();
});

app.post('/api/posts', (req, res, next) => {
    const post = req.body;
    console.log('Request: ', post);
    res.status(201).json({
        message: 'Post added successfully'
    });
});

app.get('/api/posts', (req, res, next) => {
    const posts = [
        {id: 'asdgar', title: 'This is the first title', content: 'This is coming from the server'},
        {id: 'gerrot', title: 'This is the second title', content: 'This is coming from the server'},
        {id: 'assudr', title: 'This is the third title', content: 'This is coming from the server'}
    ];

    res.status(200).json({
        message: 'Posts fetched successfully',
        posts: posts
    });
});

module.exports = app;