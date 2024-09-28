import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  // addRelatedProducts,
  addReview,
  getSingleProduct,
} from "../../actions/productAction";
import { useParams } from "react-router-dom";
import Loader from "../layouts/Loader";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import "../../App.css";
import MetaData from "../layouts/MetaData";
import toast from "react-hot-toast";
import ReactStars from "react-rating-stars-component";

import { addCartItem } from "../../actions/cartActions";
import {
  clearProduct,
  clearProductErr,
  clearReviewSubmitted,
} from "../../slices/productSlice";
import ProductReview from "./ProductReview";
import Footer from "../layouts/Footer";
// import { getAllProducts } from "../../actions/productsAction";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const {
    product = {},
    loading,
    isReviewSubmitted,
    error,
  } = useSelector((state) => state.productState);
  const { user } = useSelector((state) => state.authState);
  // const { products } = useSelector((state) => state.productsState);
  const dispatch = useDispatch();
  const { id } = useParams();

  const increaseQty = () => {
    if (product.stock === 0 || quantity >= product.stock) {
      return;
    }
    setQuantity(quantity + 1);
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };
  const reviewHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("comment", comment);
    formData.append("productId", id);
    formData.append("rating", rating);
    dispatch(addReview(formData));
  };

  const addCartHandler = () => {
    if (user) {
      dispatch(addCartItem(product._id, quantity));
      toast.success("Item Added to Cart!", {
        position: "top-center",
      });
    } else {
      toast.error("Please login to add cart", {
        position: "top-center",
      });
    }
  };

  useEffect(() => {
    if (isReviewSubmitted) {
      toast.success("Review Submitted successfully", {
        position: "top-center",
        onOpen: () => dispatch(clearReviewSubmitted()),
      });
      dispatch(clearReviewSubmitted());
      return;
    }
    if (error) {
      toast.error(error, {
        position: "top-center",
        onOpen: () => dispatch(clearProductErr()),
      });
      return;
    }
  }, [isReviewSubmitted, error, dispatch, product]);

  useEffect(() => {
    dispatch(getSingleProduct(id));

    return () => {
      dispatch(clearProduct());
    };
  }, [dispatch, id]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="w-full ">
      <MetaData title={product.name} />

      <div className="w-full lg:h-screen lg:flex pt-[4rem] bg-white">
        <div className="w-full lg:w-[40%] flex items-center bg-neutral-200 bg-opacity-70 justify-center ">
          <Carousel
            className="w-[31rem] h-[40rem] bg-white flex flex-col pt-[2rem]"
            dynamicHeight
          >
            {product.images &&
              product.images.map((image) => (
                <div key={image._id}>
                  <img src={image.image} alt="product" />
                </div>
              ))}
          </Carousel>
        </div>

        <div className="w-full lg:w-[42%] bg-white lg:px-10 px-4 lg:pt-8">
          <h5 className="text-3xl font-bold my-5">{product.name}</h5>
          <p className="text-md">{product.description}</p>
          <p className="text-2xl font-semibold my-5">Rs.{product.price}</p>
          <div className="flex items-center gap-3">
            <ReactStars
              size={24}
              value={product.ratings}
              activeColor={"#FF9529"}
              isHalf
              edit={false}
            />{" "}
            ({product.ratings})<p>{product.numOfReviews} Reviews</p>
          </div>
          {/* <p className="text-lg mt-5 mb-3">Color</p>
          <div className="flex gap-4">
            <div className="w-[2rem] h-[2rem] rounded-full bg-teal-500 cursor-pointer hover:border-2 border-slate-800"></div>
            <div className="w-[2rem] h-[2rem] rounded-full bg-rose-500 cursor-pointer hover:border-2 border-slate-800"></div>
            <div className="w-[2rem] h-[2rem] rounded-full bg-blue-500 cursor-pointer hover:border-2 border-slate-800"></div>
            <div className="w-[2rem] h-[2rem] rounded-full bg-gray-500 cursor-pointer hover:border-2 border-slate-800"></div>
          </div> */}
          <div className="pt-5">
            <div className="w-[6rem] flex border-2 border-slate-800">
              <button
                className="bg-slate-800 text-white text-xl font-semibold px-2 cursor-pointer"
                onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
              >
                -
              </button>
              <input
                className="w-full outline-none text-center"
                value={quantity}
                type="number"
                readOnly
              />
              <button
                className="bg-slate-800 text-white text-xl font-semibold px-2 cursor-pointer"
                onClick={increaseQty}
                disabled={product.stock === 0}
              >
                +
              </button>
            </div>
          </div>
          <div className="my-5 flex gap-8">
            {/* <button
              className={`w-[8rem] h-[3rem] border-4 cursor-pointer ${
                product.stock === 0
                  ? "border-gray-400 text-gray-400"
                  : "border-black hover:bg-slate-200"
              }`}
              type="submit"
              disabled={product.stock === 0}
            >
              Buy Now
            </button> */}
            <button
              className={`w-[8rem] h-[3rem] bg-black text-white cursor-pointer mb-5 ${
                product.stock === 0
                  ? "bg-gray-400"
                  : "bg-slate-800 hover:bg-gray-800"
              }`}
              disabled={product.stock === 0}
              onClick={addCartHandler}
            >
              Add to Cart
            </button>
          </div>
          <div className="my-3 flex font-semibold">
            Stock:{" "}
            {product.stock > 0 ? (
              "In Stock"
            ) : (
              <p className="text-red-500">&nbsp;Out of Stock</p>
            )}
          </div>
          <p className="my-3">Sold By: {product.seller}</p>
          <p className="my-3">Category: {product.category}</p>
        </div>
        {/* <div className="w-[18%] bg-gray-100 px-3 py-6">
          <h3 className="font-semibold text-lg text-center">
            Related Products
          </h3>
          <hr className="my-3" />
        </div> */}
      </div>
      <hr />
      {/* Reviews page */}
      <div className="w-full py-5">
        {user ? (
          <div className="w-full justify-between lg:px-32 px-4">
            <h2 className="font-bold text-xl">Product Reviews</h2>
          </div>
        ) : (
          <div className=" w-full flex items-center justify-center">
            {" "}
            Login to Post Review
          </div>
        )}
        <div className=" w-full px-4 lg:px-32 flex flex-col">
          <div>
            <ReactStars
              size={30}
              value={rating}
              onChange={handleRatingChange}
              activeColor={"#FF9529"}
              edit={true}
            />
          </div>
          <div className="py-5 w-full">
            <textarea
              onChange={(e) => setComment(e.target.value)}
              name="review"
              placeholder="Provide your review..."
              className="w-full border-2 resize-none h-32 border-zinc-500 rounded-md px-2 py-2"
            ></textarea>
          </div>
          <div>
            <button
              disabled={loading}
              onClick={reviewHandler}
              aria-label="Close"
              className="rounded-md py-1 my-3 float-right bg-orange-400 px-4 text-white"
            >
              Submit Review
            </button>
          </div>
        </div>
      </div>

      <div className="w-full px-4 lg:px-32 mb-10 flex flex-col ">
        {product.reviews && product.reviews.length > 0 ? (
          <ProductReview reviews={product.reviews} />
        ) : null}
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetails;
