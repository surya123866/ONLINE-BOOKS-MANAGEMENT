import { toast } from "react-toastify";
import Cookies from "js-cookie";
import "react-toastify/dist/ReactToastify.css";

const apiCaller = async (url, method = "GET", body = null, headers = {}) => {
  try {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    };

    const token = Cookies.get("jwtToken");
    if (token) {
      options.headers.Authorization = `Bearer ${token}`;
    }

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
      toast.error(data.message || "Something went wrong!");
      throw new Error(data.message || "HTTP error!");
    } else {
      toast.success("Request successful!"); 
    }

    return data;
  } catch (error) {
    console.error("Error in apiCaller:", error);
    toast.error(error.message);
    throw error;
  }
};

export default apiCaller;
