import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../actions/authAction";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { message, error, loading } = useSelector((state) => state.authState);
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    dispatch(forgotPassword(formData));
  };

  useEffect(() => {
    if (message) {
      toast.success("Email sent Successfully", {
        position: "top-center",
      });
      setEmail("");
      return;
    }
    if (error) {
      toast.error(error, {
        position: "top-center",
      });
      return;
    }
  }, [message, error]);
  return (
    <Fragment>
      <div className="w-full h-full flex justify-center items-center lg:pt-[4rem]">
        <div className="lg:w-[50%] lg:flex hidden ml-10">
          <img
            className="bg-cover"
            src="/images/Wolfkart-login-page.jpg"
            alt=""
          />
        </div>
        <div className="lg:w-[50%] h-full flex items-center justify-center bg-white">
          <div className="bg-white w-[30rem] h-[28rem] flex items-center justify-center rounded-md z-50">
            <form
              onSubmit={submitHandler}
              className="flex flex-col w-[30rem] gap-5"
            >
              <h2 className="text-2xl font-bold">Forgot Password</h2>

              <input
                name="email"
                className="h-[3rem] p-2 my-2 border-2 border-gray-600"
                type="email"
                placeholder="Enter registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-slate-800  text-white text-md h-[3rem] hover:bg-slate-600"
              >
                send Email
              </button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default ForgotPassword;
