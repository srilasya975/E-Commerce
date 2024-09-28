import { Fragment, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { allUserOrders } from "../../actions/orderAction";

const MyOrders = () => {
  const { userOrders = [] } = useSelector((state) => state.orderState);
  const dispatch = useDispatch();

  const orders = userOrders.order || [];
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const formatDate = (dateString) => {
    const year = dateString.substring(0, 4);
    const monthIndex = parseInt(dateString.substring(5, 7), 10) - 1;
    const monthName = monthNames[monthIndex];
    return `${monthName} ${year}`;
  };

  useEffect(() => {
    dispatch(allUserOrders());
  }, [dispatch]);

  return (
    <Fragment>
      <div className="w-full h-screen pt-[4rem] lg:px-20 px-4 text-sm lg:text-md">
        <h2 className="font-bold text-2xl py-5">My Orders</h2>
        {orders.length > 0 ? (
          orders.map((order) => {
            const deliveredDate = formatDate(order.deliveredAt);

            return (
              <div key={order._id} className="lg:flex w-full">
                <div className="lg:w-[60%] w-full bg-neutral-200 bg-opacity-70 flex lg:px-4 px-2 py-2 justify-between ">
                  {order.orderItems.map((item, index) => (
                    <div
                      key={index}
                      className="lg:w-[60%] flex gap-4 justify-between items-center"
                    >
                      <div className="flex gap-4">
                        <div>
                          <img src={item.file} alt={item.name} width="100" />
                        </div>
                        <div className="flex flex-col gap-4">
                          <div className="flex flex-col gap-2">
                            <p className="font-bold">{item.name}</p>
                            <p>Qty - {item.quantity}</p>
                          </div>
                          <div>
                            <p className="font-semibold">
                              {" "}
                              ₹&nbsp;{item.price}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <p className="font-bold ">
                    <p className="text-green-700"> Delivered on</p>
                    {deliveredDate}
                  </p>
                </div>
                <hr />
                <div className="lg:w-[30%] border-2 border-neutral-200 h-full flex  flex-col justify-center px-4 py-2 lg:mr-2">
                  <div className="pb-2">
                    <p className="font-semibold pb-1"> Order ID</p> {order._id}
                  </div>
                  <div className="">
                    <p className="font-semibold pb-1">Shipping to</p>
                    {order.shippingInfo.address},<br />
                    {order.shippingInfo.city}, {order.shippingInfo.country}{" "}
                    -&nbsp;
                    {order.shippingInfo.postalCode}.
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p>No orders found</p>
        )}
      </div>
    </Fragment>
  );
};

export default MyOrders;
