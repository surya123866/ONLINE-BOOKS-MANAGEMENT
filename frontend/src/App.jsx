import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import AdminDashboard from "./adminPages/AdminDashboard";
import Home from "./userPages/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import AdminNavbar from "./adminPages/AdminNavbar";
import UserNavbar from "./userPages/UserNavbar";
import NotFound from "./components/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const ConditionalNavbar = () => {
    const location = useLocation();
    const isAdmin = localStorage.getItem("userType") === "admin";
    const showNavbar = !["/login", "/register"].includes(location.pathname);

    if (!showNavbar) return null;

    return isAdmin ? <AdminNavbar /> : <UserNavbar />;
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center p-10 bg-red-400">
      <Router>
        <ConditionalNavbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
