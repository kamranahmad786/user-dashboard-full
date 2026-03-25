import { useState } from "react";

export default function SearchBar({ search, setSearch }) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative w-full">
      
      {/* Search Icon */}
      <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
        🔍
      </span>

      {/* Input */}
      <input
        type="text"
        placeholder="Search users by name or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`w-full pl-10 pr-10 py-2.5 rounded-lg border text-sm outline-none transition
          ${focused 
            ? "border-blue-500 ring-2 ring-blue-100" 
            : "border-gray-300"}
        `}
      />

      {/* Clear Button */}
      {search && (
        <button
          onClick={() => setSearch("")}
          className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      )}
    </div>
  );
}