const express = require('express');
const router = new express.Router();
const isLoggedIn = require("../middleware/auth");
const Order = require("../models/Order");


router.post("/", isLoggedIn, async(req, res) => {
    try {
        const { shippingAddress, paymentMethod, itemsPrice, taxPrice, totalPrice, shippingPrice, orderItems } = req.body;

        if (orderItems && orderItems.length === 0) {
            throw new Error("No items to order!")
        }

        const createdOrder = await Order.create({
            shippingAddress, paymentMethod, taxPrice,
            totalPrice, shippingPrice, orderItems, itemsPrice,
            user: req.user._id,
        })

        res.status(201).json({
            order: createdOrder
        })
    } catch (err) {
        res.status(400).json({
            error: err.message
        })
    }
})


module.exports = router;
