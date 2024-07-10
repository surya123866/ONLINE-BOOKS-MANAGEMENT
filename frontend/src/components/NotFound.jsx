/* eslint-disable react/no-unescaped-entities */
const NotFound = () => {
  return (
    <div className="flex items-center justify-center w-full">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-indigo-600">404</h1>
        <p className="text-2xl font-semibold text-gray-700 mt-4">
          Oops! Page not found.
        </p>
        <p className="text-gray-500 mt-2">
          The page you're looking for doesn't exist.
        </p>
        <a
          href="/"
          className="mt-6 inline-block bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200"
        >
          Go to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
