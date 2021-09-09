const express = require('express');
const router = express.Router();

// Load model
const Post = require('../models/Post');


// show post creation form
router.get('/add', (req, res) => {
    res.render('posts/add')
});

// create new post
router.post('/', async (req, res) => {
    const {title, text} = req.body;

    let errors = [];

    if(!title) errors.push({msg: 'title required'});
    if(!text) errors.push({msg: 'text required'});
    if(errors.length > 0) res.render('posts/add', {title, text});

    else {
        const newPostData = {title, text}
        const newPost = new Post(newPostData)
        await newPost.save();
        res.redirect('/posts')
    }
})


module.exports = router;