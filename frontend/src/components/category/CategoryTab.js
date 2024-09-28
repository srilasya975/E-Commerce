import { FaMobileButton } from "react-icons/fa6";
import { BsFillLaptopFill } from "react-icons/bs";
import { GiClothes } from "react-icons/gi";
import { ImBooks } from "react-icons/im";
import { GiLipstick } from "react-icons/gi";
import { MdOutlineSportsTennis } from "react-icons/md";
import { IoHomeSharp } from "react-icons/io5";
import { PiTelevisionSimpleFill } from "react-icons/pi";
import { GiConverseShoe } from "react-icons/gi";
import { MdToys } from "react-icons/md";
import { FaKitchenSet } from "react-icons/fa6";
import { MdHealthAndSafety } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const CategoryTab = () => {
  const [keyword, setKeyword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  console.log(keyword);

  const handleCategoryClick = (category) => {
    setKeyword(category);
    console.log(category);
    navigate(`/category/${category}`);
  };

  const clearKeyword = () => {
    setKeyword("");
  };

  useEffect(() => {
    if (location.pathname === "/") {
      clearKeyword();
    }
  }, [location]);

  return (
    <div className=" w-full h-full py-[5rem] lg:pt-1.5 lg:py-0 lg:px-0 px-2 text-neutral-700 lg:text-neutral-600">
      {/* Mobile */}
      <form className="w-full h-full flex lg:flex-nowrap flex-wrap justify-around gap-2">
        <div
          className="flex-col bg-neutral-200 bg-opacity-70 w-[30%] h-[23%] flex items-center justify-center lg:gap-0 gap-3 lg:py-2 lg:rounded-sm cursor-pointer"
          onClick={() => handleCategoryClick("Electronics")}
        >
          <PiTelevisionSimpleFill className="text-3xl lg:text-xl" />
          <p className="lg:text-sm">Electronics</p>
        </div>
        <div
          className="flex-col bg-neutral-200 bg-opacity-70 w-[30%] h-[23%] flex items-center justify-center lg:gap-0 gap-3 lg:py-2 lg:rounded-sm cursor-pointer"
          onClick={() => handleCategoryClick("Mobile")}
        >
          <FaMobileButton className="text-3xl lg:text-xl" />
          <p className="lg:text-sm">Mobiles</p>
        </div>
        <div
          className="flex-col bg-neutral-200 bg-opacity-70 w-[30%] h-[23%] flex items-center justify-center lg:gap-0 gap-3 lg:py-2 lg:rounded-sm cursor-pointer"
          onClick={() => handleCategoryClick("Laptops")}
        >
          <BsFillLaptopFill className="text-3xl lg:text-xl" />
          <p className="lg:text-sm">Laptops</p>
        </div>
        <div
          className="flex-col bg-neutral-200 bg-opacity-70 w-[30%] h-[23%] flex items-center justify-center lg:gap-0 gap-3 lg:py-2 lg:rounded-sm cursor-pointer"
          onClick={() => handleCategoryClick("Clothes")}
        >
          <GiClothes className="text-3xl lg:text-xl" />
          <p className="lg:text-sm">Clothes</p>
        </div>
        <div
          className="flex-col bg-neutral-200 bg-opacity-70 w-[30%] h-[23%] flex items-center justify-center lg:gap-0 gap-3 lg:py-2 lg:rounded-sm cursor-pointer"
          onClick={() => handleCategoryClick("Books")}
        >
          <ImBooks className="text-3xl lg:text-xl" />
          <p className="lg:text-sm">Books</p>
        </div>
        <div
          className="flex-col bg-neutral-200 bg-opacity-70 w-[30%] h-[23%] flex items-center justify-center lg:gap-0 gap-3 lg:py-2 lg:rounded-sm cursor-pointer"
          onClick={() => handleCategoryClick("Beauty")}
        >
          <GiLipstick className="text-3xl lg:text-xl" />
          <p className="lg:text-sm">Beauty</p>
        </div>
        <div
          className="flex-col bg-neutral-200 bg-opacity-70 w-[30%] h-[23%] flex items-center justify-center lg:gap-0 gap-3 lg:py-2 lg:rounded-sm cursor-pointer"
          onClick={() => handleCategoryClick("Sports")}
        >
          <MdOutlineSportsTennis className="text-3xl lg:text-xl" />
          <p className="lg:text-sm">Sports</p>
        </div>
        <div
          className="flex-col bg-neutral-200 bg-opacity-70 w-[30%] h-[23%] flex items-center justify-center lg:gap-0 gap-3 lg:py-2 lg:rounded-sm cursor-pointer"
          onClick={() => handleCategoryClick("Appliances")}
        >
          <IoHomeSharp className="text-3xl lg:text-xl" />
          <p className="lg:text-sm">Appliances</p>
        </div>
        <div
          className="flex-col bg-neutral-200 bg-opacity-70 w-[30%] h-[23%] flex items-center justify-center lg:gap-0 gap-3 lg:py-2 lg:rounded-sm cursor-pointer"
          onClick={() => handleCategoryClick("Accessories")}
        >
          <GiConverseShoe className="text-3xl lg:text-xl" />
          <p className="lg:text-sm">Accessories</p>
        </div>
        <div
          className="flex-col bg-neutral-200 bg-opacity-70 w-[30%] h-[23%] flex items-center justify-center lg:gap-0 gap-3 lg:py-2 lg:rounded-sm cursor-pointer"
          onClick={() => handleCategoryClick("Toys")}
        >
          <MdToys className="text-3xl lg:text-xl" />
          <p className="lg:text-sm">Toys & Baby</p>
        </div>
        <div
          className="flex-col bg-neutral-200 bg-opacity-70 w-[30%] h-[23%] flex items-center justify-center lg:gap-0 gap-3 lg:py-2 lg:rounded-sm cursor-pointer"
          onClick={() => handleCategoryClick("Kitchen")}
        >
          <FaKitchenSet className="text-3xl lg:text-xl" />
          <p className="lg:text-sm">Kitchen</p>
        </div>
        <div
          className="flex-col bg-neutral-200 bg-opacity-70 w-[30%] h-[23%] flex items-center justify-center lg:gap-0 gap-3 lg:py-2 lg:rounded-sm cursor-pointer"
          onClick={() => handleCategoryClick("Health")}
        >
          <MdHealthAndSafety className="text-3xl lg:text-xl" />
          <p className="lg:text-sm">Health</p>
        </div>
      </form>
    </div>
  );
};

export default CategoryTab;
