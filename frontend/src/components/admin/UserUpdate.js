import { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleUser, updateUser } from "../../actions/authAction";
import { clearUserError, clearUserUpdated } from "../../slices/userSlice";
import Loader from "../layouts/Loader";
import Sidebar from "./Sidebar";
import { HiMenuAlt1 } from "react-icons/hi";

const UserUpdate = () => {
  const [show, setShow] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const { id } = useParams();

  const { isUserUpdated, error, user, loading } = useSelector(
    (state) => state.userState
  );
  const { user: authUser } = useSelector((state) => state.authState);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const open = () => {
    setShow(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = {
      name,
      email,
      role,
    };
    dispatch(updateUser(id, formData));
  };

  useEffect(() => {
    if (isUserUpdated) {
      toast.success("User Updated Successfully !", {
        position: "top-center",
        onOpen: () => dispatch(clearUserUpdated()),
      });
      dispatch(clearUserUpdated());
      navigate("/admin/users");
    } else if (error) {
      toast.error(error, {
        position: "top-center",
        onOpen: () => dispatch(clearUserError()),
      });
      navigate("/admin/users");
    } else {
      dispatch(getSingleUser(id));
    }
  }, [isUserUpdated, dispatch, error, navigate, id]);

  useEffect(() => {
    if (user && user._id) {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
  }, [user]);

  if (loading || !user) {
    return <Loader />;
  }

  return (
    <Fragment>
      <div className="w-full h-screen lg:flex justify-center items-center">
        <div>
          <Sidebar show={show} setShow={setShow} />
        </div>
        <div className="flex items-center lg:pt-2">
          <HiMenuAlt1 className="text-[3rem] p-3 lg:hidden" onClick={open} />
          <h2 className="my-5 text-2xl pl-2  font-bold">Update User</h2>
        </div>
        <div className="lg:w-[50%] lg:h-full flex items-center justify-center bg-white">
          <div className="bg-white w-[25rem] h-[28rem] flex items-center justify-center rounded-md">
            <form
              onSubmit={submitHandler}
              className="flex flex-col w-[20rem] gap-5"
            >
              <h2 className="text-2xl font-bold">Update User</h2>
              <input
                className="h-[3rem] p-2 border-2 my-2 border-gray-600"
                type="text"
                placeholder="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="h-[3rem] p-2 my-2 border-2 border-gray-600"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <select
                disabled={user && user._id === authUser._id}
                className="border-2 border-black  p-2"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              <button
                type="submit"
                disabled={loading}
                className="bg-slate-700  text-white text-md h-[3rem] hover:bg-slate-900"
              >
                Update User
              </button>
            </form>
          </div>
        </div>
        <div className="w-[50%] h-full lg:flex items-center hidden">
          <img
            className="bg-cover"
            src="/images/Wolfkart-login-page.jpg"
            fill
            alt=""
          />
        </div>
      </div>
    </Fragment>
  );
};

export default UserUpdate;
