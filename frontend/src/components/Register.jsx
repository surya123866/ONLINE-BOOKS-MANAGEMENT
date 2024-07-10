/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Input from "./Input";
import apiCaller from "./ApiCaller";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [registrationInfo, setRegistrationInfo] = useState({
    username: "",
    name: "",
    email: "",
    contactNumber: "",
    password: "",
    role: "user",
  });
  const [registrationErrors, setRegistrationErrors] = useState({
    username: "",
    name: "",
    email: "",
    contactNumber: "",
    password: "",
  });

  const validateRegistrationForm = () => {
    let errors = {};
    if (!registrationInfo.username.trim()) {
      errors.username = "Username is required";
    }
    if (!registrationInfo.name.trim()) {
      errors.name = "Name is required";
    }
    if (!registrationInfo.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(registrationInfo.email)) {
      errors.email = "Email is invalid";
    }
    if (!registrationInfo.contactNumber.trim()) {
      errors.contactNumber = "Contact number is required";
    } else if (!/^\d{10}$/.test(registrationInfo.contactNumber)) {
      errors.contactNumber = "Contact number should be 10 digits";
    }
    if (!registrationInfo.password.trim()) {
      errors.password = "Password is required";
    }
    setRegistrationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRegistration = useCallback(
    async (e) => {
      e.preventDefault();
      if (validateRegistrationForm()) {
        try {
          const endpoint =
            registrationInfo.role === "user"
              ? "http://localhost:3000/api/users/register"
              : "http://localhost:3000/api/admin/register";
          const response = await apiCaller(dispatch, endpoint, "POST", {
            contactNumber: registrationInfo.contactNumber,
            email: registrationInfo.email,
            name: registrationInfo.name,
            password: registrationInfo.password,
            username: registrationInfo.username,
          });
          if (response && response.token) {
            Cookies.set("jwtToken", response.token, { expires: 7 });
          }
          toast.success("Registration Successful");
          navigate("/login");
        } catch (error) {
          console.error("Registration failed:", error);
          toast.error("Registration Failed");
        }
      }
    },
    [registrationInfo, navigate, validateRegistrationForm]
  );

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setRegistrationInfo((prev) => ({ ...prev, [name]: value }));
    setRegistrationErrors((prev) => ({ ...prev, [name]: "" }));
  }, []);

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 mt-8 text-center">Register</h2>
      <form onSubmit={handleRegistration} className="space-y-3">
        <Input
          type="text"
          name="username"
          value={registrationInfo.username}
          onChange={handleChange}
          label="Username"
          error={registrationErrors.username}
        />
        <Input
          type="text"
          name="name"
          value={registrationInfo.name}
          onChange={handleChange}
          label="Name"
          error={registrationErrors.name}
        />
        <Input
          type="email"
          name="email"
          value={registrationInfo.email}
          onChange={handleChange}
          label="Email"
          error={registrationErrors.email}
        />
        <Input
          type="number"
          name="contactNumber"
          value={registrationInfo.contactNumber}
          onChange={handleChange}
          label="Contact Number"
          error={registrationErrors.contactNumber}
        />
        <Input
          type="password"
          name="password"
          value={registrationInfo.password}
          onChange={handleChange}
          label="Password"
          error={registrationErrors.password}
        />
        <div className="flex items-center space-x-4">
          <label className="block text-gray-700">Role:</label>
          <div>
            <input
              type="radio"
              id="userReg"
              name="role"
              value="user"
              checked={registrationInfo.role === "user"}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="userReg">User</label>
          </div>
          <div>
            <input
              type="radio"
              id="adminReg"
              name="role"
              value="admin"
              checked={registrationInfo.role === "admin"}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="adminReg">Admin</label>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-200"
        >
          Register
        </button>
      </form>
      <Link to={"/login"}>
        <p>Already have an account? Login</p>
      </Link>
    </div>
  );
};

export default Register;
