import PropTypes from "prop-types";

const Input = ({ type, name, value, onChange, label, error }) => (
  <div>
    <label className="block text-gray-700">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
        error ? "border-red-500 focus:ring-red-500" : "focus:ring-indigo-600"
      }`}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

Input.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
};

export default Input;
