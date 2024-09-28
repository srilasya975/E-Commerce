import Loader from "../layouts/Loader";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HiMenuAlt1 } from "react-icons/hi";
import toast from "react-hot-toast";
import {
  deleteOrder,
  adminOrders as adminOrdersAction,
} from "../../actions/orderAction";
import { clearOrderDeleted, clearOrderError } from "../../slices/orderSlice";
import { MdDeleteOutline } from "react-icons/md";
import { TbFilePencil } from "react-icons/tb";

const ListOrder = () => {
  const [show,setShow] = useState(true)

  const {
    adminOrders = [],
    loading = true,
    error,
    isOrderDeleted,
  } = useSelector((state) => state.orderState);

  const dispatch = useDispatch();

  const open = () => {
    setShow(false);
  };

  const deleteHandler = (e, id) => {
    e.target.disabled = true;
    dispatch(deleteOrder(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-center",
        onOpen: () => {
          dispatch(clearOrderError());
        },
      });
      return;
    }
    if (isOrderDeleted) {
      toast.success("Order Deleted Succesfully!", {
        position: "top-center",
        onOpen: () => dispatch(clearOrderDeleted()),
      });
      dispatch(clearOrderDeleted());
      return;
    }

    dispatch(adminOrdersAction);
  }, [dispatch, error, isOrderDeleted]);

  return (
    <div className="w-full h-full lg:flex justify-center items-center bg-neutral-200 bg-opacity-60">
      <div>
      <Sidebar show={show} setShow={setShow}/>
      </div>
     
      <div className="w-full lg:px-10 px-2">
      <div className="flex items-center lg:pt-2">
      <HiMenuAlt1 className="text-[3rem] p-3 lg:hidden" onClick={open}/>
      <h2 className="my-5 text-2xl pl-2  font-bold">Orders List</h2>
      </div>
        {loading ? (
          <Loader />
        ) : (
          <div className=" w-full h-screen  pb-5 lg:block">
            {/* Headings */}
            <div className="w-full lg:flex items-center hidden text-gray-600 pt-2">
              <b className="bg-neutral-200 w-[5%] py-2  text-center">#</b>
              <b className="bg-neutral-200 w-[25%] py-2 text-start">Product Name</b>
              <b className="bg-neutral-200 w-[10%] py-2 text-center">No.of.Items</b>
              <b className="bg-neutral-200 w-[15%] py-2 text-center ">Order Price</b>
              <b className="bg-neutral-200 w-[20%] py-2 text-center">Order Status</b>
              <b className="bg-neutral-200 w-[25%] py-2 text-center pl-6">Actions</b>
            </div>
            <hr className="border-white my-4"/>
            {adminOrders.map((order, index) => (
              <div
                className="w-[100%] lg:flex items-center gap-1  lg:px-2 py-4  justify-between bg-white"
                key={index}
              >
                {/* first div */}
                <div className="flex lg:w-[75%] justify-evenly  ">
                  
                <div className="lg:w-[5%]">
                  <h2>{index + 1}</h2>
                </div>

                <div className="lg:w-[40%] font-semibold">
                  {order.orderItems.map((item, index) => (
                    <h2 key={index}>{item.name}</h2>
                  ))}
                </div>
                <div className="lg:w-[15%]">
                  <h2>{order.orderItems.length}</h2>
                </div>
                <div className="lg:w-[15%] ">
                  <h2>₹ {order.totalPrice}</h2>
                </div>
    
                <div
                  className={`lg:w-[25%] ${
                    order.orderStatus === "Shipped"
                      ? "text-blue-600"
                      : "text-black"
                  } ${
                    order.orderStatus === "Delivered"
                      ? "text-green-600"
                      : "text-black"
                  }
                  ${
                    order.orderStatus === "Processing"
                      ? "text-orange-500"
                      : "text-black"
                  } flex justify-center items-center`}
                >
                  <h2>{order.orderStatus}</h2>
                </div>
                </div>
                {/* seconde div */}
                <hr className=" lg:hidden my-3" />

                <div className="lg:w-[20%] w-full flex justify-around  text-xl">
                  <Link
                    to={`/admin/order/${order._id}`}
                    className="bg-blue-500 bg-opacity-20 text-blue-500 lg:p-2 px-12 py-2 flex items-center rounded-full"
                  >
                    <TbFilePencil />
                  </Link>
                  <button
                    onClick={(e) => deleteHandler(e, order._id)}
                    className="bg-red-500 bg-opacity-20 text-red-500 lg:p-2 px-12 py-2 flex items-center rounded-full"
                  >
                    <MdDeleteOutline />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default ListOrder;
