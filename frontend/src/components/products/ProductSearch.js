import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../actions/productsAction";
import MetaData from "../layouts/MetaData";
import Loader from "../layouts/Loader";
import Products from "./Products";
import { useParams } from "react-router-dom";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Tooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap_white.css";
// import ReactPaginate from "react-paginate";

const ProductSearch = () => {
  const dispatch = useDispatch();
  const { products, loading, error, count } = useSelector(
    (state) => state.productsState
  );
  const { keyword } = useParams();
  const [price, setPrice] = useState([1, 1000000]);
  const [priceChanged, setPriceChanged] = useState(price);
  const [category, setCategory] = useState(null);
  // const [rating, setRating] = useState(null);

  const categories = [
    "Electronics",
    "Mobile Phones",
    "Laptops",
    "Accessories",
    "Health",
    "Books",
    "Clothes",
    "Beauty",
    "Sports",
    "Toys & Baby",
    "Appliances",
    "Kitchen",
  ];

  const clearFilters = () => {
    setPrice([1, 1000000]);
    setCategory(null);
  };

  useEffect(() => {
    dispatch(getAllProducts(keyword, priceChanged, category));
  }, [dispatch, error, keyword, priceChanged, category]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={"search"} />
          <div className=" my-2 pt-[4rem] h-screen  w-full flex box-border bg-neutral-200 bg-opacity-70 overflow-x-hidden">
            <div className="lg:w-[80%]">
              <h2 className="font-bold text-2xl ml-10 my-4">
                Search Products ({count})
              </h2>
              <div className="w-full lg:h-full ml-5 flex flex-wrap gap-5 ">
                {products &&
                  products.map((product) => (
                    <Products key={product._id} product={product} />
                  ))}
              </div>
            </div>
            {/* Filter Tab */}
            <div className="w-[20%] h-full bg-white py-4 px-4 fixed top-[4rem] right-0 hidden lg:block">
              <p
                className="text-right text-sm cursor-pointer"
                onClick={clearFilters}
              >
                Clear Filters
              </p>
              <h5 className="font-bold text-xl py-2">Filters</h5>
              <hr className="my-2" />
              <div className=" pt-1">
                {/* Price filter */}
                <p className="font-semibold text-lg">Price</p>
                <div
                  className="px-4 pt-2"
                  onMouseUp={() => setPriceChanged(price)}
                >
                  <Slider
                    className="mt-2"
                    range={true}
                    marks={{
                      1: "₹100",
                      1000: "₹10000",
                    }}
                    min={1}
                    max={1000}
                    defaultValue={price}
                    onChange={(price) => {
                      setPrice(price);
                    }}
                    handleRender={(renderProps) => {
                      return (
                        <Tooltip
                          overlay={`${renderProps.props["aria-valuenow"]}`}
                        >
                          <div
                            aria-valuemax={renderProps.props["aria-valuemax"]}
                            aria-valuemin={renderProps.props["aria-valuemin"]}
                            aria-valuenow={renderProps.props["aria-valuenow"]}
                            {...renderProps.props}
                          ></div>
                        </Tooltip>
                      );
                    }}
                  />
                </div>
              </div>
              {/* Category filter */}

              <div className="pt-10">
                <p className="font-semibold text-lg pb-2">Category</p>
                {categories.map((category) => (
                  <div className="w-full flex items-center gap-4  pl-5">
                    <input
                      type="checkbox"
                      className="cursor-pointer accent-slate-800"
                      key={category}
                      onChange={() => setCategory(category)}
                      id="category"
                    />

                    <label htmlFor="category" className="cursor-pointer pb-1">
                      {category}
                    </label>
                  </div>
                ))}
              </div>
              {/* Ratings Filter */}
              {/* <div className="pt-10">
                <p className="font-semibold text-lg pb-2">Ratings</p>
                <ul className="pl-3">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <li
                      className="flex items-center"
                      key={star}
                      onClick={() => setRating(star)}
                    >
                      <div className="rating-outer">
                        <div
                          className="rating-inner "
                          style={{ width: `${star * 20}%` }}
                        ></div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div> */}
            </div>
          </div>
        </>
      )}
    </Fragment>
  );
};
export default ProductSearch;
