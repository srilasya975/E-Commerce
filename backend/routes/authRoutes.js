import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getUserProfile,
  changePassword,
  updateProfile,
  getUsers,
  getSpecificUser,
  updateUser,
  deleteUser,
} from "../controllers/authController.js";
import {
  authorizeRoles,
  isAuthenticatedUser,
} from "../middleware/authenticate.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.route("/register").post(upload.single("images"), registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").post(resetPassword);
router.route("/myprofile").get(isAuthenticatedUser, getUserProfile);
router.route("/change/password").put(isAuthenticatedUser, changePassword);
router
  .route("/updateprofile")
  .put(isAuthenticatedUser, upload.single("images"), updateProfile);

//Admin Routes

router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getUsers);
router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getSpecificUser);
router
  .route("/admin/user/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateUser);
router
  .route("/admin/user/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

export default router;
