import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

const ReturnBook = () => {
  const jwtToken = Cookies.get("jwtToken");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // Set Authorization header before making the API call
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
      const response = await axios.post(
        "http://localhost:3000/api/admin/returnBook",
        {
          userId: data.userId,
          bookId: data.bookId,
        }
      );
      toast.success("Book returned successfully!");
      console.log(response.data);
    } catch (error) {
      toast.error("There was an error returning the book!");
      console.error(error);
    }
  };

  return (
    <div className="mt-10 w-full flex justify-center">
      <div className="container mx-auto px-4 py-8 bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Return Book</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="userId"
              className="block text-sm font-medium text-gray-700"
            >
              User ID
            </label>
            <input
              id="userId"
              {...register("userId", { required: true })}
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-800"
            />
            {errors.userId && (
              <p className="text-red-600 text-sm">User ID is required</p>
            )}
          </div>

          <div>
            <label
              htmlFor="bookId"
              className="block text-sm font-medium text-gray-700"
            >
              Book ID
            </label>
            <input
              id="bookId"
              {...register("bookId", { required: true })}
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-800"
            />
            {errors.bookId && (
              <p className="text-red-600 text-sm">Book ID is required</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Return Book
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default ReturnBook;
