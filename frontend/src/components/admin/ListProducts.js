import Loader from "../layouts/Loader";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { deleteProduct, getAdminProducts } from "../../actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import {
  clearProductDeleted,
  clearProductErr,
} from "../../slices/productSlice";
import toast from "react-hot-toast";
import { MdDeleteOutline } from "react-icons/md";
import { TbFilePencil } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { HiMenuAlt1 } from "react-icons/hi";

const ListProducts = () => {
  const [show, setShow] = useState(true);

  const {
    products = [],
    loading = true,
    error,
  } = useSelector((state) => state.productsState);
  const { isProductDeleted, error: productError } = useSelector(
    (state) => state.productState
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const open = () => {
    setShow(false);
  };

  const deleteHandler = (e, id) => {
    e.target.disabled = true;
    dispatch(deleteProduct(id));
  };

  useEffect(() => {
    if (error || productError) {
      toast.error(error || productError, {
        position: "top-center",
        onOpen: () => {
          dispatch(clearProductErr());
        },
      });
      return;
    }
    if (isProductDeleted) {
      toast.success("Product Deleted Succesfully!", {
        position: "top-center",
        onOpen: () => dispatch(clearProductDeleted()),
      });
      dispatch(clearProductDeleted());
      navigate("/admin/products");
      return;
    }

    dispatch(getAdminProducts);
  }, [dispatch, error, isProductDeleted, productError, navigate]);

  return (
    <div className="w-full flex justify-center items-center bg-neutral-200 bg-opacity-60 lg:mb-0 mb-10">
      <div>
        <Sidebar show={show} setShow={setShow} />
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full lg:px-10 px-2">
          <div className="w-full flex justify-between items-center">
            <div className="flex items-center lg:pt-2">
              <HiMenuAlt1
                className="text-[3rem] p-3 lg:hidden"
                onClick={open}
              />
              <h2 className="my-5 text-2xl pl-2  font-bold">Product List</h2>
            </div>
            <Link
              to="/admin/products/add"
              className="border-2 border-green-500 rounded-md flex items-center gap-2 py-1 px-2 text-green-500 hover:bg-green-200 lg:mr-20"
            >
              <span className="text-xl">+</span> Add Product
            </Link>
          </div>
          {loading ? (
            <Loader />
          ) : (
            <div className=" w-full pb-5">
              {/* Headings */}
              <div className="w-full lg:flex hidden items-center text-gray-600 pt-2 pb-5">
                <b className="bg-neutral-200 w-[5%] py-2  pl-4">#</b>
                <b className="bg-neutral-200 w-[10%] py-2 ">Image</b>
                <b className="bg-neutral-200 w-[25%] py-2 ">Name</b>
                <b className="bg-neutral-200 w-[16%] py-2">Price</b>
                <b className="bg-neutral-200 w-[13%] py-2 pl-1">Stock</b>
                <b className="bg-neutral-200 w-[15%] py-2">Seller</b>
                <b className="bg-neutral-200 w-[16%] py-2 pl-10">Actions</b>
              </div>
              <hr />
              {products.map((product, index) => {
                return (
                  <div
                    className="w-full lg:flex items-center mt-2 gap-1 px-4 lg:px-2 py-3 bg-white"
                    key={index}
                  >
                    {/* line 1 */}
                    <div className="flex w-full lg:w-[85%] gap-2 lg:gap-0">
                      <div className="lg:w-[5%]">
                        <h2>{index + 1}</h2>
                      </div>
                      <div className="w-full flex justify-around lg:justify-between ">
                        {/* image */}
                        <div className="lg:w-[12%]">
                          <div className="w-[8rem] lg:w-[4rem] flex items-center justify-center">
                            {product && (
                              <img
                                src={product.images[0].image}
                                alt={product.name}
                              />
                            )}
                          </div>
                        </div>

                        <div className="flex lg:w-full w-full flex-col lg:flex-row lg:justify-between lg:items-center ">
                          {/* name */}
                          <div className="lg:w-[25%] font-semibold ">
                            <h2>{product.name}</h2>
                          </div>
                          {/* price */}
                          <div className="lg:w-[15%] ">
                            <h2>Rs.{product.price}</h2>
                          </div>
                          {/* stock */}
                          <div className="lg:w-[5%] flex">
                            <p className="lg:hidden">Stock -&nbsp;</p>
                            {product.stock > 0 ? (
                              <p className="text-green-500">{product.stock}</p>
                            ) : (
                              <p className="text-red-500">&nbsp;Out of Stock</p>
                            )}
                          </div>
                          {/* seller */}
                          <div className="lg:w-[20%] flex ">
                            <p className="lg:hidden">Seller -&nbsp;</p>
                            <h2>{product.seller}</h2>
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr className=" lg:hidden my-3" />
                    <div className="flex lg:w-[15%] w-full justify-around">
                      <div className=" flex gap-20 text-xl ">
                        <Link
                          to={`/admin/products/update/${product._id}`}
                          className="bg-blue-500 bg-opacity-20 text-blue-500 lg:p-2 px-12 py-2 flex items-center  rounded-full"
                        >
                          <TbFilePencil />
                        </Link>
                        <button
                          onClick={(e) => deleteHandler(e, product._id)}
                          className="bg-red-500 bg-opacity-20 text-red-500 lg:p-2 px-12 py-2 flex items-center  rounded-full"
                        >
                          <MdDeleteOutline />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default ListProducts;
