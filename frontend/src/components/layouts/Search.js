import { useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
const Search = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const searchHandler = (e) => {
    e.preventDefault();
    navigate(`/search/${keyword}`);
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
    <div className="w-full">
      <form
        onSubmit={searchHandler}
        className="flex flex-grow items-center gap-3   md:min-w-[35rem] lg:min-w-[40rem] lg:h-[2.5rem] md:h-[2.5rem] h-[2.3rem]  bg-white justify-between px-4 rounded-3xl"
      >
        <input
          className="flex-grow h-full outline-none lg:text-md text-sm"
          type="text"
          placeholder="Search for Products"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button type="submit">
          <IoSearchSharp className="text-xl cursor-pointer text-slate-500" />
        </button>
      </form>
    </div>
  );
};
export default Search;
