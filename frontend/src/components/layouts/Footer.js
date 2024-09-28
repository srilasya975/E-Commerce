import { RiInstagramFill } from "react-icons/ri";
import { FaGithub } from "react-icons/fa";
import { IoLogoLinkedin } from "react-icons/io5";
import { BsStripe } from "react-icons/bs";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="bg-[#262626] flex flex-col text-neutral-300 pt-10 lg:mb-0 mb-[3.5rem]">
      <div className="flex w-full justify-between lg:px-10 px-4">
        <div className="flex gap-4 lg:text-2xl text-xl cursor-pointer">
          <Link
            href="https://www.instagram.com/im_darkk_?utm_source=qr&igsh=MWlzZ3drZ3N2cmZuaw=="
            target="_blank"
            rel="noopener noreferrer"
          >
            <RiInstagramFill />
          </Link>
          <Link
            href="https://github.com/Poovarasan-A"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
          </Link>
          <Link
            href="https://www.linkedin.com/in/poovarasan-arumugam-3b798523b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IoLogoLinkedin />
          </Link>
        </div>
        <div>
          <img src="/images/whitelogo.png" className="w-[7rem]" alt="logo" />
        </div>
        <div className="flex gap-2  items-center">
          <BsStripe className="lg:text-2xl text-xl" />
          <p>Stripe</p>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row w-full items-center justify-center gap-10 py-14 lg:text-xs text-[10px] tracking-widest cursor-pointer">
        <div className="flex lg:gap-10 gap-8">
          <p>ELECTRONICS</p>
          <p>CLOTHES</p>
          <p>ACCESSORIES</p>
          <p>LAPTOPS</p>
        </div>
        <div className="flex lg:gap-10 gap-8">
          <p>MOBILES</p>
          <p>SPORTS</p>
          <p>BEAUTY</p>
        </div>
      </div>
      <hr className="border-neutral-700" />
      <div className="w-full flex justify-center py-4 text-xs">
        <p className="flex gap-2 items-center">
          Designed by{" "}
          <img src="/images/sign.png" className="w-[5rem] invert" alt="sign" />{" "}
          @ 2024
        </p>
      </div>
    </div>
  );
};
export default Footer;
