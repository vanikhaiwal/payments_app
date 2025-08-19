
export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-8 h-8 text-blue-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8c-1.104 0-2 .896-2 2s.896 2 2 2h8v4c0 1.104-.896 2-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h12c1.104 0 2 .896 2 2v2h-8z"
        />
      </svg>
      <span className="text-[40px] font-bold text-gray-800">PayX</span>
    </div>
  );
}
