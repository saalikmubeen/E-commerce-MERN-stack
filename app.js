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


const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/uploads", uploadRoutes)


const PORT = process.env.PORT || 5000;

app.listen(5000, () => console.log(`STARTING SERVER AT PORT ${PORT}`));