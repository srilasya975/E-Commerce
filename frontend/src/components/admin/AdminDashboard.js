import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import { getAdminProducts } from "../../actions/productAction";
import { getUsers } from "../../actions/authAction";
import { adminOrders as adminOrdersAction } from "../../actions/orderAction";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

//Icons
import { FaBasketShopping } from "react-icons/fa6";
import { HiShoppingCart } from "react-icons/hi";
import { FaUsers } from "react-icons/fa";
import { GiCash } from "react-icons/gi";
import { HiMenuAlt1 } from "react-icons/hi";
import { Link } from "react-router-dom";

ChartJS.register(BarController, BarElement, CategoryScale, LinearScale);

const AdminDashboard = () => {
  const [show, setShow] = useState(true);
  const { products = [] } = useSelector((state) => state.productsState);
  const { adminOrders = [] } = useSelector((state) => state.orderState);
  const { users = [] } = useSelector((state) => state.userState);
  const dispatch = useDispatch();

  const open = () => {
    setShow(false);
  };

  let outOfStock = 0;
  if (products.length > 0) {
    products.forEach((product) => {
      if (product.stock === 0) {
        outOfStock = outOfStock + 1;
      }
    });
  }

  const shippedOrders = adminOrders.filter(
    (order) => order.orderStatus === "Shipped"
  ).length;
  const deliveredOrders = adminOrders.filter(
    (order) => order.orderStatus === "Delivered"
  ).length;
  const cancelledOrders = adminOrders.filter(
    (order) => order.orderStatus === "Cancelled"
  ).length;

  let totalAmount = 0;
  if (adminOrders.length > 0) {
    adminOrders.forEach((order) => {
      totalAmount += order.totalPrice;
    });
  }

  useEffect(() => {
    dispatch(getAdminProducts);
    dispatch(getUsers);
    dispatch(adminOrdersAction);
  }, [dispatch]);

  return (
    <div className="w-full lg:h-screen bg-neutral-200 bg-opacity-60  text-black relative">
      <div>
        <Sidebar show={show} setShow={setShow} />
      </div>
      <div className="p-3 lg:hidden">
        <HiMenuAlt1 className="text-3xl" onClick={open} />
      </div>
      <div className="flex flex-col lg:px-10 px-2">
        <h2 className="my-5 text-2xl pl-2 pt-2 font-bold">Dashboard</h2>
        <div className="lg:flex flex flex-col lg:flex-row w-full justify-between text-white items-center py-2 gap-2 lg:gap-0">
          {/* Line 1 mob */}
          <div className="w-full flex flex-row gap-2 lg:gap-0 lg:justify-around">
            <div className="flex flex-col items-center lg:w-[16rem] lg:h-[9rem] w-[12rem] h-[8rem] shadow-sm rounded-3xl bg-violet-500 relative">
              <h2 className=" text-xl font-bold py-4">Total Revenue</h2>
              <GiCash className="text-[4rem] opacity-30 absolute top-14 left-5" />
              <div className="flex w-full h-[50%] pb-5 justify-end px-10 items-center">
                <b className="font-bold text-2xl">₹{totalAmount.toFixed(2)}</b>
              </div>
            </div>
            <Link
              to="/admin/products"
              className="flex flex-col items-center lg:w-[16rem] lg:h-[9rem] w-[12rem] h-[8rem] shadow-sm rounded-3xl bg-green-500 relative"
            >
              <h2 className=" text-xl font-bold py-4">Products</h2>
              <FaBasketShopping className="text-[3.5rem] opacity-30 top-14 left-5 absolute" />
              <div className="flex w-full   px-14 justify-end pb-5 h-[50%] items-center">
                <b className="font-bold text-2xl">{products.length}</b>
              </div>
            </Link>
          </div>
          {/* Line 2 mob */}
          <div className="w-full flex flex-row gap-2 lg:gap-0 lg:justify-around">
            <Link
              to="/admin/orders"
              className="flex flex-col items-center lg:w-[16rem] lg:h-[9rem] w-[12rem] h-[8rem] shadow-sm rounded-3xl bg-blue-500 relative"
            >
              <h2 className=" text-xl font-bold py-4">Orders</h2>
              <HiShoppingCart className="text-[3.5rem] opacity-30 absolute top-14 left-5" />
              <div className="flex w-full   px-14 justify-end pb-5  h-[50%] items-center">
                <b className="font-bold text-2xl">{adminOrders.length}</b>
              </div>
            </Link>
            <Link
              to="/admin/users"
              className="flex flex-col items-center lg:w-[16rem] lg:h-[9rem] w-[12rem] h-[8rem] shadow-sm rounded-3xl bg-orange-500 relative"
            >
              <h2 className=" text-xl font-bold py-4">Users</h2>
              <FaUsers className="text-[3.5rem] opacity-30 absolute top-14 left-5" />
              <div className="flex w-full   px-14 justify-end pb-5  h-[50%] items-center">
                <b className="font-bold text-2xl">{users.length}</b>
              </div>
            </Link>
          </div>
        </div>
        <div className="lg:flex px-2 lg:px-0">
          {/* Second Datas */}

          <div className="flex  flex-col lg:w-[20rem] h-[25rem] bg-white justify-evenly font-semibold rounded-2xl shadow-md text-black mt-10 px-5">
            <div className="flex w-full  items-center justify-between pr-5">
              <p className=" font-bold">Out of Stock</p>
              <b className=" ">{outOfStock}</b>
            </div>
            <hr />
            <div className="flex w-full justify-between items-center pr-5">
              <p className=" font-bold">Reviews</p>
              <b className=" ">{""}</b>
            </div>
            <hr />
            <div className="flex w-full  justify-between items-center pr-5">
              <p className="text-green-600 ">Delivered</p>
              <b className=" ">{deliveredOrders}</b>
            </div>
            <hr />
            <div className="flex w-full  justify-between items-center pr-5">
              <p className="text-blue-600 ">Shipped</p>
              <b className=" ">{shippedOrders}</b>
            </div>
            <hr />
            <div className="flex w-full justify-between items-center pr-5">
              <p className=" text-red-600">Cancelled</p>
              <b className=" ">{cancelledOrders}</b>
            </div>
          </div>
          {/* Chart js */}

          <div className="lg:h-[25rem] lg:w-[60rem] w-full bg-white lg:mt-10 my-5 p-5 lg:p-0 lg:px-5 lg:ml-10 rounded-2xl shadow-md">
            <Bar
              data={{
                labels: ["Orders"],
                datasets: [
                  {
                    label: "Delivered",
                    data: [deliveredOrders],
                    backgroundColor: "green",
                  },
                  {
                    label: "Shipped",
                    data: [shippedOrders],
                    backgroundColor: "blue",
                  },
                  {
                    label: "Cancelled",
                    data: [cancelledOrders],
                    backgroundColor: "red",
                  },
                  {
                    label: "Out of Stock",
                    data: [cancelledOrders],
                    backgroundColor: "orange",
                  },
                ],
              }}
              options={{
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
