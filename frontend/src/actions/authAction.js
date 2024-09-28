import axios from "axios";

import {
  loginRequest,
  loginSuccess,
  loginFail,
  registerRequest,
  registerSuccess,
  registerFail,
  loadUserRequest,
  loadUserSuccess,
  loadUserFail,
  logoutSuccess,
  logoutFail,
  updateUserRequest,
  updateUserSuccess,
  updateUserFail,
  updatePasswordRequest,
  updatePasswordSuccess,
  updatePasswordFail,
  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordFail,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFail,
} from "../slices/authSlice";
import {
  deleteUserFail,
  deleteUserRequest,
  deleteUserSuccess,
  updateSingleUserFail,
  updateSingleUserRequest,
  updateSingleUserSuccess,
  userFail,
  userRequest,
  usersFail,
  usersRequest,
  usersSuccess,
  userSuccess,
} from "../slices/userSlice";
// Login User
export const getUser = (email, password) => async (dispatch) => {
  try {
    dispatch(loginRequest());
    const { data } = await axios.post("/api/v1/login", { email, password });
    dispatch(loginSuccess(data));
  } catch (error) {
    dispatch(loginFail(error.response.data.message));
  }
};
//Register New User
export const newUser = (userData) => async (dispatch) => {
  try {
    dispatch(registerRequest());
    const config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
    };

    const { data } = await axios.post(`/api/v1/register`, userData, config);

    dispatch(registerSuccess(data));
  } catch (error) {
    dispatch(registerFail(error.response.data.message));
  }
};

//Load Loggedin User datas

export const loggedUser = async (dispatch) => {
  try {
    dispatch(loadUserRequest());

    const { data } = await axios.get(`/api/v1/myprofile`);

    dispatch(loadUserSuccess(data));
  } catch (error) {
    dispatch(loadUserFail(error.response.data.message));
  }
};

//Logout User

export const logout = async (dispatch) => {
  try {
    await axios.get(`/api/v1/logout`);

    dispatch(logoutSuccess());
  } catch (error) {
    dispatch(logoutFail(error.response.data.message));
  }
};

//Updated User Details
export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch(updateUserRequest());
    const config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
    };

    const { data } = await axios.put(`/api/v1/updateprofile`, userData, config);
    dispatch(updateUserSuccess(data));
  } catch (error) {
    dispatch(updateUserFail(error.response.data.message));
  }
};

//Updated User Password
export const updateUserPassword = (formData) => async (dispatch) => {
  try {
    dispatch(updatePasswordRequest());
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.put(
      `/api/v1/change/password`,
      formData,
      config
    );
    dispatch(updatePasswordSuccess(data));
  } catch (error) {
    dispatch(updatePasswordFail(error.response.data.message));
  }
};

//Forgot Password
export const forgotPassword = (formData) => async (dispatch) => {
  try {
    dispatch(forgotPasswordRequest());
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.post(
      `/api/v1/password/forgot`,
      formData,
      config
    );
    dispatch(forgotPasswordSuccess(data));
  } catch (error) {
    dispatch(forgotPasswordFail(error.response.data.message));
  }
};

//Reset Password
export const resetPassword = (formData, token) => async (dispatch) => {
  try {
    dispatch(resetPasswordRequest());
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.post(
      `/api/v1/password/reset/${token}`,
      formData,
      config
    );
    dispatch(resetPasswordSuccess(data));
  } catch (error) {
    dispatch(resetPasswordFail(error.response.data.message));
  }
};

//Admin Actions
export const getUsers = async (dispatch) => {
  try {
    dispatch(usersRequest());
    const { data } = await axios.get(`/api/v1/admin/users`);
    dispatch(usersSuccess(data));
  } catch (error) {
    dispatch(usersFail(error.response.data.message));
  }
};

export const getSingleUser = (id) => async (dispatch) => {
  try {
    dispatch(userRequest());
    const { data } = await axios.get(`/api/v1/admin/user/${id}`);
    dispatch(userSuccess(data));
  } catch (error) {
    dispatch(userFail(error.response.data.message));
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch(deleteUserRequest());
    await axios.delete(`/api/v1/admin/user/${id}`);
    dispatch(deleteUserSuccess());
  } catch (error) {
    dispatch(deleteUserFail(error.response.data.message));
  }
};

export const updateUser = (id, formData) => async (dispatch) => {
  try {
    dispatch(updateSingleUserRequest());
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    await axios.put(`/api/v1/admin/user/${id}`, formData, config);
    dispatch(updateSingleUserSuccess());
  } catch (error) {
    dispatch(updateSingleUserFail(error.response.data.message));
  }
};
