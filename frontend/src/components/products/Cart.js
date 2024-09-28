import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  decreaseCartQty,
  increaseCartQty,
  removeItemInCart,
} from "../../slices/cartSlice";
import CheckoutPage from "./CheckoutPage";

const Cart = () => {
  const { items } = useSelector((state) => state.cartState);
  const dispatch = useDispatch();

  const increaseQty = (item) => {
    const count = item.quantity;
    if (item.stock === 0 || count >= item.stock) {
      return;
    }
    dispatch(increaseCartQty(item.product));
  };

  const decreaseQty = (item) => {
    const count = item.quantity;
    if (count === 1) {
      return;
    }
    dispatch(decreaseCartQty(item.product));
  };

  const handleQuantityChange = (e, item) => {
    const newQuantity = e.target.value;
    if (newQuantity > 0 && newQuantity <= item.stock) {
    }
  };

  return (
    <div className="w-[100%] lg:h-full relative lg:mt-[4rem] my-[4rem] lg:my-0">
      {items.length === 0 ? (
        <div className="w-full h-full flex items-center justify-center mt-[20rem] lg:mt-0">
          <h2 className="text-xl font-semibold text-center ">
            Your Cart is Empty
          </h2>
        </div>
      ) : (
        <div className="lg:flex w-[100%] lg:h-full">
          <div className="lg:w-[75%] lg:pl-10 pt-5">
            <div className="flex justify-between lg:pr-20 px-2">
              <h2 className="font-bold lg:text-2xl text-xl lg:my-4 my-2">
                Shopping Cart
              </h2>
              <h2 className="font-bold lg:text-2xl text-xl lg:my-4 my-2">
                {items.length} Items
              </h2>
            </div>
            <hr />
            <div className="text-gray-400 hidden w-full lg:flex justify-between pt-5">
              <h5 className="w-[40%] text-start">PRODUCT DETAILS</h5>
              <h5 className="w-[20%] text-center">QUANTITY</h5>
              <h5 className="w-[20%] text-center">PRICE</h5>
              <h5 className="w-[20%] text-center">TOTAL</h5>
            </div>
            {items.map((item, index) => {
              return (
                <div className="w-full flex flex-col " key={index}>
                  <div className="w-[100%] flex py-6 px-2 justify-between gap-4 lg:gap-0">
                    <div className="lg:w-[40%] w-[50%] flex items-center gap-4">
                      <img
                        src={item.image}
                        className="border-2 border-gray-400"
                        width={100}
                        height={100}
                        alt={item.name}
                      />
                      <div className="h-full flex flex-col items-start justify-between">
                        <Link to="">{item.name}</Link>
                        <p>{item.category}</p>
                        <button
                          className="text-gray-400 font-semibold"
                          onClick={() =>
                            dispatch(removeItemInCart(item.product))
                          }
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <div className="lg:w-[60%] w-[50%] flex flex-col lg:flex-row justify-around items-start lg:gap-0 gap-2">
                      <div className="lg:w-[20%] flex items-center justify-center">
                        <div className="w-[6rem] flex border-2 border-slate-800">
                          <button
                            className="bg-slate-800 text-white text-xl font-semibold px-2 cursor-pointer"
                            onClick={() => decreaseQty(item)}
                          >
                            -
                          </button>
                          <input
                            className="w-full outline-none text-center"
                            type="number"
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(e, item)}
                          />
                          <button
                            className="bg-slate-800 text-white text-xl font-semibold px-2 cursor-pointer"
                            onClick={() => increaseQty(item)}
                            disabled={item.stock === 0}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="lg:w-[20%] flex justify-center items-center">
                        <p className="lg:hidden">Price - &nbsp;</p>
                        <p>Rs.{item.price}</p>
                      </div>
                      <div className="lg:w-[20%] font-semibold flex justify-center items-center">
                        <p className="lg:hidden">Total - &nbsp;</p>
                        <p>Rs.{(item.quantity * item.price).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                  <hr />
                </div>
              );
            })}
          </div>
          <div className="lg:w-[25%] bg-slate-300 lg:h-full px-8 lg:pt-5 py-5 lg:fixed top-[4rem] right-0">
            <CheckoutPage />
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
