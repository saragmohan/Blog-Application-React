const mongoose = require('mongoose');


const ArticleSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    }
}, { timesstamps: true });

module.exports = mongoose.model("Article", ArticleSchema);