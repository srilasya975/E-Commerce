import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
import Loader from "../layouts/Loader";
import { logout } from "../../actions/authAction";
import toast from "react-hot-toast";

const MyProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const { user, loading } = useSelector((state) => state.authState);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout);
    toast.success("LoggedOut Successfully !", { position: "top-center" });
  };

  // const { shippingInfo } = useSelector((state) => state.cartState);
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      if (user && user.images) {
        setAvatar(user.images);
      } else {
        setAvatar("/images/default_avatar.png");
      }
    }
  }, [user]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="my-[3.5rem] lg:my-0">
      {user && (
        <div className="w-full h-full p-8 lg:pt-[5rem] pt-[8rem]bg-white">
          <div className="w-full">
            <h2 className="font-bold text-2xl mb-10">My Profile</h2>
          </div>
          <form className="lg:flex lg:h-full ">
            <div className="lg:w-[30%] lg:h-full flex flex-col items-center">
              <div className="w-[15rem] h-[15rem] rounded-full overflow-hidden bg-white">
                <img
                  src={avatar || "/images/default_avatar.png"}
                  className="rounded-full"
                  alt="Profile"
                />
              </div>
              <div className="pt-10 flex flex-col gap-5">
                <button
                  onClick={() => navigate("/updateprofile")}
                  className=" bg-orange-500 text-white font-semibold text-lg py-2 px-8 rounded-sm hover:bg-orange-400"
                >
                  Edit Profile
                </button>
                <button
                  onClick={() => navigate("/change/password")}
                  className=" bg-blue-500 text-white font-semibold text-lg py-2 px-8 rounded-sm hover:bg-blue-400"
                >
                  Change Password
                </button>
              </div>
            </div>
            {/* Name & email */}
            <div className="lg:w-[40%] px-5 py-10 lg:py-0  ">
              <div className="w-full lg:w-[20rem] flex flex-col mb-8">
                <label className="font-semibold text-lg mb-2">Name</label>
                <input
                  type="name"
                  disabled={true}
                  className="capitalize py-2 px-2 bg-gray-200  select-none"
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>
              <div className="w-full lg:w-[20rem] flex flex-col my-8">
                <label className="font-semibold text-lg mb-2">Email</label>
                <input
                  type="email"
                  disabled={true}
                  className="py-2 px-2 bg-gray-200 "
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  value={email}
                />
              </div>
              <div className="w-full lg:w-[20rem] flex  my-10 justify-between">
                <label className="font-semibold text-lg">Joined on</label>

                <h5 className="capitalize text-lg">
                  Since {String(user.createdAt).substring(0, 4)}
                </h5>
              </div>
              <div>
                <Link
                  to="/myorders"
                  className=" bg-slate-600 text-white font-semibold text-lg py-2 px-8 rounded-sm hover:bg-slate-700"
                >
                  My Orders
                </Link>
              </div>
              <div className="py-5">
                <button
                  onClick={() => logoutHandler()}
                  className=" text-red-400  font-semibold text-lg py-2 px-8 rounded-sm hover:text-red-600 hover:bg-red-100 "
                >
                  Logout
                </button>
              </div>
              <div>
                {user.role === "admin" && (
                  <div
                    className="flex items-center font-semibold hover:text-white"
                    onClick={() => {
                      navigate("/admin/dashboard");
                    }}
                  >
                    <button className="bg-neutral-400 text-white font-semibold text-lg py-2 px-8 rounded-sm hover:bg-neutral-500">
                      Dashboard
                    </button>
                  </div>
                )}
              </div>
            </div>
            {/* Address Information */}
            {/* <div className="w-[30%] px-5">
              <h2 className="my-2 font-bold text-lg">Saved Address</h2>
              <div>
                <div className="flex flex-col gap-2 ml-5 pb-5">
                  <div className="flex">
                    <p className="font-semibold">Name:&nbsp; </p>
                    <span> {shippingInfo.name}</span>
                  </div>
                  <div className="flex">
                    <p className="font-semibold">Phone Number:&nbsp; </p>
                    <span> {shippingInfo.phoneNo}</span>
                  </div>
                  <div className="flex ">
                    <p className="font-semibold">Address:&nbsp; </p>
                    <span>
                      {" "}
                      {shippingInfo.address}, {shippingInfo.city},{" "}
                      {shippingInfo.state},{shippingInfo.country}-{" "}
                      {shippingInfo.postalCode}
                    </span>
                  </div>
                </div>
                <hr />
              </div>
            </div> */}
          </form>
        </div>
      )}
    </div>
  );
};
export default MyProfile;
