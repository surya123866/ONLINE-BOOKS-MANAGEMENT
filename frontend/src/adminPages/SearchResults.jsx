import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchBooksBySearch, selectBooks } from "../redux/slices/bookSlice";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchResults = () => {
  const dispatch = useDispatch();
  const books = useSelector(selectBooks);
  const query = useQuery().get("query");

  useEffect(() => {
    if (query) {
      dispatch(fetchBooksBySearch(query));
    }
  }, [dispatch, query]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-white font-bold text-lg">Search Results</h1>
      {books?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 h-full w-full overflow-auto">
          {books?.map((book) => (
            <div
              key={book._id}
              className="flex flex-wrap bg-white p-4 rounded-lg shadow-md"
            >
              <img
                src={book?.imageLink}
                alt={book?.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-bold">{book?.title}</h3>
              <p className="text-gray-700">{book?.author}</p>
              <p className="text-gray-500">{book?.country}</p>
              <p className="text-gray-500">Language: {book?.language}</p>
              <p className="text-gray-500">Pages: {book?.pages}</p>
              <p className="text-gray-500">Year: {book?.year}</p>
              <p className="text-gray-500">
                Availability:{" "}
                {book?.availability ? "Available" : "Not Available"}
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
      ) : (
        <p className="font-bold text-white text-sm">No books found</p>
      )}
    </div>
  );
};

export default SearchResults;
