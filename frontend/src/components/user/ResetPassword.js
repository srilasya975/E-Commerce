import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../actions/authAction";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.authState
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = {
      password,
      confirmPassword,
    };
    dispatch(resetPassword(formData, token));
  };

  useEffect(() => {
    if (isAuthenticated) {
      toast.success("Password reset successfully", {
        position: "top-center",
      });
      navigate("/");
      return;
    }
    if (error) {
      toast.error(error, {
        position: "top-center",
      });
      return;
    }
  }, [isAuthenticated, navigate, error]);
  return (
    <Fragment>
      <div className="w-full h-full flex justify-center items-center">
        <div className="w-[50%] h-full ml-10">
          <img
            className="bg-cover"
            src="/images/Wolfkart-login-page.jpg"
            alt=""
          />
        </div>
        <div className="w-[50%] h-full flex items-center justify-center bg-white">
          <div className="bg-white w-[25rem] h-[28rem] flex items-center justify-center rounded-md z-50">
            <form
              onSubmit={submitHandler}
              className="flex flex-col w-[20rem] gap-5"
            >
              <h2 className="text-2xl font-bold">Reset Password</h2>
              <input
                name="password"
                className="h-[3rem] p-2 border-2 my-2 border-gray-600"
                type="password"
                placeholder="Enter New password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                name="password"
                className="h-[3rem] p-2 my-2 border-2 border-gray-600"
                type="password"
                placeholder="Enter Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-slate-800  text-white text-md h-[3rem] hover:bg-slate-600"
              >
                Update Password
              </button>
              <ul>
                <li className="list-disc py-2">
                  Use a mix of uppercase, lowercase, numbers, and symbols.
                </li>
                <li className="list-disc">
                  Make passwords at least 12 characters long.
                </li>
              </ul>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default ResetPassword;
