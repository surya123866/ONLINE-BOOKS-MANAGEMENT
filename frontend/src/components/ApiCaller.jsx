import { toast } from "react-toastify";
import { setLoading, setUser, setError } from "../redux/slices/authSlice";

const apiCaller = async (
  dispatch,
  url,
  method = "GET",
  body = null,
  headers = {}
) => {
  dispatch(setLoading(true));

  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
      const errorMessage =
        data.message || response.statusText || "Unknown error";
      throw new Error(errorMessage);
    }

    dispatch(setUser(data)); // Set user data
    return data;
  } catch (error) {
    console.error("Error in apiCaller:", error);
    dispatch(setError(error.message));
    toast.error(`Error: ${error.message}`);
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};

export default apiCaller;
