const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require("path")

const db_url = process.env.NODE_ENV === "production" ? process.env.MONGODB_URL : "mongodb://localhost/react-E-commerce";

mongoose.connect(db_url, {
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

app.use("/uploads", express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, '/client/build')));

    app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "client", "build", "index.html")));

}


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`STARTING SERVER AT PORT ${PORT}`));