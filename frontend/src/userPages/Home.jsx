import { Route, Routes } from "react-router-dom";
import BookList from "./Booklist";
import Transactions from "./transactions";
import SearchResults from "./SearchResults";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    const handleBackButton = (event) => {
      event.preventDefault();
    };
    window.history.pushState(null, "", window.location.pathname);
    window.addEventListener("popstate", handleBackButton);
    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col">
      <div className="flex-grow flex flex-col items-center bg-opacity-50 p-8 w-full">
        <Routes>
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/search/:query" element={<SearchResults />} />
          <Route path="*" element={<BookList />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
