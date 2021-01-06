const express = require('express');
const router = new express.Router();
const { isLoggedIn, Admin } = require("../middleware/auth");
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


router.get("/", isLoggedIn, Admin, async (req, res) => {
    try {
        const orders = await Order.find({}).populate("user", "id, name");

        res.status(200).json({ orders: orders });

    } catch (err) {
        res.json({ error: err.message });
    }
})


router.get("/myOrders", isLoggedIn, async (req, res) => {
    try {
        const myOrders = await Order.find({ user: req.user._id }).populate('user', 'email name');

        if (!myOrders) {
            throw new Error("You don't have any orders");
        }

        res.status(200).json({ orders: myOrders });
    } catch (err) {
        res.json({ error: err.message });
    }
})


router.get("/:id", isLoggedIn, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate("user", 'name email');

        if (!order.user) {
            throw new Error("User doesn't exist!")
        }

        if (String(order.user._id) == String(req.user._id) || req.user.isAdmin) {
            res.status(200).json({ order: order });
        } else {
            throw new Error("Unauthorized!")
        }

    } catch (err) {
        res.json({ error: err.message });
    }
});


router.put("/:id/pay", isLoggedIn, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (String(order.user) !== String(req.user._id)) {
            throw new Error("Unauthorized!")
        }

        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = req.body.paymentResult;

        const updatedOder = await order.save();

        res.status(200).json({ order: updatedOder });
    } catch (err) {
        res.json({ error: err.message });
    }
})

router.put("/:id/delivered", isLoggedIn, Admin, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        order.isDelivered = true;
        order.deliveredAt = Date.now();
        
        const updatedOder = await order.save();

        res.status(200).json({ order: updatedOder });
    } catch (err) {
        res.json({ error: err.message });
    }
})

module.exports = router;
