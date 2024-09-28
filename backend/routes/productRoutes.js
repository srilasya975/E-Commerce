import express from "express";
import {
  getProducts,
  singleProduct,
  updateProduct,
  deleteProduct,
  createReview,
  getReviews,
  deleteReview,
  getAdminProducts,
  addNewProducts,
  getRelatedProducts,
} from "../controllers/productController.js";
import {
  authorizeRoles,
  isAuthenticatedUser,
} from "../middleware/authenticate.js";
// import validateFileUpload from "../middleware/upload.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// Public routes
router.route("/products").get(getProducts);
router.route("/product/:id").get(singleProduct);
router.route("/products/related/:category").get(getRelatedProducts);

// Review routes
router.route("/review").put(isAuthenticatedUser, createReview);

// Admin routes
// Routes requiring authentication and admin authorization
router
  .route("/admin/product/add")
  .post(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    upload.array("images"),
    addNewProducts
  );
router
  .route("/admin/products")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);
router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);
router.route("/admin/reviews").get(getReviews);
router.route("/admin/review").delete(deleteReview);

export default router;
