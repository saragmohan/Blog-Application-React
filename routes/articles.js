const router = require('express').Router();
const { response } = require('express');
const User = require("../models/User");
const Article = require("../models/Article");



//CREATE New Article
router.post("/", async (req, res) => {
    const newArticle = new Article(req.body);
    try {
        const savedArticle = await newArticle.save();
        res.status(200).json(savedArticle);
    } catch (err) {
        res.status(500).json(err);
    }

});

//UPDATE Article
router.put("/:id", async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (article.username === req.body.username) {
            try {
                const updatedArticle = await Article.findByIdAndUpdate(req.params.id, {
                    $set: req.body,
                }, { new: true });
                res.status(200).json(updatedArticle);
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(404).json("You can update only your post!");
        }

    } catch (err) {
        res.status(500).json(err);
    }
});


//Delete Article

router.delete("/:id", async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (article.username === req.body.username) {
            try {
                await article.delete();
                res.status(200).json('Article has been deleted');
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(404).json("You can delete only your post!");
        }

    } catch (err) {
        res.status(500).json(err);
    }
});


//GET Article

router.get("/:id", async (req, res) => {
    console.log(req.params.id);
    try {
        const article = await Article.findById(req.params.id);

        res.status(200).json(article);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET All Articles
router.get("/", async (req, res) => {
    const username = req.query.user;
    try {
        let articles;
        if (username) {
            articles = await Article.find({ username });
        } else {
            articles = await Article.find();
        }
        res.status(200).json(articles);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;  