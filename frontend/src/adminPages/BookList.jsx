import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBooks, removeBook, selectBooks } from "../redux/slices/bookSlice";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

const BookList = () => {
  const dispatch = useDispatch();
  const books = useSelector(selectBooks);
  const bookStatus = useSelector((state) => state.books.status);
  const error = useSelector((state) => state.books.error);
  const Navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState(null);

  useEffect(() => {
    if (bookStatus === "idle") {
      dispatch(fetchBooks());
    } else if (bookStatus === "failed") {
      Navigate("/login");
    }
    console.log(bookStatus);
  }, [bookStatus, dispatch]);

  const openModal = (bookId) => {
    setSelectedBookId(bookId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedBookId(null);
    setIsModalOpen(false);
  };

  const handleRemoveBook = () => {
    dispatch(removeBook(selectedBookId));
    closeModal();
  };

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
              <div className="w-70 h-48 bg-gray-300 rounded-md mb-4"></div>
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
      <div className="w-full">
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
                  {book?.availability ? "Available" : "Not Available"}
                </span>
              </p>
              <div className="flex justify-between mt-2">
                <a
                  href={book?.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  More Info
                </a>
                <button
                  onClick={() => openModal(book._id)}
                  className="px-2 py-1 bg-red-500 text-white rounded-md"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } else if (bookStatus === "failed") {
    content = <div>{error}</div>;
  } else {
    content = <div>No books available</div>;
  }

  return (
    <div className="h-full w-full">
      {content}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Confirm Remove Book"
        className="modal fixed inset-0 flex items-center justify-center"
        overlayClassName="modal-overlay fixed inset-0 bg-gray-500 bg-opacity-75"
      >
        <div className="bg-white p-8 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Confirm Removal</h2>
          <p className="text-gray-800 mb-4">
            Are you sure you want to remove this book?
          </p>
          <div className="flex justify-end">
            <button
              onClick={handleRemoveBook}
              className="px-4 py-2 bg-red-500 text-white rounded-md mr-2"
            >
              Yes, Remove
            </button>
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-gray-500 text-white rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BookList;
