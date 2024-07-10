/* eslint-disable react/no-unescaped-entities */
import { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Input from "./Input";
import apiCaller from "./ApiCaller";
import { setIsAdmin } from "../redux/slices/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    role: "user",
  });

  const [loginErrors, setLoginErrors] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const validateLoginForm = () => {
    const errors = {};
    if (!credentials.username.trim()) errors.username = "Username is required";
    if (!credentials.password.trim()) errors.password = "Password is required";
    setLoginErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const updateIsAdmin = (isAdmin) => {
    dispatch(setIsAdmin(isAdmin));
  };

  const handleLogin = useCallback(
    async (e) => {
      e.preventDefault();
      if (validateLoginForm()) {
        try {
          const endpoint =
            credentials.role === "admin"
              ? "http://localhost:3000/api/admin/login"
              : "http://localhost:3000/api/users/login";
          const response = await apiCaller(dispatch, endpoint, "POST", {
            username: credentials.username,
            password: credentials.password,
          });
          localStorage.setItem("userId", response.userId);
          Cookies.set("jwtToken", response.token);
          if (credentials.role === "admin") {
            localStorage.setItem("userType", "admin");
            updateIsAdmin(true);
            navigate("/admin", { replace: true });
          } else {
            localStorage.setItem("userType", "user");
            updateIsAdmin(false);
            navigate("/", { replace: true });
          }
          toast.success("Login Successful");
        } catch (error) {
          console.error("Error during login:", error);
          toast.error(
            "Login failed. Please check your credentials and try again."
          );
        }
      }
    },
    [credentials, dispatch, navigate, updateIsAdmin]
  );


  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
    setLoginErrors((prev) => ({ ...prev, [name]: "" }));
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <form className="space-y-6" onSubmit={handleLogin}>
        <Input
          type="text"
          name="username"
          value={credentials.username}
          onChange={handleChange}
          label="Username"
          error={loginErrors.username}
        />
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            name="password"
            value={credentials.password}
            onChange={handleChange}
            label="Password"
            error={loginErrors.password}
          />
          <span
            className="absolute right-4 top-[45px] transform -translate-y-1/2 cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <FaEye size={25} color="grey" />
            ) : (
              <FaEyeSlash size={25} color="grey" />
            )}
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <label className="block text-gray-700">Role:</label>
          <div>
            <input
              type="radio"
              id="user"
              name="role"
              value="user"
              checked={credentials.role === "user"}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="user">User</label>
          </div>
          <div>
            <input
              type="radio"
              id="admin"
              name="role"
              value="admin"
              checked={credentials.role === "admin"}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="admin">Admin</label>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-200"
        >
          Login
        </button>
      </form>
      <Link to="/register">
        <p className="mt-4 text-center text-gray-600">
          Don't have an account? Register
        </p>
      </Link>
    </div>
  );
};

export default Login;
