const express = require('express');
const router = express.Router();

// Load model
const Post = require('../models/Post');

// show all post
router.get('/', async (req, res) => {
    const posts = await Post.find().lean().sort({data: -1});
    res.render('posts/index', {posts: posts})
})

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

// show post edit form
router.get('/edit/:id', async (req, res) => {
    const post = await Post.findOne({_id: req.params.id}).lean();
    res.render('posts/edit', {post})
})
// update post
router.put('/:id', async (req, res) => {
    const {title, text} = req.body;
    await Post.findOneAndUpdate({_id: req.params.id}, {title, text})
    res.redirect('/posts');
})

module.exports = router;