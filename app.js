const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const products = require('./products');


app.get("/api/products", (req, res) => {
        res.json(products)
})


app.get("/api/products/:id", (req, res) => {
    const product = products.find((product) => product._id === req.params.id);
    res.json(product);
})


const PORT = process.env.PORT || 5000;

app.listen(5000, () => console.log(`STARTING SERVER AT PORT ${PORT}`));