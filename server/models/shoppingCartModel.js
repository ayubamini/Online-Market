const mongoose = require("mpngoose");
import ProductModel from "./productModel";

const shoppingCartSchema = mongoose.Schema({
  customerId: { type: mongoose.ObjectId, required: true },
  products: { type: [ProductModel], required: true },
});


module.exports = mongoose.model("ShoppingCart", shoppingCartSchema, 'SHOPPINGCART');