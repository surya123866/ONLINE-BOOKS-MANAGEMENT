import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const UserNavbar = () => {
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
      navigate(`/search/${searchQuery}`);
    }
  };

  return (
    <nav className="bg-indigo-600 p-4 fixed top-0 w-full z-50">
      <ul className="flex justify-around items-center">
        <li>
          <Link to="/" className="text-white hover:text-gray-400">
            Home
          </Link>
        </li>
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
            to="/transactions"
            className="text-white hover:text-gray-400"
          >
            My transactions
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
          <>
            <li>
              <Link to="/login" className="text-white hover:text-gray-400">
                Login
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default UserNavbar;
