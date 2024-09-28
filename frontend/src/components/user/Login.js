import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../actions/authAction";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { clearLoginErr } from "../../slices/authSlice";
import Loader from "../layouts/Loader";

const Login = () => {
  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.authState
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(getUser(email, password));
  };

  useEffect(() => {
    if (isAuthenticated) {
      toast.success(`Welcome ${user.name} !`, {
        position: "top-center",
      });
      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else if (user.role === "user") {
        navigate("/");
      }
    }
    if (error) {
      toast.error(error, {
        position: "top-center",
      });
      dispatch(clearLoginErr());
    }

    return () => {
      dispatch(clearLoginErr());
    };
  }, [error, isAuthenticated, navigate, user, dispatch]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full h-full lg:flex lg:flex-row flex-col justify-center items-center ">
          <div className="w-full lg:hidden flex items-center justify-center h-[10%] mt-14">
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
          <div className="lg:w-[50%] w-full lg:h-full flex items-center justify-center bg-white">
            <div className=" lg:w-[25rem] w-full h-[28rem] flex items-center justify-center rounded-md z-50">
              <form
                onSubmit={loginHandler}
                className="flex flex-col justify-center w-[20rem] gap-5 lg:mr-20"
              >
                <h2 className="text-2xl font-bold">LOGIN</h2>
                <input
                  className="h-[3rem] p-2 my-2 border-2 border-black"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  className="h-[3rem] p-2 my-2 border-2 border-black"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-slate-800 h-[3rem] text-white text-lg hover:bg-slate-600"
                >
                  Login
                </button>
                <Link
                  to="/forgot/password"
                  className="text-blue-900 hover:text-blue-500"
                >
                  Forgot Password?
                </Link>
                <Link to="/register" className="flex gap-2">
                  New User?
                  <p className="text-blue-900 hover:text-blue-500">
                    Create Account
                  </p>
                </Link>
              </form>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};
export default Login;
