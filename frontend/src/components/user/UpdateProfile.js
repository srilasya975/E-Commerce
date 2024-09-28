import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../actions/authAction";
import { clearUpdateUser } from "../../slices/authSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const MyProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");
  const { user, error, isUpdated } = useSelector((state) => state.authState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChangeAvatar = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(e.target.files[0]);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("images", avatar);
    dispatch(updateProfile(formData));
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      if (user.avatar) {
        setAvatarPreview(user.avatar);
      }
      setCreatedAt(user.createdAt);
    }
    if (isUpdated) {
      toast.success("Profile Updated Successfully", {
        position: "top-center",
        onOpen: () => dispatch(clearUpdateUser()),
      });
      dispatch(clearUpdateUser());
      navigate("/myprofile");
      return;
    }
    if (error) {
      toast.error(error, {
        position: "top-center",
      });
      return;
    }
  }, [user, isUpdated, error, dispatch, navigate]);
  return (
    <Fragment>
      <div className="w-full h-full p-8 bg-white lg:pt-[4rem] pt-[8rem]">
        <h2 className="font-bold text-2xl">Update Profile</h2>
        <form
          onSubmit={submitHandler}
          className="flex lg:flex-row flex-col w-full items-center pt-10"
        >
          <div className="lg:w-[30%] w-full flex flex-col items-center justify-center">
            <div className="w-[15rem] h-[15rem] rounded-full object-cover bg-white">
              <img
                src={avatarPreview || avatar}
                className="rounded-full object-cover w-[15rem] h-[15rem]"
                alt=""
              />
            </div>
            <div className="pt-10 flex flex-col gap-5">
              <input
                name="avatar"
                type="file"
                accept="image/*"
                onChange={onChangeAvatar}
              />

              {/* <Link
                to="/change/password"
                className=" bg-blue-500 text-white font-semibold text-lg py-2 px-8 rounded-sm hover:bg-blue-400"
              >
                Change Password
              </Link> */}
            </div>
          </div>
          <div className="lg:w-[30%] w-full flex flex-col lg:px-5 lg:items-start items-center py-8 lg:py-0">
            <div className="w-full  flex flex-col  mb-4">
              <label className="font-semibold text-lg mb-2">Name</label>
              <input
                type="name"
                className="capitalize py-2 px-2   border-2 border-gray-600"
                name="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
            <div className="w-full  flex flex-col">
              <label className="font-semibold text-lg mb-2">Email</label>
              <input
                type="email"
                className="py-2 px-2  border-2 border-gray-600"
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                value={email}
              />
            </div>
            <div className="w-full lg:w-[18rem] flex flex-col">
              <div className="flex justify-between py-4 lg:py-8">
                <h5 className="font-semibold text-lg text-gray-400">
                  Joined on
                </h5>
                <h5 className="capitalize text-lg text-gray-400">
                  Since {String(createdAt).substring(0, 4)}
                </h5>
              </div>
              <button
                type="submit"
                className=" bg-orange-500 text-white font-semibold text-lg py-2 px-8 rounded-sm hover:bg-orange-400"
              >
                Update Profile
              </button>
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  );
};
export default MyProfile;
