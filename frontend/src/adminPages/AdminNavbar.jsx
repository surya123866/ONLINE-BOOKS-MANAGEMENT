import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useState } from "react";

const AdminNavbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const isLoggedIn = Cookies.get("jwtToken");

  const handleLogout = () => {
    Cookies.remove("jwtToken");
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/admin/search/${searchQuery}`);
    }
  };

  return (
    <nav className="bg-indigo-600 p-4 fixed top-0 w-full z-50">
      <ul className="flex justify-around items-center">
        <li>
          <form onSubmit={handleSearch} className="flex">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search books"
              className="p-2 rounded"
              aria-label="Search books"
            />
            <button
              type="submit"
              className="ml-2 p-2 bg-gray-300 rounded"
              aria-label="Search"
            >
              Search
            </button>
          </form>
        </li>
        <li>
          <Link
            to="/admin/issue-book"
            className="text-white hover:text-gray-400"
          >
            Issue Book
          </Link>
        </li>
        <li>
          <Link
            to="/admin/return-book"
            className="text-white hover:text-gray-400"
          >
            Return Book
          </Link>
        </li>
        <li>
          <Link to="/admin/add-book" className="text-white hover:text-gray-400">
            Add a New Book
          </Link>
        </li>
        <li>
          <Link
            to="/admin/transactions"
            className="text-white hover:text-gray-400"
          >
            Transactions
          </Link>
        </li>
        <li>
          <Link to="/admin" className="text-white hover:text-gray-400">
            Admin Dashboard
          </Link>
        </li>
        {isLoggedIn ? (
          <li>
            <button
              onClick={handleLogout}
              className="text-white hover:text-gray-400"
              aria-label="Logout"
            >
              Logout
            </button>
          </li>
        ) : (
          <li>
            <Link to="/login" className="text-white hover:text-gray-400">
              Login
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default AdminNavbar;
