const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create model
const postSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    text: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('post', postSchema);