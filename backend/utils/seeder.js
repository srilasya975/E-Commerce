import Product from "../models/productModel.js";
import products from "../data/products.json" assert { type: "json" };
import connectDB from "../config/db.js";
import dotenv from "dotenv";

dotenv.config({ path: "backend/.env" });

connectDB();

const seedProducts = async () => {
  try {
    await Product.deleteMany();
    console.log("Existing products removed");
    await Product.insertMany(products);
    console.log("All Products added !");
  } catch (error) {
    console.log(error.message);
  }
  process.exit();
};

seedProducts();
