import User from "../models/userModel.js";
import { sendEmail } from "../utils/email.js";
import sendToken from "../utils/jwtRes.js";
import crypto from "crypto";

const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  let BASE_URL = process.env.BACKEND_URL;
  if (process.env.NODE_ENV === "production") {
    BASE_URL = `${req.protocol}://${req.get("host")}`;
  }

  let images;
  // const BACKEND_URL = `http://127.0.0.1:8001`;

  if (req.file) {
    images = `${BASE_URL}/images/${req.file.originalname}`;
  }

  const user = await User.create({
    name,
    email,
    password,
    images,
  });

  sendToken(user, 201, res);
};

//Login

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(404).json({ message: "Please enter email and password" });
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return res.status(401).json({ message: "Invalid Email or Password" });
  }

  if (!(await user.isValidPassword(password))) {
    return res.status(401).json({ message: "Invalid Email or Password" });
  }

  sendToken(user, 201, res);
};

const logoutUser = async (req, res, next) => {
  res
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .status(200)
    .json({ message: "Logged out Successfully" });
};

const forgotPassword = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(404).json({ message: "User email not found" });
  }

  const resetToken = user.getResetToken();
  await user.save({ validateBeforeSave: false });

  let BASE_URL = process.env.FRONTEND_URL;
  if (process.env.NODE_ENV === "production") {
    BASE_URL = `${req.protocol}://${req.get("host")}`;
  }
  const resetUrl = `${BASE_URL}/password/reset/${resetToken}`;

  const message = `Your password reset link as follows \n\n ${resetUrl} \n\n If you have not requested this, then ignore this email`;

  try {
    sendEmail({
      email: user.email,
      subject: "E com password recovery",
      message,
    });
    res
      .status(200)
      .json({ message: `Email sent to ${user.email} successfully` });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return res.status(500).json({ message: error });
  }
};

const resetPassword = async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordTokenExpire: {
      $gt: Date.now(),
    },
  });

  if (!user) {
    res
      .status(401)
      .json({ message: "Password reset token is invalid or expired" });
  }

  if (req.body.password !== req.body.confirmPassword) {
    res.status(401).json({ message: "Password does not match " });
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordTokenExpire = undefined;
  await user.save({ validateBeforeSave: false });
  sendToken(user, 201, res);
};

const getUserProfile = async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({ message: "Profile fetched successfully", user });
};

const changePassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("+password");

    // Checking old password
    if (!(await user.isValidPassword(req.body.oldPassword))) {
      console.log("Old password is incorrect");
      return res.status(401).json({ message: "Old password is incorrect" });
    }

    // Setting new password
    user.password = req.body.password;
    await user.save();
    console.log("Password updated successfully");

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error updating password:", error);
    next(error); // Pass error to error handler middleware
  }
};

const updateProfile = async (req, res, next) => {
  let newUserData = {
    name: req.body.name,
    email: req.body.email,
  };
  let avatar;
  let BASE_URL = process.env.BACKEND_URL;
  if (process.env.NODE_ENV === "production") {
    BASE_URL = `${req.protocol}://${req.get("host")}`;
  }

  if (req.file) {
    avatar = `${BASE_URL}://${req.host}/images/${req.file.originalname}`;
    newUserData = { ...newUserData, avatar };
  }

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    user,
  });
};

//Admin Controllers

const getUsers = async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    message: "Users List fetched",
    count: users.length,
    users,
  });
};

const getSpecificUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(401).json({ message: "User not found" });
  }

  res.status(200).json({
    message: "User fetched",
    user,
  });
};

const updateUser = async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };
  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    user,
  });
};

const deleteUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(401).json({ message: "User not found" });
  }

  await user.deleteOne();

  res.status(200).json({
    message: "User deleted",
  });
};

export {
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
};
