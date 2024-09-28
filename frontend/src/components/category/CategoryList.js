import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../actions/productsAction";
import MetaData from "../layouts/MetaData";
import Loader from "../layouts/Loader";
import { useParams } from "react-router-dom";
import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap_white.css";
import Products from "../products/Products";
// import ReactPaginate from "react-paginate";

const CategoryList = () => {
  const dispatch = useDispatch();
  const { products, loading, error, count } = useSelector(
    (state) => state.productsState
  );
  const { keyword } = useParams();

  useEffect(() => {
    dispatch(getAllProducts(keyword));
  }, [dispatch, error, keyword]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={"Products"} />
          <div className=" my-2 lg:pt-[4rem] py-[4rem] w-full min-h-screen flex box-border bg-neutral-200 bg-opacity-70 overflow-x-hidden ">
            <div className="lg:w-[80%] w-full">
              <h2 className="font-bold text-2xl ml-10 my-4">
                Products ({count})
              </h2>
              <div className="w-full h-full ml-5 flex flex-wrap gap-5 ">
                {products &&
                  products.map((product) => (
                    <Products key={product._id} product={product} />
                  ))}
              </div>
            </div>
          </div>
        </>
      )}
    </Fragment>
  );
};
export default CategoryList;
