import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleProduct, updateProduct } from "../../actions/productAction";
import toast from "react-hot-toast";
import {
  clearProductErr,
  clearProductUpdated,
} from "../../slices/productSlice";
import Sidebar from "./Sidebar";
import Loader from "../layouts/Loader";
import { HiMenuAlt1 } from "react-icons/hi";

const ProductUpdate = () => {
  const [show, setShow] = useState(true);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [seller, setSeller] = useState("");
  const [productImages, setProductImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const { id } = useParams();

  const { isProductUpdated, error, product, loading } = useSelector(
    (state) => state.productState
  );

  const open = () => {
    setShow(false);
  };

  const categories = [
    "Electronics",
    "Mobile Phones",
    "Laptops",
    "Accessories",
    "Headphones",
    "Food",
    "Books",
    "Clothes/Shoes",
    "Beauty/Health",
    "Sports",
    "Outdoor",
    "Home",
  ];

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onImagesChange = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
    setProductImages(e.target.files[0]);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = {
      name,
      price,
      description,
      category,
      seller,
      stock,
    };
    const imageData = new FormData();
    imageData.append("files", productImages);
    dispatch(updateProduct(id, formData));
  };

  useEffect(() => {
    if (isProductUpdated) {
      toast.success("Product Updated Successfully !", {
        position: "top-center",
        onOpen: () => dispatch(clearProductUpdated()),
      });
      dispatch(clearProductUpdated());
      navigate("/admin/products");
      return;
    }
    if (error) {
      toast.error(error, {
        position: "top-center",
        onOpen: () => dispatch(clearProductErr()),
      });
      return;
    }
    dispatch(getSingleProduct(id));
  }, [isProductUpdated, dispatch, error, navigate, id]);

  useEffect(() => {
    if (product && product._id) {
      setName(product.name);
      setPrice(product.price);
      setDescription(product.description);
      setCategory(product.category);
      setSeller(product.seller);
      setStock(product.stock);
    }
  }, [product]);
  return (
    <div className="w-full h-full flex justify-center items-center mb-10 lg:mb-0">
      <div>
        <Sidebar show={show} setShow={setShow} />
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full lg:px-10 px-4">
          <div className="flex items-center lg:pt-2">
            <HiMenuAlt1 className="text-[3rem] p-3 lg:hidden" onClick={open} />
            <h2 className="my-5 text-2xl pl-2 font-bold">Update Product</h2>
          </div>
          <form onSubmit={submitHandler} className="lg:flex w-full gap-8">
            {/* First Col */}
            <div className="lg:w-[50%] w-full">
              <b className="text-lg">Description</b>
              <div className="p-5 my-4 border-2  border-gray-200 rounded-lg">
                {/* Product Name */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="productName" className="text-gray-400">
                    Product Name
                  </label>
                  <input
                    type="text"
                    id="productName"
                    className="border-2 px-2 py-2 border-gray-500 rounded-sm"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                {/* Product Description */}
                <div className="flex flex-col gap-2 pt-2">
                  <label htmlFor="productDesc" className="text-gray-400">
                    Product Description
                  </label>
                  <textarea
                    type="text"
                    id="productDesc"
                    className="border-2 px-2 py-1 h-[8rem] resize-none  border-gray-500 rounded-sm"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
              {/* Category */}
              <b className="text-lg">Category & Stock</b>
              <div className="p-5 my-4 border-2 w-full  border-gray-200 rounded-lg">
                <div className="flex flex-col gap-2 pt-2">
                  <label htmlFor="category" className="text-gray-400">
                    Product Category
                  </label>
                  <select
                    className="border-2 px-2 py-2 w-full  border-gray-500 rounded-sm"
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option>Select Product Category</option>
                    {categories.map((category, index) => (
                      <option key={index} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-2 pt-2">
                  <label htmlFor="stock" className="text-gray-400">
                    Stock
                  </label>
                  <input
                    className="border-2 px-2 py-2 w-full  border-gray-500 rounded-sm"
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                </div>
              </div>
            </div>
            {/* Second Col */}
            <div className="lg:w-[50%] w-full">
              {/* Price */}
              <b className="text-lg">Price & Seller</b>
              <div className="p-5 my-4 border-2 w-full  border-gray-200 rounded-lg">
                <div className="flex flex-col gap-2 pt-2">
                  <label htmlFor="category" className="text-gray-400">
                    Product Price
                  </label>
                  <input
                    className="border-2 px-2 py-2 w-full  border-gray-500 rounded-sm"
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2 pt-2">
                  <label htmlFor="stock" className="text-gray-400">
                    Seller Name
                  </label>
                  <input
                    className="border-2 px-2 py-2 w-full  border-gray-500 rounded-sm"
                    type="text"
                    value={seller}
                    onChange={(e) => setSeller(e.target.value)}
                  />
                </div>
              </div>
              <b className="text-lg">Product Images</b>
              <div className="p-5 my-4 border-2 w-full flex gap-4  border-gray-200 rounded-lg">
                <div className="w-[8rem] h-[8rem] flex flex-col items-center justify-center border-2 rounded-md border-dashed border-gray-300">
                  <input
                    type="file"
                    id="uploadImg"
                    className=" hidden"
                    accept="image/*"
                    multiple
                    onChange={onImagesChange}
                  />
                  <label
                    htmlFor="uploadImg"
                    className="text-blue-500 text-sm underline cursor-pointer"
                  >
                    click to upload
                  </label>
                  <p className="text-xs text-gray-400 pt-1">jpeg, jpg or png</p>
                </div>
                <div className="flex gap-2 border-2 border-gray-300">
                  {imagesPreview.map((image) => (
                    <img
                      key={image}
                      src={image}
                      alt={""}
                      width={130}
                      height={130}
                    />
                  ))}
                </div>
              </div>
              {/* Buttons */}
              <div className="flex gap-20 px-1 mt-10">
                <button
                  type="submit"
                  className="bg-slate-800 py-2 rounded-md w-full text-white"
                >
                  Update
                </button>
                <button
                  type=""
                  className="border-2 border-slate-800 py-2 rounded-md w-full text-slate-800"
                >
                  Discard
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
export default ProductUpdate;
