const express = require('express');
const router = new express.Router();

const Product = require("../models/Product"); 


router.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({error: err.message})
    }
})


router.get("/:id", async (req, res) => {
    try{
        const product = await Product.findById(req.params.id);

        if (!product) {
            res.status(404).json({ error: "Product not found" });
        }
        
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({error: err.message})
    }
})


module.exports = router;