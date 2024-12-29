const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
//  _id: { type: mongoose.Types.ObjectId, required: true },
  ProductName: { type: String, required: true },
  ProductDescription: { type: String, required: false },
  ProductPrice: { type: Number, required: true },
  Quantity: { type: Number, required: true },
  Url: { type: String, required: false },
  CategoryId: { type: String, required: true },
  Picture: { type: [String], required: false },
  DiscountPrice: {type: Number, required: false},
});

const Product = mongoose.model("PRODUCT", productSchema, 'PRODUCT');
module.exports = { Product, productSchema };