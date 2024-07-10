import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

const IssueBook = () => {
  const jwtToken = Cookies.get("jwtToken");
  const [formData, setFormData] = useState({
    user: "",
    book: "",
    dueDate: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear related error when user starts typing again
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: null,
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.user) newErrors.user = "User ID is required";
    if (!formData.book) newErrors.book = "Book ID is required";
    if (!formData.dueDate) newErrors.dueDate = "Due Date is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      try {
        // Set Authorization header before making the API call
        axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;

        const response = await axios.post(
          "http://localhost:3000/api/admin/issueBook",
          {
            user: formData.user,
            book: formData.book,
            dueDate: formData.dueDate,
            transactionType: "borrowed",
          }
        );

        toast.success("Book issued successfully!");
        console.log(response.data);
        setFormData({ user: "", book: "", dueDate: "" });
      } catch (error) {
        toast.error("There was an error issuing the book!");
        console.error(error);
      }
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className="mt-10 w-full flex justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Issue Book</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="user"
              className="block text-sm font-medium text-gray-700"
            >
              User ID
            </label>
            <input
              id="user"
              name="user"
              type="text"
              value={formData.user}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-800"
            />
            {errors.user && (
              <p className="text-red-600 text-sm">{errors.user}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="book"
              className="block text-sm font-medium text-gray-700"
            >
              Book ID
            </label>
            <input
              id="book"
              name="book"
              type="text"
              value={formData.book}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-800"
            />
            {errors.book && (
              <p className="text-red-600 text-sm">{errors.book}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="dueDate"
              className="block text-sm font-medium text-gray-700"
            >
              Due Date
            </label>
            <input
              id="dueDate"
              name="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-800"
            />
            {errors.dueDate && (
              <p className="text-red-600 text-sm">{errors.dueDate}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Issue Book
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default IssueBook;
