import axios from "axios";
import { useEffect, useState } from "react";
import AddProductForm from "./components/AddProductForm";
import { MdEdit, MdDelete } from "react-icons/md";
import { FaSearch } from "react-icons/fa";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    image: "",
    description: "",
    rating: {
      rate: "",
      count: "",
    },
  });
  const [editProductId, setEditProductId] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("all");

  const handleShowForm = () => {
    setShowForm(!showForm);
  };

  //   Data Fetch
  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  //   Add Product

  const addProduct = () => {
    axios
      .post("https://fakestoreapi.com/products", {
        title: formData.title,
        price: formData.price,
        category: formData.category,
        image: formData.image,
        description: formData.description,
        rating: {
          rate: formData.rating.rate,
          count: formData.rating.count,
        },
      })
      .then((response) => {
        setProducts([response.data, ...products]);
        setFormData({
          title: "",
          price: "",
          category: "",
          image: "",
          description: "",
          rating: {
            rate: "",
            count: "",
          },
        });
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  // Edit Product
  const editProduct = (id) => {
    axios
      .put(`https://fakestoreapi.com/products/${id}`, formData)
      .then((response) => {
        setProducts(
          products.map((product) =>
            product.id === editProductId ? response.data : product
          )
        );
        setEditProductId(null);
        setShowForm(false);
        // resetForm();
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  //   Delete Product
  const deleteProduct = (id) => {
    axios
      .delete(`https://fakestoreapi.com/products/${id}`)
      .then(() => {
        setProducts(products.filter((product) => product.id !== id));
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  //   const addNewProduct = (newProduct) => {
  //     setProducts([newProduct, ...products]);
  //   };

  const handleEdit = (product, index) => {
    setFormData(product);
    setEditProductId(index);
    setShowForm(true);
  };

  //   const filteredProducts = products.filter((product) => {
  //     searchTerm === ""
  //       ? true
  //       : product.title?.toLowerCase().includes(searchTerm.toLowerCase());
  //   });

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products/categories")
      .then((response) => setCategories(response.data))
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // Fetch products whenever category changes
  useEffect(() => {
    const url =
      category === "all"
        ? "https://fakestoreapi.com/products"
        : `https://fakestoreapi.com/products/category/${category}`;

    axios
      .get(url)
      .then((response) => setProducts(response.data))
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [category]);

  const filteredProducts = products.filter((product) =>
    searchTerm === ""
      ? true
      : product.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading)
    return (
      <p className="flex justify-center mt-4 text-2xl">Loading products...</p>
    );
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div
      className={
        showForm
          ? "px-7 py-9 md:px-12 md:py-14 relative overflow-hidden"
          : "px-7 py-9 md:px-12 md:py-14 relative"
      }
    >
      <h1 className="text-4xl font-bold text-blue-900">
        Product Management Dashboard
      </h1>
      <div className="flex justify-between flex-nowrap py-6 gap-5">
        <div className="w-full relative">
          <input
            type="search"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-5 py-2.5 ps-[48px] w-full border-1 border-[#53525221] focus:border-blue-500 outline-0 rounded-[7px]"
          />
          <span className="absolute top-0 left-0 w-[40px] h-full flex items-center justify-center border-r-1 border-[#53525221] text-[#535252]">
            <FaSearch />
          </span>
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-5 py-2.5 border-1 border-[#53525221] focus:border-blue-500 outline-0 rounded-[7px] capitalize"
        >
          <option value="all">All</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <button
          onClick={handleShowForm}
          className="bg-blue-500 text-white px-5 py-2.5 rounded-[7px] whitespace-nowrap font-medium hover:bg-blue-900 transition-all duration-500 ease-in cursor-pointer"
        >
          Add Product
        </button>
      </div>
      <div className="grid lg:grid-cols-4 gap-4 md:grid-cols-3 sm:grid-cols-1">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="p-5 border-1 border-[#53525221] shadow-md rounded-[7px] ease-in duration-500 hover:border-blue-500 flex flex-col justify-between"
            >
              <div className="flex flex-col justify-between">
                <div className="bg-gray-100 flex justify-center py-2 rounded-[7px]">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-[8rem] h-44 object-contain"
                  />
                </div>

                {/* <div>
                <span className="capitalize mt-2 bg-blue-200 inline-block py-1 px-2 text-blue-900 font-medium rounded-[7px]">
                  {product.category}
                </span>
              </div> */}
                <h3 className="mt-3 text-[1.1rem] font-medium text-gray-800 mb-2 text-base/6">
                  {product.title}
                </h3>
                <p className="line-clamp-3 mb-3 text-[0.9rem]">
                  {product.description}
                </p>
                <div className="flex items-center gap-2">
                  <span className="bg-green-600 flex items-center gap-1.5 py-1 px-2 text-white font-normal rounded-[7px]">
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.00054 1.50109L6.76054 6.24109L1.76054 7.00109C0.920537 7.08109 0.500537 8.34109 1.16054 9.00109L4.76054 12.6611L3.92054 17.9211C3.76054 18.8411 4.76054 19.5011 5.50054 19.0811L10.0005 16.7411L14.5005 19.0811C15.3405 19.5011 16.2605 18.8411 16.0805 17.9211L15.2605 12.6611L18.8405 9.00109C19.5005 8.34109 19.0805 7.16109 18.2605 7.00109L13.2605 6.24109L11.0005 1.50109C10.5805 0.661094 9.42054 0.661094 9.00054 1.50109Z"
                        fill="#fff"
                      />
                    </svg>{" "}
                    {product.rating?.rate ?? 0}
                  </span>
                  <span className="text-gray-500 font-medium">
                    {product.rating?.count ?? 0} Ratings
                  </span>
                </div>
              </div>
              <div className="mt-3">
                <div className="flex justify-between mt-2">
                  <p className="text-2xl font-semibold text-blue-900">
                    ${product.price}
                  </p>
                  <span className="capitalize mt-2 bg-blue-200 inline-block py-1 px-2 text-blue-900 font-medium rounded-[7px] text-[0.83rem]">
                    {product.category}
                  </span>
                </div>
                <div className="flex gap-3 mt-3">
                  <button
                    onClick={() => handleEdit(product)}
                    className="bg-blue-900 text-white h-8 w-8 flex justify-center items-center rounded-[5px] cursor-pointer hover:bg-blue-500 transition-all ease-in duration-300 "
                  >
                    <MdEdit />
                  </button>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="bg-blue-900 text-white h-8 w-8 flex justify-center items-center rounded-[5px] cursor-pointer hover:bg-blue-500 transition-all ease-in duration-300 "
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="flex justify-center mt-4 text-2xl">No products found</p>
        )}
      </div>
      {showForm && (
        <AddProductForm
          addProduct={addProduct}
          products={products}
          setProducts={setProducts}
          formData={formData}
          setFormData={setFormData}
          editProduct={editProduct}
          editProductId={editProductId}
          handleShowForm={handleShowForm}
        />
      )}
    </div>
  );
};

export default Dashboard;
