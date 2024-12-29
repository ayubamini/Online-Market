const { Product } = require('../models/productModel'); // Adjust the path as needed
const mongoose = require('mongoose')

// Get all products
const getAllProducts = (req, res) => {

    let query = {};
    if (req.query.category) {
        query.CategoryId = req.query.category;
    }

    if (req.query.Name)
        query.ProductName = { '$regex': `${req.query.Name}`, '$options': 'i' };

    if (req.query.minPrice)
        query.ProductPrice = { '$gte': req.query.minPrice };
    if (req.query.maxPrice)
        query.ProductPrice = { ...query.ProductPrice, '$lte': req.query.maxPrice };

    if (req.query.minInventory)
        query.Quantity = { '$gte': req.query.minInventory };
    if (req.query.maxInventory)
        query.Quantity = { ...query.Quantity, '$lte': req.query.maxInventory };

    if (req.query.category) {
        let arr = req.query.category.split(',');
        query.CategoryId = { '$in': arr };
    }

    let sort = {}
    if (req.query.sort) {
        if (req.query.sort === "1")
            sort = { ProductName: 1 };
        if (req.query.sort === "2")
            sort = { ProductPrice: 1 };
        if (req.query.sort === "3")
            sort = { ProductPrice: -1 };
    }

    Product.find(query)
        .sort(sort)
        .then(products => {
            res.json(products);
        })
        .catch(err => {
            res.status(500).json({ error: 'Failed to retrieve products', msg: err });
        });
};

// Get a single product by name
const getProductByName = (req, res) => {
    const productName = req.params.name;

    Product.find({ ProductName: productName })
        .then(products => {
            if (products && products.length > 0) {
                res.json(products);
            } else {
                res.status(404).json({ error: 'Product not found' });
            }
        })
        .catch(err => {
            res.status(500).json({ error: 'Failed to retrieve product', msg: err });
        });
};

const createOrUpdateProduct = (req, res) => {

    if (!req.isAdmin)
        return res.status(401).json({ error: "You are not allowed to perform the action." })

    let newProduct = req.body;

    if (!newProduct.ProductName || !newProduct.ProductPrice || !newProduct.Quantity ||
        !newProduct.CategoryId || !newProduct.Picture)
        return res.status(400).json({ err: 'Invalid Parameter' });

    let inValidPictures = newProduct.Picture.filter((value) => !validatePicture(value));
    if (inValidPictures.length >= 1)
        return res.status(400).json({ err: 'Invalid Parameter' });

    if (!newProduct._id)
        newProduct._id = new mongoose.Types.ObjectId();

    Product.findByIdAndUpdate(newProduct._id, newProduct, {
        upsert: true,
        new: true
    })
        .then((data) => {
            return res.json({ msg: 'Success' })
        })
        .catch(err => {
            console.log(err)
            return res.status(500).json({ err: 'Something went wrong' })
        });
}

const validatePicture = (url) => {

    let valid = true;
    url = url.toLowerCase();

    // check url format
    const splitedString = url.split('.');
    const format = splitedString[splitedString.length - 1];
    if (!(format === 'jpg' || format === 'jpeg' || format === 'png'))
        valid = false;


    return valid;
}

const getProductById = (req, res) => {
    if (!req.query.id)
        return res.status(400).json({ err: 'Invalid Parameter' });

    if (!mongoose.isValidObjectId(req.query.id))
        return res.json({});

    Product.findById(req.query.id)
        .then(data => res.json(data))
        .catch(err => {
            console.log(err);
            return res.status(500).json({ err: 'Something went wrong' });
        })
}

const deleteProduct = (req, res) => {

    if (!req.isAdmin)
        return res.status(401).json({ error: "You are not allowed to perform the action." })

    if (!req.query.id)
        return res.status(400).json({ err: 'Invalid Parameter' });

    if (!mongoose.isValidObjectId(req.query.id))
        return res.status(400).json({ err: 'Invalid Parameter' });

    Product.findByIdAndDelete(req.query.id)
        .then(data => res.json({ msg: 'Success' }))
        .catch(err => {
            console.log(err)
            return res.status(500).json({ err: 'Something went wrong' })
        });

}

module.exports = { getAllProducts, getProductByName, createOrUpdateProduct, deleteProduct, getProductById }