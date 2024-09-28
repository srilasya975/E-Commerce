import CheckoutPage from "./CheckoutPage";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const OrderConfirm = () => {
  const navigate = useNavigate();
  const { shippingInfo, items: cartItems } = useSelector(
    (state) => state.cartState
  );

  const itemsCost = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingCost = itemsCost > 500 ? 40 : 0;
  const taxCost = Number((0.05 * itemsCost).toFixed(2));
  const totalCost = (itemsCost + shippingCost + taxCost).toFixed(2);

  const paymentProcessHandler = () => {
    const data = {
      itemsCost,
      shippingCost,
      taxCost,
      totalCost,
    };
    sessionStorage.setItem("orderInformation", JSON.stringify(data));
    navigate("/product/payment");
  };

  const shouldHideCheckoutButton = true;
  const shouldHidePromo = true;
  const shouldHideSummary = true;
  return (
    <div className="w-full h-full lg:mt-[4rem] my-[4rem]">
      <div className="lg:w-[75%] lg:px-16 px-3  pt-5">
        <h2 className="font-bold text-2xl my-4 text-start">Order Summary</h2>
        <hr />
        <div>
          <h2 className="font-bold text-xl my-4 text-start">
            Shipping Information
          </h2>
          {/* Shippping info */}
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
                {shippingInfo.state}, {shippingInfo.country}-{" "}
                {shippingInfo.postalCode}
              </span>
            </div>
          </div>
          {/* Products */}
          <hr />
          <h2 className="font-bold text-xl my-4 text-start">
            Items in your cart
          </h2>
          <div className="pl-5">
            {cartItems.map((item, index) => (
              <div className=" flex flex-col justify-between" key={index}>
                <div className="w-full flex justify-between py-6">
                  <div className="lg:w-[40%] flex gap-4">
                    <img
                      src={item.image}
                      className="border-2 border-gray-400"
                      width={100}
                      height={100}
                      alt={item.name}
                    />
                    <div className="h-full flex flex-col items-start">
                      <Link to="">{item.name}</Link>
                      <p>Qty : {item.quantity}</p>
                    </div>
                  </div>
                  <div className=" flex lg:justify-center font-semibold lg:items-center items-end">
                    {/* <p className="lg:hidden">Price - &nbsp;</p> */}
                    <p>Rs.{item.price}</p>
                  </div>
                </div>
                <hr />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="lg:w-[25%] bg-slate-300 lg:h-full px-8 lg:pb-0 pb-10 pt-5 lg:fixed top-[4rem] right-0">
        <h2 className="font-bold lg:text-2xl text-xl my-4 text-start">
          Payment Details
        </h2>

        <CheckoutPage
          hideCheckoutButton={shouldHideCheckoutButton}
          hidePromo={shouldHidePromo}
          hideSummary={shouldHideSummary}
        />
        <div>
          <button
            className="font-semibold text-white bg-slate-800 w-full py-2 mb-[4rem] lg:mb-0"
            onClick={paymentProcessHandler}
          >
            CONFIRM & PAY
          </button>
        </div>
        {/* <div className="w-full text-center text-blue-700 py-10 cursor-pointer">
          <Link to="/" className="flex justify-center items-center  gap-2">
            <FaArrowLeft />
            Continue Shopping
          </Link>
        </div> */}
      </div>
    </div>
  );
};
export default OrderConfirm;
