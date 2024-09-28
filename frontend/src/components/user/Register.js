import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { newUser } from "../../actions/authAction";
import toast from "react-hot-toast";

import { Link, useNavigate } from "react-router-dom";
import { clearLoginErr } from "../../slices/authSlice";
import Loader from "../layouts/Loader";

const Register = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [image, setImage] = useState("");

  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.authState
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const onChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const registerHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", userData.name);
    formData.append("email", userData.email);
    formData.append("password", userData.password);

    formData.append("images", image);

    dispatch(newUser(formData));
  };

  useEffect(() => {
    if (isAuthenticated) {
      toast.success(`Hi,${userData.name} welcome!`);
      navigate("/");
    }
    if (error) {
      toast.error(error, {
        position: "top-center",
      });
      dispatch(clearLoginErr());
    }
    return;
  }, [error, isAuthenticated, navigate, userData, dispatch]);
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full h-full lg:flex lg:flex-row flex-col justify-center items-center ">
          <div className="w-full lg:hidden flex items-center justify-center h-[10%] my-14">
            <img
              className="bg-cover"
              src="/images/wolfkart.png"
              width={180}
              alt="logo"
            />
          </div>
          <div className="w-[50%] lg:flex   hidden">
            <img
              className="bg-cover"
              src="/images/Wolfkart-login-page.jpg"
              alt=""
            />
          </div>
          <div className="lg:w-[50%] w-full lg:h-full flex items-center justify-center bg-white ">
            <div className=" lg:w-[25rem] w-full h-[28rem] flex flex-col items-center justify-center rounded-md z-50">
              <form
                onSubmit={registerHandler}
                className="flex flex-col justify-center w-[20rem] gap-5 lg:mr-20 pb-10 lg:pb-0 lg:pt-14"
              >
                <h2 className="text-2xl font-bold">SIGNUP</h2>

                <input
                  className="h-[3rem] p-2 my-1 border-2 border-black"
                  name="name"
                  type="name"
                  placeholder="Enter your name"
                  onChange={onChange}
                />
                <input
                  name="email"
                  className="h-[3rem] p-2 my-1 border-2 border-black"
                  type="email"
                  placeholder="Enter your email"
                  onChange={onChange}
                />
                <input
                  name="password"
                  className="h-[3rem] p-2 my-1 border-2 border-black"
                  type="password"
                  placeholder="Enter your password"
                  onChange={onChange}
                />
                <input
                  type="file"
                  className="h-[3rem] p-1"
                  accept="image/*"
                  onChange={onImageChange}
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-slate-800 text-white text-lg h-[3rem]"
                >
                  Signup
                </button>
                <Link to="/login" className="flex gap-2">
                  Already have an account?
                  <p className="text-blue-500">Login</p>
                </Link>
              </form>
              <ul className="text-sm w-[20rem] lg:w-full lg:ml-0 ml-5">
                <li className="list-disc pb-2">
                  Use a mix of uppercase, lowercase, numbers & symbols.
                </li>
                <li className="list-disc">
                  Make passwords at least 12 characters long.
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Register;
