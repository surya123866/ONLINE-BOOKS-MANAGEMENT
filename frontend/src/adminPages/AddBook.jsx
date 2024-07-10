import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../redux/slices/bookSlice";

const AddBookForm = () => {
  const dispatch = useDispatch();
  const bookStatus = useSelector((state) => state.books.status);
  const [formData, setFormData] = useState({
    author: "",
    country: "",
    imageLink: "",
    language: "",
    link: "",
    pages: "",
    title: "",
    year: "",
    availability: true,
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.author) newErrors.author = "Author is required";
    if (!formData.country) newErrors.country = "Country is required";
    if (
      formData.imageLink &&
      !/^(ftp|http|https):\/\/[^ "]+$/.test(formData.imageLink)
    )
      newErrors.imageLink = "Image Link must be a valid URL";
    if (!formData.language) newErrors.language = "Language is required";
    if (formData.link && !/^(ftp|http|https):\/\/[^ "]+$/.test(formData.link))
      newErrors.link = "Link must be a valid URL";
    if (
      !formData.pages ||
      formData.pages <= 0 ||
      !Number.isInteger(Number(formData.pages))
    )
      newErrors.pages = "Pages must be a positive integer";
    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.year || !Number.isInteger(Number(formData.year)))
      newErrors.year = "Year must be a number";
    if (formData.availability === undefined)
      newErrors.availability = "Availability is required";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await axios.post("http://localhost:3000/api/admin/addBook", formData);
      toast.success("Book added successfully");
      setFormData({
        author: "",
        country: "",
        imageLink: "",
        language: "",
        link: "",
        pages: "",
        title: "",
        year: "",
        availability: true,
      });
      if (bookStatus === "idle") {
        dispatch(fetchBooks());
      }
    } catch (error) {
      console.error("Error adding book", error);
      toast.error("Error adding book");
    }
  };

  return (
    <div className="mt-10 w-full flex justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Add Book</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title:
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">{errors.title}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Author:
            </label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.author && (
              <p className="text-red-500 text-xs mt-1">{errors.author}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Country:
            </label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.country && (
              <p className="text-red-500 text-xs mt-1">{errors.country}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Image Link:
            </label>
            <input
              type="text"
              name="imageLink"
              value={formData.imageLink}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.imageLink && (
              <p className="text-red-500 text-xs mt-1">{errors.imageLink}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Language:
            </label>
            <input
              type="text"
              name="language"
              value={formData.language}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.language && (
              <p className="text-red-500 text-xs mt-1">{errors.language}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Link:
            </label>
            <input
              type="text"
              name="link"
              value={formData.link}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.link && (
              <p className="text-red-500 text-xs mt-1">{errors.link}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Pages:
            </label>
            <input
              type="number"
              name="pages"
              value={formData.pages}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.pages && (
              <p className="text-red-500 text-xs mt-1">{errors.pages}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Year:
            </label>
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.year && (
              <p className="text-red-500 text-xs mt-1">{errors.year}</p>
            )}
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="availability"
              checked={formData.availability}
              onChange={handleChange}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label className="ml-2 block text-sm font-medium text-gray-700">
              Available
            </label>
          </div>
          {errors.availability && (
            <p className="text-red-500 text-xs mt-1">{errors.availability}</p>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Add Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBookForm;
