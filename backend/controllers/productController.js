import Product from "../models/productModel.js";
import { APIFeatures } from "../utils/APIFeatures.js";

// GET all products
const getProducts = async (req, res, next) => {
  try {
    const apiFeatures = new APIFeatures(Product.find(), req.query)
      .search()
      .filter();

    const products = await apiFeatures.query;
    const productsCount = products.length; // Count the products array directly

    res.status(200).json({
      success: true,
      count: productsCount,
      products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: error.message });
  }
};

// POST new product
const addNewProducts = async (req, res) => {
  try {
    let images = [];
    let BASE_URL = process.env.BACKEND_URL;
    if (process.env.NODE_ENV === "production") {
      BASE_URL = `${req.protocol}://${req.get("host")}`;
    }

    if (req.files.length > 0) {
      req.files.forEach((file) => {
        let url = `${BASE_URL}/images/${file.originalname}`;
        images.push({ image: url });
      });
    }

    req.body.images = images;

    req.body.user = req.user.id;

    // const productData = {
    //   ...req.body,
    // };

    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// GET single product by ID
const singleProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "reviews.user",
      "name email"
    );
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(404).json({ message: "Product not found" });
  }
};

//get related products
const getRelatedProducts = async (req, res, next) => {
  try {
    const category = req.params.category;
    const relatedProducts = await Product.find({ category }).limit(5);

    if (relatedProducts.length === 0) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({
      success: true,
      relatedProducts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE product by ID
const updateProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE product by ID
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.deleteOne();

    res.status(200).json({
      success: true,
      message: "Product deleted",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Create review for a product
const createReview = async (req, res, next) => {
  try {
    const { productId, rating, comment } = req.body;

    const review = {
      user: req.user.id,
      rating: Number(rating),
      comment,
    };

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(
      (rev) => rev.user.toString() === req.user.id.toString()
    );

    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user.toString() === req.user.id.toString()) {
          rev.comment = comment;
          rev.rating = rating;
        }
      });
    } else {
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
    }

    product.ratings =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all reviews for a product
const getReviews = async (req, res, next) => {
  try {
    const product = await Product.findById(req.query.id).populate(
      "reviews.user",
      "name email"
    );

    res.status(200).json({
      success: true,
      reviews: product.reviews,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete review for a product
const deleteReview = async (req, res, next) => {
  try {
    const product = await Product.findById(req.query.productId);

    const reviews = product.reviews.filter(
      (rev) => rev._id.toString() !== req.query.id.toString()
    );

    const numOfReviews = reviews.length;

    const ratings =
      reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;

    await Product.findByIdAndUpdate(req.query.productId, {
      reviews,
      numOfReviews,
      ratings,
    });

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all products (admin)
const getAdminProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export {
  getProducts,
  addNewProducts,
  singleProduct,
  updateProduct,
  deleteProduct,
  createReview,
  getReviews,
  deleteReview,
  getAdminProducts,
  getRelatedProducts,
};
