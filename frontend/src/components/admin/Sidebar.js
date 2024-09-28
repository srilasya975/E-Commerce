import { Link, useNavigate } from "react-router-dom";
import { BiSolidDashboard } from "react-icons/bi";
import { FaShoppingBag } from "react-icons/fa";
import { IoBagAdd } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
// import { MdReviews } from "react-icons/md";
import { TbLogout2 } from "react-icons/tb";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { logout } from "../../actions/authAction";
import { IoClose } from "react-icons/io5";

const Sidebar = ({ show, setShow }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const close = () => {
    setShow(true);
  };

  const logoutHandler = () => {
    dispatch(logout);
    toast.success("LoggedOut Successfully !", { position: "top-center" });
    navigate("/");
  };
  return (
    <div
      className={`bg-slate-900 backdrop-blur-3xl fixed top-0 lg:left-0 ${
        show ? "left-[-15rem]" : "left-0"
      } w-[15rem] h-full  text-white z-50`}
    >
      <div className="w-full flex justify-end pt-3 pr-3 lg:hidden">
        <IoClose className="text-2xl " onClick={close} />
      </div>
      <div className="w-full flex items-center justify-center py-10">
        <Link to="/">
          <img
            className="cursor-pointer w-[7rem] lg:w-[10rem] md:w-[9rem]"
            src="/images/whitelogo.png"
            alt="wolfkart logo"
          />
        </Link>
      </div>
      <nav className="w-full flex items-center ">
        <div className=" w-full flex flex-col cursor-pointer">
          <Link
            to="/admin/dashboard"
            onClick={close}
            className="hover:bg-white hover:bg-opacity-20  flex items-center gap-4 text-md w-full py-4 pl-10"
          >
            <BiSolidDashboard className="text-xl" />
            <p className="">Dashboard</p>
          </Link>
          <Link
            to="/admin/products"
            onClick={close}
            className="hover:bg-white hover:bg-opacity-30 flex items-center gap-4 text-md w-full py-4 pl-10"
          >
            <FaShoppingBag className="text-xl" />
            <p> Products</p>
          </Link>
          <Link
            to="/admin/products/add"
            onClick={close}
            className="hover:bg-white hover:bg-opacity-30 flex items-center gap-4 text-md w-full py-4 pl-10"
          >
            <IoBagAdd className="text-xl" />
            <p> Create</p>
          </Link>

          <Link
            to="/admin/orders"
            onClick={close}
            className="hover:bg-white hover:bg-opacity-30 flex items-center gap-4 text-md w-full py-4 pl-10"
          >
            <FaShoppingCart className="text-xl" />
            <p>Orders</p>
          </Link>

          <Link
            to="/admin/users"
            onClick={close}
            className="hover:bg-white hover:bg-opacity-30 flex items-center gap-4 text-md w-full py-4 pl-10"
          >
            <FaUsers className="text-xl" />
            <p>Users</p>
          </Link>

          {/* <Link
            to="/admin/reviews"
            className="hover:bg-white hover:bg-opacity-30 flex items-center gap-4 text-md w-full py-4 pl-10"
          >
            <MdReviews className="text-xl" />
            <p>Reviews</p>
          </Link> */}
          <button
            className="hover:bg-red-500 text-red-600 hover:bg-opacity-30 flex items-center gap-4 text-md w-full py-4 pl-10 mt-[12rem]"
            onClick={(e) => {
              logoutHandler();
            }}
          >
            <TbLogout2 className="text-xl" />
            <p>Logout</p>
          </button>
        </div>
      </nav>
    </div>
  );
};
export default Sidebar;
