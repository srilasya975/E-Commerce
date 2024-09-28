import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CheckoutPage = ({ hideCheckoutButton, hidePromo, hideSummary }) => {
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.cartState);
  const checkOutHandler = () => {
    navigate("/shipping/info");
  };
  const itemsCost = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingCost = itemsCost > 500 ? 40 : 0;
  const taxCost = Number((0.05 * itemsCost).toFixed(2));
  const totalCost = (itemsCost + shippingCost + taxCost).toFixed(2);
  return (
    <div className="pb-7 lg:pb-0">
      <div>
        {!hideSummary && (
          <h2 className="font-bold lg:text-2xl text-xl my-4">Order Summary</h2>
        )}
        <hr />
        <div className="py-5">
          <div className=" flex justify-between py-2">
            <p>ITEMS {items.length}</p>
            <p>
              Rs.
              {itemsCost.toFixed(2)}
            </p>
          </div>
          {!hidePromo && (
            <div className="flex flex-col py-2 items-start gap-1">
              <label htmlFor="promoCode">PROMO CODE</label>
              <input
                type="text"
                className="w-full p-2 my-2"
                placeholder="Enter your code"
              ></input>
              <button
                type="submit"
                className="bg-slate-800 text-white py-1 px-4 mb-2"
              >
                APPLY
              </button>
            </div>
          )}
          <hr />
          <div className="flex flex-col pt-2 justify-between ">
            <div className="flex justify-between py-2 mb-2">
              <h6>Discount</h6>
              <h6>Rs.0.00</h6>
            </div>
            <div className="flex justify-between py-2 mb-2">
              <h6>Shipping charges</h6>
              <h6>Rs.{shippingCost} </h6>
            </div>
            <div className="flex justify-between py-2 mb-2">
              <h6>Tax</h6>
              <h6>Rs.{taxCost}</h6>
            </div>
            <hr />
            <div className="flex justify-between font-bold py-2 mt-3 pb-5">
              <h5 className="">TOTAL COST</h5>
              <h5>
                Rs.
                {totalCost}
              </h5>
            </div>
            <hr />
          </div>
        </div>
        {!hideCheckoutButton && (
          <button
            className="font-semibold text-white bg-slate-800 w-full py-2"
            onClick={checkOutHandler}
          >
            CHECKOUT
          </button>
        )}
      </div>
    </div>
  );
};
export default CheckoutPage;
