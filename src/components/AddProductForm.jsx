import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

const AddProductForm = ({
  handleShowForm,
  formData,
  setFormData,
  editProductId,
  addProduct,
  closeForm,
  message,
  setMessage,
  editProduct,
}) => {
  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      rating: { ...formData.rating, [e.target.name]: e.target.value },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editProductId !== null) {
      editProduct(editProductId); // ✅ call parent function
      setMessage("Product updated successfully!");
      closeForm();
    } else {
      addProduct(); // ✅ call parent add
      setMessage("Product added successfully!");
      closeForm();
    }

    setFormData({
      title: "",
      price: "",
      category: "",
      image: "",
      description: "",
      rating: { rate: "", count: "" },
    });
  };

  return (
    <div className="fixed w-full min-h-full bg-[#010c13f5] top-0 left-0 flex justify-center items-center">
      <div className="w-[70%] relative bg-white p-6 border-1 border-[#53525221] shadow-md rounded-[7px]">
        <h3 className="text-3xl font-semibold text-blue-900 text-center mb-4">
          Add New Product
        </h3>
        <button
          onClick={handleShowForm}
          className="bg-blue-900 text-white h-8 w-8 flex justify-center items-center rounded-[5px] absolute top-6 right-6 cursor-pointer"
        >
          <FaTimes />
        </button>
        <form action="" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-3">
            <div className="mb-2">
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleFormChange}
                placeholder="Title"
                className="px-5 py-2.5 w-full border-1 border-[#53525221] focus:border-blue-500 outline-0 rounded-[7px]"
                required
              />
            </div>
            <div className="mb-2">
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleFormChange}
                placeholder="Price"
                className="px-5 py-2.5 w-full border-1 border-[#53525221] focus:border-blue-500 outline-0 rounded-[7px]"
                required
              />
            </div>
            {/* <div className="mb-2">
              <input
                type="number"
                step="0.1"
                min="0"
                max="5"
                name="rate"
                value={formData.rating.rate}
                onChange={handleFormChange}
                placeholder="Rating (e.g. 4.6)"
                className="px-5 py-2.5 w-full border-1 border-[#53525221] focus:border-blue-500 outline-0 rounded-[7px]"
                required
              />
            </div>
            <div className="mb-2">
              <input
                type="number"
                name="count"
                value={formData.rating.count}
                onChange={handleFormChange}
                placeholder="Rating count"
                className="px-5 py-2.5 w-full border-1 border-[#53525221] focus:border-blue-500 outline-0 rounded-[7px]"
                required
              />
            </div> */}
            <div className="mb-2">
              {/* <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleFormChange}
                placeholder="Category"
                className="px-5 py-2.5 w-full border-1 border-[#53525221] focus:border-blue-500 outline-0 rounded-[7px]"
                required
              /> */}
              <select
                name="category"
                value={formData.category}
                onChange={handleFormChange}
                className="px-5 py-2.5 w-full border-1 border-[#53525221] focus:border-blue-500 outline-0 rounded-[7px]"
                required
              >
                <option value="">Select Category</option>
                <option value="electronics">Electronics</option>
                <option value="jewelery">Jewelery</option>
                <option value="men's clothing">Men's Clothing</option>
                <option value="women's clothing">Women's Clothing</option>
              </select>
            </div>
            <div className="mb-2">
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleFormChange}
                placeholder="Image URL"
                className="px-5 py-2.5 w-full border-1 border-[#53525221] focus:border-blue-500 outline-0 rounded-[7px]"
                required
              />
            </div>
          </div>
          <div className="mb-2">
            <textarea
              name="description"
              id=""
              rows="5"
              value={formData.description}
              onChange={handleFormChange}
              placeholder="Add Description"
              className="px-5 py-2.5 w-full border-1 border-[#53525221] focus:border-blue-500 outline-0 rounded-[7px]"
              required
            ></textarea>
          </div>
          <div className="mb-2 text-center">
            <button
              type="submit"
              //   onClick={addProduct}
              className="bg-blue-500 text-white px-5 py-2.5 rounded-[7px] whitespace-nowrap font-medium hover:bg-blue-900 transition-all duration-500 ease-in cursor-pointer"
            >
              {editProductId ? "Update Product" : "Add Product"}
              {/* Add Product */}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductForm;
