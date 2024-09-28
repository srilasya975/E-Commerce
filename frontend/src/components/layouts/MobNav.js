import { FaHome } from "react-icons/fa";
import { MdShoppingCart } from "react-icons/md";
import { FaUser } from "react-icons/fa6";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { Link } from "react-router-dom";

const MobNav = () => {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 w-full divShadow z-50">
      <div className="bg-white w-full h-[3.5rem] text-neutral-500 flex justify-around items-center ">
        <Link to="/">
          <FaHome className="text-2xl" />
        </Link>
        <Link to="/category">
          <BiSolidCategoryAlt className="text-2xl" />
        </Link>
        <Link to="/cart">
          <MdShoppingCart className="text-2xl" />
        </Link>
        <Link to="/myprofile">
          <FaUser className="text-2xl" />
        </Link>
      </div>
    </div>
  );
};
export default MobNav;
