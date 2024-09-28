import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Sidebar from "./Sidebar";
import Loader from "../layouts/Loader";
import { MdDeleteOutline } from "react-icons/md";
import { deleteUser, getUsers } from "../../actions/authAction";
import { clearUserDeleted, clearUserError } from "../../slices/userSlice";
import { Link } from "react-router-dom";
import { TbFilePencil } from "react-icons/tb";
import { HiMenuAlt1 } from "react-icons/hi";

const ListUser = () => {
  const [show, setShow] = useState(true);

  const {
    users = [],
    loading = true,
    error,
    isUserDeleted,
  } = useSelector((state) => state.userState);

  const dispatch = useDispatch();

  const open = () => {
    setShow(false);
  };

  const deleteHandler = (e, id) => {
    e.target.disabled = true;
    dispatch(deleteUser(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-center",
        onOpen: () => {
          dispatch(clearUserError());
        },
      });
      return;
    }
    if (isUserDeleted) {
      toast.success("User Deleted Succesfully!", {
        position: "top-center",
        onOpen: () => dispatch(clearUserDeleted()),
      });
      dispatch(clearUserDeleted());
      return;
    }

    dispatch(getUsers);
  }, [dispatch, error, isUserDeleted]);

  return (
    <div className="w-full h-full flex justify-center items-center bg-neutral-200 bg-opacity-60">
      <div>
        <Sidebar show={show} setShow={setShow} />
      </div>
      <div className="w-full lg:px-10 px-2">
        <div className="flex items-center lg:pt-2">
          <HiMenuAlt1 className="text-[3rem] p-3 lg:hidden" onClick={open} />
          <h2 className="my-5 text-2xl pl-2 font-bold">Users List</h2>
        </div>
        {loading ? (
          <Loader />
        ) : (
          <div className=" w-full pb-5">
            {/* Headings */}
            <div className="w-full lg:flex items-center hidden text-gray-600 pt-2 pb-5">
              <b className="bg-neutral-200 w-[5%] py-2 pl-4">#</b>
              <b className="bg-neutral-200 w-[7%] py-2  ">User</b>
              <b className="bg-neutral-200 w-[20%] py-2  ">Username</b>
              <b className="bg-neutral-200 w-[29%] py-2  pl-5">Email</b>
              <b className="bg-neutral-200 w-[12%] py-2  ">Role</b>
              <b className="bg-neutral-200 w-[12%] py-2  pl-5">Joined on</b>
              <b className="bg-neutral-200 w-[15%] py-2  pl-10">Actions</b>
            </div>
            <hr />
            {users.map((user, index) => {
              const avatar = user.images
                ? user.images
                : "/images/default_avatar.png";

              return (
                <div
                  className="w-full lg:flex items-center  mt-2 gap-1 px-4 py-3 bg-white"
                  key={index}
                >
                  {/* line 1 */}
                  <div className="flex w-full lg:w-[85%] ">
                    <div className="lg:w-[5%]">
                      <h2>{index + 1}</h2>
                    </div>
                    <div className="w-full flex justify-around lg:justify-between ">
                      {/* image */}
                      <div className="lg:w-[10%] ">
                        <div className="lg:w-[2rem] lg:h-[2rem] w-[6rem] h-[6rem] overflow-hidden rounded-full">
                          <img
                            className="rounded-full lg:w-[2rem] w-[6rem]"
                            src={avatar}
                            alt="User"
                          />
                        </div>
                      </div>
                      <div className="flex lg:w-full  flex-col lg:flex-row lg:justify-between">
                        {/* name */}
                        <div className="lg:w-[20%]">
                          <h2>{user.name}</h2>
                        </div>
                        {/* email */}
                        <div className="lg:w-[31%]">
                          <h2>{user.email}</h2>
                        </div>
                        {/* role */}
                        <div
                          className={`lg:w-[12%] ${
                            user.role === "admin"
                              ? "text-green-600"
                              : "text-blue-600"
                          } capitalize`}
                        >
                          <h2>{user.role}</h2>
                        </div>
                        {/* joined on */}
                        <div className="lg:w-[12%] capitalize">
                          <h2>
                            Since {String(user.createdAt).substring(0, 4)}
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr className=" lg:hidden my-3" />

                  <div className="flex lg:w-[15%] w-full justify-around">
                    <div className=" flex gap-14 text-xl">
                      <Link
                        to={`/admin/user/${user._id}`}
                        className="bg-blue-500 bg-opacity-20 text-blue-500  lg:p-2 px-12 py-2 flex items-center rounded-full"
                      >
                        <TbFilePencil />
                      </Link>
                      <button
                        onClick={(e) => deleteHandler(e, user._id)}
                        className="bg-red-500 bg-opacity-20 text-red-500  lg:p-2 px-12 py-2 flex items-center rounded-full"
                      >
                        <MdDeleteOutline />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
export default ListUser;
