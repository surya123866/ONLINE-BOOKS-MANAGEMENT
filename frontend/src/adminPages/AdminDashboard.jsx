import { Routes, Route } from "react-router-dom";
import BookList from "./BookList";
import IssueBook from "./IssueBook";
import ReturnBook from "./ReturnBook";
import AddBookForm from "./AddBook";
import AdminTransactions from "./transactions";
import SearchResults from "./SearchResults";
import { useEffect } from "react";

const AdminDashboard = () => {
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
          <Route path="issue-book" element={<IssueBook />} />
          <Route path="return-book" element={<ReturnBook />} />
          <Route path="add-book" element={<AddBookForm />} />
          <Route path="transactions" element={<AdminTransactions />} />
          <Route path="/search/:query" element={<SearchResults />} />{" "}
          <Route path="*" element={<BookList />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
