export default function IconButton({ icon: Icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center 
                 w-24 h-35 bg-white rounded-xl shadow-md 
                 hover:bg-gray-100 transition m-2 mt-9"
    >
      <Icon className="w-8 h-8 text-blue-600 mb-2" />
      <span className="text-xs font-medium text-gray-700 text-center">
        {label}
      </span>
    </button>
  );
}
