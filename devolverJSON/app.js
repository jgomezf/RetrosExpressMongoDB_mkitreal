const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/Product');

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/mongo-1', { useNewUrlParser: true });
mongoose.connection.on('error', function (e) {console.error(e);});

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/products', async (req,res) => {
    const products = await Product.find();
    res.json(products);
});

app.listen(3000, () => console.log("Listening on port 3000..."));