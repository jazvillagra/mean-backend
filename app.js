const express = require('express');
const bodyParser = require('body-parser');

const Post = require('./models/post');

const mongoose = require('mongoose');
const post = require('./models/post');

mongoose.connect('mongodb+srv://admin:huIBafEm1b1TcS5o@cluster0.nwlfr2u.mongodb.net/node-angular?retryWrites=true&w=majority')
    .then(() => {
        console.log('Connected to database!');
    })
    .catch(() => {
        console.log('Connection failed!');
    });

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) =>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS')
    next();
});

app.post('/api/posts', (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    post.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Post added successfully',
            postId: result._id
        });
    });
});

app.get('/api/posts', (req, res, next) => {
    Post.find().then(documents => {
        console.log(documents);
        res.status(200).json({
            message: 'Posts fetched successfully',
            posts: documents
        });
    });
});

app.delete('/api/posts/:id', (req, res, next) => {
    Post.deleteOne({_id: req.params.id}).then(result => {
        console.log(result);
        res.status(200).json({message: 'Deleted post'});
    })
    .catch(err => {
        console.log();
    });
});

app.put("/api/posts/:id", (req, res, next) => {
    const post = new Post({
        _id: req.params.id,
        title: req.body.title,
        content: req.body.content
    })
    Post.updateOne({_id: req.params.id}, post).then(result => {
        console.log(result);
        res.status(200).json({message: 'Post updated!'});
    })
})

app.get("/api/posts/:id", (req, res, next) => {
    Post.findById(req.params.id).then(post => {
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({message: 'Post not found'})
        }
    });
})
module.exports = app;