import { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { clearOrderError, clearOrderUpdated } from "../../slices/orderSlice";
import { myorderDetail, updateOrder } from "../../actions/orderAction";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import Loader from "../layouts/Loader";
import { HiMenuAlt1 } from "react-icons/hi";

const OrderUpdate = () => {
  const [show, setShow] = useState(true);

  const { loading, isOrderUpdated, error, orderDetail } = useSelector(
    (state) => state.orderState
  );
  const {
    user = {},
    orderItems = [],
    shippingInfo = {},
    totalPrice = 0,
    paymentInfo = {},
  } = orderDetail;
  const isPaid = paymentInfo.status === "succeeded" ? true : false;
  const [orderStatus, setOrderStatus] = useState("Processing");
  const { id: orderId } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const open = () => {
    setShow(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const orderData = {};
    orderData.orderStatus = orderStatus;
    dispatch(updateOrder(orderId, orderData));
  };

  useEffect(() => {
    if (isOrderUpdated) {
      toast.success("Order Updated Succesfully!", {
        position: "top-center",
        onOpen: () => dispatch(clearOrderUpdated()),
      });
      navigate("/admin/orders");
      dispatch(clearOrderUpdated());
      return;
    }

    if (error) {
      toast.error(error, {
        position: "top-center",
        onOpen: () => {
          dispatch(clearOrderError());
        },
      });
      return;
    }

    dispatch(myorderDetail(orderId));
  }, [isOrderUpdated, error, dispatch, orderId, navigate]);

  useEffect(() => {
    if (orderDetail._id) {
      setOrderStatus(orderDetail.orderStatus);
    }
  }, [orderDetail]);

  return (
    <div className="w-full h-full ">
      <div>
        <Sidebar show={show} setShow={setShow} />
      </div>
      <div className="w-full lg:px-10 px-4">
        <div className="flex items-center lg:pt-2">
          <HiMenuAlt1 className="text-[3rem] py-3 lg:hidden" onClick={open} />
          <h2 className="my-5 text-2xl pl-2 lg:pl-0 font-bold">Order Update</h2>
        </div>
        {loading ? (
          <Loader />
        ) : (
          <Fragment>
            <h1 className="my-5 font-bold text-xl">
              Order # {orderDetail._id}
            </h1>
            {/* Shipping Info */}
            <div>
              <h4 className="my-2 text-lg font-bold">Shipping Info</h4>
              <div>
                <b>Name:</b> {user.name}
              </div>
              <div>
                <b>Phone:</b> {shippingInfo.phoneNo}
              </div>
              <div>
                <b>Address: &nbsp;</b>
                {shippingInfo.address}, {shippingInfo.city},{" "}
                {shippingInfo.postalCode}, {shippingInfo.state}
                {shippingInfo.country}
              </div>
              <div className="mb-4">
                <b>Amount:</b> Rs.{totalPrice}
              </div>
            </div>
            <hr />

            <div>
              <div className="flex items-center">
                <h4 className="my-4 text-md font-bold ">Payment - &nbsp;</h4>

                <p
                  className={`${
                    isPaid ? "text-green-600" : "text-red-600"
                  } font-semibold text-md`}
                >
                  {isPaid ? "PAID" : "NOT PAID"}
                </p>
              </div>
              <div className="flex mb-4 items-center">
                <h4 className=" text-md font-bold ">Order Status - &nbsp;</h4>
                <p
                  className={` ${
                    orderStatus === "Shipped" ? "text-blue-600" : "text-black"
                  } ${
                    orderStatus === "Delivered"
                      ? "text-green-600"
                      : "text-black"
                  }
                    ${
                      orderStatus === "Processing"
                        ? "text-orange-500"
                        : "text-black"
                    } font-semibold`}
                >
                  {orderStatus}
                </p>
              </div>
            </div>

            <hr />
            <div className="lg:flex items-center gap-10">
              {orderItems &&
                orderItems.map((item, index) => (
                  <div className="w-full my-5" key={index}>
                    <h4 className="my-2 text-lg font-bold ">Order Items:</h4>
                    <div className="flex w-full   gap-6">
                      <div>
                        <img
                          src={item.file}
                          alt={item.name}
                          height="100"
                          width="100"
                        />
                      </div>
                      <div className=" my-2 flex flex-col items-center gap-4">
                        <p className="font-semibold">Product Name</p>
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </div>
                      <div className=" my-2 flex flex-col items-center gap-4">
                        <p className="font-semibold">Product Price</p>
                        <p>Rs.{item.price}</p>
                      </div>
                      <div className="my-2 flex flex-col items-center gap-4">
                        <p className="font-semibold ">Product Quantity</p>
                        <p>Qty - &nbsp;{item.quantity}</p>
                      </div>
                    </div>
                  </div>
                ))}
              <div className="my-5 min-w-[30%] ">
                <div className="w-full flex flex-col px-10">
                  <h4 className="py-4 text-lg font-bold ">Order Status</h4>
                  <form className="flex flex-col  gap-4">
                    <select
                      className={`border-2 cursor-pointer rounded-sm py-2 px-2 font-semibold ${
                        orderStatus === "Shipped"
                          ? "text-blue-600 border-blue-500"
                          : "text-black"
                      } ${
                        orderStatus === "Delivered"
                          ? "text-green-600 border-green-600"
                          : "text-black"
                      }
                      ${
                        orderStatus === "Processing"
                          ? "text-orange-600 border-orange-600"
                          : "text-black"
                      }`}
                      onChange={(e) => setOrderStatus(e.target.value)}
                      value={orderStatus}
                      name="status"
                    >
                      <option value="Processing" className="text-orange-500">
                        Proccessing
                      </option>
                      <option value="Shipped" className="text-blue-600">
                        Shipped
                      </option>
                      <option value="Delivered" className="text-green-600">
                        Delivered
                      </option>
                      <option value="Delivered" className="text-red-600">
                        Cancelled
                      </option>
                    </select>
                    <button
                      disabled={loading}
                      onClick={submitHandler}
                      className="py-2 px-2 bg-slate-800 text-white hover:bg-slate-900"
                    >
                      Update Status
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <hr />
          </Fragment>
        )}
      </div>
    </div>
  );
};
export default OrderUpdate;
