const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');

const db_url = process.env.NODE_ENV === "production" ? process.env.MONGODB_URL : "mongodb://localhost/react-E-commerce";

mongoose.connect(db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}).then((con) => console.log(`Connected to mongoDB: ${con.connection.host}`))
    .catch((err) => console.error(`Error:  ${err.message}`));

const users = require("./data/users");
const products = require('./data/products');

const User = require('./models/User');
const Product = require("./models/Product");
const Order = require("./models/Order");


const importData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        const createdUsers = await User.insertMany(users);
        const adminUser = await User.findOne({ isAdmin: true });

        const productsToBeCreated = products.map((product) => {
            return { ...product, user: adminUser._id }
        });

        const createdProducts = await Product.insertMany(productsToBeCreated);

        console.log("Data imported")
        console.log(createdProducts)
        process.exit();
    } catch (err) {
        console.error("Error: ", err);
        process.exit(1);
    }
};


const deleteData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log("Data Deleted")
        process.exit();
    } catch (err) {
        console.error("Error: ", err);
        process.exit(1);
    }
};


if (process.argv[2] === '-d') {
    deleteData();
} else {
    importData();
}
