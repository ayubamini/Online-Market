const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  // error: _id must be defined   if _id specified here
 // _id: { type: mongoose.ObjectId },
  ParentCategory: { type: String, required: false },
  CategoryName: { type: String, required: true },
  del: {type: Boolean, required: false}
});


module.exports = mongoose.model("Category", categorySchema, "CATEGORY");