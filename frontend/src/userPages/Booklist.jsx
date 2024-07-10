import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBooks, selectBooks } from "../redux/slices/bookSlice";
import { useNavigate } from "react-router-dom";

const BookList = () => {
  const dispatch = useDispatch();
  const books = useSelector(selectBooks);
  const bookStatus = useSelector((state) => state.books.status);
  const Navigate = useNavigate();

  useEffect(() => {
    if (bookStatus === "idle") {
      dispatch(fetchBooks());
    } else if (bookStatus === "failed") {
      Navigate("/login");
    }
  }, [bookStatus, dispatch]);

  let content;

  if (bookStatus === "loading") {
    content = (
      <div className="w-full min-w-80 flex flex-col items-center">
        <h2 className="text-4xl font-bold text-white mb-6">Books List</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 h-full w-full overflow-auto">
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className="bg-gray-200 w-full p-4 rounded-lg shadow-md animate-pulse"
            >
              <div className="w-60 h-48 bg-gray-300 rounded-md mb-4"></div>
              <div className="h-6 w-30 bg-gray-300 rounded-md mb-2"></div>
              <div className="h-4 w-30 bg-gray-300 rounded-md mb-2"></div>
              <div className="h-4 w-30 bg-gray-300 rounded-md mb-2"></div>
              <div className="h-4 w-30 bg-gray-300 rounded-md mb-2"></div>
              <div className="h-4 w-30 bg-gray-300 rounded-md mb-2"></div>
              <div className="h-4 w-30 bg-gray-300 rounded-md mb-2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  } else if (bookStatus === "succeeded") {
    content = (
      <div className="w-full flex flex-col items-center">
        <h2 className="text-4xl font-bold text-white mb-6">Books list</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 h-full w-full overflow-auto">
          {books?.map((book) => (
            <div key={book._id} className="bg-white p-4 rounded-lg shadow-md">
              <img
                src={book?.imageLink}
                alt={book?.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-bold text-gray-800">{book?.title}</h3>
              <p className="text-gray-700">{book?.author}</p>
              <p className="text-gray-500">{book?.country}</p>
              <p className="text-gray-500">Language: {book?.language}</p>
              <p className="text-gray-500">Pages: {book?.pages}</p>
              <p className="text-gray-500">Year: {book?.year}</p>
              <p className="text-gray-500">
                Availability:
                <span
                  className={`${
                    book?.availability ? "text-green-500" : "text-red-500"
                  } font-semibold`}
                >
                  {" "}
                  {book?.availability ? "Available" : "Not Available"}
                </span>
              </p>
              <a
                href={book?.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                More Info
              </a>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    content = <div>No books available</div>;
  }

  return <div className="h-full w-full">{content}</div>;
};

export default BookList;
