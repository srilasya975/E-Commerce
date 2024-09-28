import { FaArrowLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <img src="/images/success.png" alt="success" />
      Order Successfully Placed.
      <Link to="/myorders"> Go to Orders</Link>
      <div className="w-full text-center text-blue-700 py-10 cursor-pointer">
        <Link to="/" className="flex justify-center items-center  gap-2">
          <FaArrowLeft />
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};
export default OrderSuccess;
