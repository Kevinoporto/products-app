import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const getProducts = async(req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({success: true, data: products});
  } catch (error) {
    console.log("Error: ", error.message);
    res.status(500).json({message: "Server Error"});
  }
};

export const createProduct = async(req, res) => {
  const product = req.body;
  if(!product.name || !product.price || !product.image){
    return res.status(400).json({message: "Todos los campos son obligatorios"});
  }
  const newProduct = new Product(product);
  try {
    await newProduct.save();
    res.status(201).json({success: true, data: newProduct});
  } catch (error) {
    console.error("Error creando el producto: ", error.message);
    res.status(500).json({message: "Server Error"});
  }
};

export const updateProduct = async(req, res) => {
  const { id } = req.params;
  const product = req.body;

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({message: "Invalid Product Id"});
  }
  if(!product.name || !product.price || !product.image){
    return res.status(400).json({message: "Todos los campos son obligatorios"});
  }
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true});
    res.status(200).json({success: true, data: updatedProduct});
  } catch (error) {
    console.error("Error: ", error.message);
    res.status(500).json({message: "Server Error"});
  }
}

export const deleteProduct = async(req, res) => {
  const { id } = req.params;
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({message: "Product Not Found"});
  }
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({success: true, message: "Product deleted"});
  } catch (error) {
    console.error("Error: ", error.message);
    res.status(500).json({message: "Server Error"});
  }
}