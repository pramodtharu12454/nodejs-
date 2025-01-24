import mongoose from "mongoose";

// set rule/schema/structure

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, // " nepal country  " => "nepal country"
    maxlength: 255, // characters e.g "a b"=> 3 characters
  },
  brand: {
    type: String,
    required: true,
    trim: true,
    maxlength: 255,
  },
  price: {
    type: Number,
    trim: true,
    min: 0,
  },
  quantity: {
    type: Number,
    trim: true,
    min: 1,
  },
  category: {
    type: String,
    required: true,
    trim: true,
    enum: [
      "grocery",
      "clothing",
      "kids",
      "stationery",
      "kitchen",
      "furniture",
      "electrinics",
      "electrical",
      "sports",
    ],
  },
  image: {
    type: String,
    required: false,
    nullable : true, 
  },
  freeShipping: {
    type : Boolean,
    required : false,
    default : false,
  },
  description: {
    type:  String,
    required: true,
    minlength: 10,
    maxlength: 1000,

  },

//    TODO : implement seller id
//   sellerId: mongoose.objectId,
});

// create table

const ProductTable = mongoose.model("Product", productSchema);

export default ProductTable;
