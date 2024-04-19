// BACKEND/routes/Nilupul/articleRoutes.js
const express = require("express");
const router = express.Router();
const Article = require("../../models/Nilupul/article");

// Create article
router.post("/", async (req, res) => {
  try {
    const { heading, description } = req.body;
    const newArticle = new Article({
      heading,
      description,
    });
    const savedArticle = await newArticle.save();
    res.status(201).json(savedArticle);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get all articles
router.get("/", async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get article by ID
router.get("/:id", async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ error: "Article not found" });
    }
    res.json(article);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Update article by ID
router.put("/:id", async (req, res) => {
  try {
    const { heading, description } = req.body;
    const updatedArticle = await Article.findByIdAndUpdate(
      req.params.id,
      { heading, description },
      { new: true }
    );
    if (!updatedArticle) {
      return res.status(404).json({ error: "Article not found" });
    }
    res.json(updatedArticle);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Delete article by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedArticle = await Article.findByIdAndDelete(req.params.id);
    if (!deletedArticle) {
      return res.status(404).json({ error: "Article not found" });
    }
    res.json({ message: "Article deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
