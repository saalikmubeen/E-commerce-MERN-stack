const express = require('express');
const router = new express.Router();

const Product = require("../models/Product");
const {
    isLoggedIn,
    Admin
} = require("../middleware/auth");


router.get("/", async(req, res) => {
    try {
        const {
            keyword
        } = req.query;

        const search = keyword ? {
            name: {
                $regex: keyword,
                $options: 'i'
            }
        } : {};

        const products = await Product.find(search);

        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }
})


router.get("/:id", async(req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            res.status(404).json({
                error: "Product not found"
            });
        }

        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }
})


router.post("/", isLoggedIn, Admin, async(req, res) => {
    try {
        const product = await Product.create({
            name: 'Sample name',
            price: 0,
            user: req.user._id,
            image: '/images/sample.jpg',
            brand: 'Sample brand',
            category: 'Sample category',
            countInStock: 0,
            numReviews: 0,
            description: 'Sample description'
        });

        res.status(201).json({
            product: product
        });

    } catch (err) {
        res.json({
            error: err.message
        })
    }
})

router.put("/:id", isLoggedIn, Admin, async(req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            res.status(404).json({
                error: "Product not found"
            });
        }

        const {
            name,
            image,
            brand,
            category,
            description,
            price,
            countInStock
        } = req.body;

        product.name = name;
        product.image = image;
        product.brand = brand;
        product.category = category;
        product.description = description;
        product.price = price;
        product.countInStock = countInStock

        const updatedProduct = await product.save();

        res.status(200).json({
            product: updatedProduct
        });

    } catch (err) {
        res.json({
            error: err.message
        });
    }
})

router.delete("/:id", isLoggedIn, Admin, async(req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            res.status(404).json({
                error: "Product not found"
            });
        }

        await product.remove();

        res.json({
            message: "Product deleted successfully!"
        })
    } catch (err) {
        res.json({
            error: err.message
        })
    }
})


router.post("/:id/reviews", isLoggedIn, async(req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            res.status(404).json({
                error: "Product not found"
            });
        }

        const alreadyReviewed = product.reviews.some((review) => review.user.toString() === req.user._id.toString());

        if (alreadyReviewed) {
            res.status(400);
            throw new Error("You have already reviewed this product!")
        }

        const reviewObj = {
            name: req.user.name,
            rating: Number(req.body.rating),
            comment: req.body.comment,
            user: req.user._id
        }

        product.reviews = [...product.reviews, reviewObj];

        const numReviews = product.reviews.length;

        const avgRating = product.reviews.reduce((acc, next) => acc + next.rating, 0) / numReviews;

        product.numReviews = numReviews;
        product.rating = avgRating;

        const updatedProduct = await product.save();

        res.status(201).json({
            product: updatedProduct
        });
    } catch (err) {
        res.json({
            error: err.message
        })
    }
})


module.exports = router;