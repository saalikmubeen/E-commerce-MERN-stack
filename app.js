const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/react-E-commerce", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}).then((con) => console.log(`Connected to mongoDB: ${con.connection.host}`))
    .catch((err) => console.error(`Error:  ${err.message}`));

const Product = require("./models/Product"); 


app.get("/api/products", async (req, res) => {
    try{
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(400).json({error: err.message})
    }
})


app.get("/api/products/:id", async (req, res) => {
    try{
        const product = await Product.findById(req.params.id);

        if (!product) {
            res.status(404).json({ error: "Product not found" });
        }
        
        res.status(200).json(product);
    } catch (err) {
        res.status(400).json({error: err.message})
    }
})


const PORT = process.env.PORT || 5000;

app.listen(5000, () => console.log(`STARTING SERVER AT PORT ${PORT}`));