export default function Button({ children, onClick, type = "button", variant = "primary" }) {
  const base = "px-4 py-2 font-semibold rounded-xl transition-all shadow hover:shadow-lg";
  const variants = {
    primary: "bg-gradient-to-r from-red-500 via-black to-gray-600 text-white",
    secondary: "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100",
    dark: "bg-gray-900 text-white hover:bg-gray-800"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${base} ${variants[variant]}`}
    >
      {children}
    </button>
  );
}
