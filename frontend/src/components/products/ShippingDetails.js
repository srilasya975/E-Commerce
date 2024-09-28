import { Link, useNavigate } from "react-router-dom";
import CheckoutPage from "./CheckoutPage";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { countries } from "countries-list";
import { saveShipInfo } from "../../slices/cartSlice";
import { FaArrowLeft } from "react-icons/fa6";
import toast from "react-hot-toast";

export const validateShipping = (shippingInfo, navigate) => {
  if (
    !shippingInfo.address ||
    !shippingInfo.city ||
    !shippingInfo.state ||
    !shippingInfo.country ||
    !shippingInfo.phoneNo ||
    !shippingInfo.postalCode
  ) {
    toast.error("Please fill the shipping information", {
      position: "top-center",
    });
    navigate("/shipping");
  }
};

const ShippingDetails = () => {
  const { shippingInfo = {} } = useSelector((state) => state.cartState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState(shippingInfo.name || "");
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo || "");
  const [address, setAddress] = useState(shippingInfo.address || "");
  const [city, setCity] = useState(shippingInfo.city || "");
  const [postalCode, setPostalCode] = useState(shippingInfo.postalCode || "");
  const [country, setCountry] = useState(shippingInfo.country || "");
  const [state, setState] = useState(shippingInfo.state || "");
  const countriesList = Object.values(countries || "");

  const shipHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShipInfo({ name, address, city, phoneNo, postalCode, country, state })
    );
    navigate("/confirm/order");
  };

  const shouldHideCheckoutButton = true;
  const shouldHidePromo = true;

  return (
    <div className="w-full h-full lg:mt-[4rem] mt-[4rem]">
      <div className="lg:w-[75%] w-full lg:px-32 px-3 lg:pt-5 py-5">
        <h2 className="font-bold text-xl lg:text-2xl my-4 text-start">
          Add Shipping Address
        </h2>
        <hr />
        <form onSubmit={shipHandler} className="flex  flex-col gap-6 pt-10">
          <div className="w-[100%] flex gap-4 ">
            <input
              type="text"
              className="border-2 w-[50%] border-gray-400 outline-none py-3 px-4"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="number"
              className="border-2 w-[50%] border-gray-400 outline-none py-3 px-4"
              placeholder="Phone Number"
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              required
            />
          </div>
          <div className="w-full flex gap-4 ">
            <input
              type="number"
              className="border-2 w-[50%] border-gray-400 outline-none py-3 px-4"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              placeholder="Pincode"
              required
            />
            <input
              type="text"
              className="border-2 w-[50%] border-gray-400 outline-none py-3 px-4"
              placeholder="City/District/Town"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>
          <div className="w-full ">
            <textarea
              type="text"
              className="border-2 resize-none w-full h-[5rem] border-gray-400 outline-none py-3 px-4"
              placeholder="Address (Area,Road name and Street)"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="w-full flex gap-4 ">
            <input
              type="text"
              className="border-2 w-[50%] border-gray-400 outline-none py-3 px-4"
              placeholder="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
            />
            <select
              className="border-2 w-[50%] border-gray-400 outline-none py-3 px-4"
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            >
              {countriesList.map((country, index) => (
                <option key={index} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-2 py-2">
            <input type="checkbox" className="" id="sameBilling" />
            <label htmlFor="sameBilling">
              Billing address Same as shipping Address
            </label>
          </div>
          <div>
            <button
              type="submit"
              className="bg-slate-800 py-3 w-[22rem] text-white"
            >
              Save and Deliver here
            </button>
            {/* <Link to="" className="text-blue-700 ml-10">
              Add Billing Address
            </Link> */}
          </div>
        </form>
      </div>

      <div className="lg:w-[25%] bg-slate-300 lg:h-full px-8 pt-5 lg:fixed top-[4rem] right-0">
        <CheckoutPage
          hideCheckoutButton={shouldHideCheckoutButton}
          hidePromo={shouldHidePromo}
        />
        <div className="w-full text-center text-blue-700 lg:py-10 py-8 cursor-pointer">
          <Link
            to="/"
            className="flex justify-center items-center  gap-2 mb-[4rem] lg:mb-0"
          >
            <FaArrowLeft />
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};
export default ShippingDetails;
