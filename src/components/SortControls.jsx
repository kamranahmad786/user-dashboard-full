export default function SortControls({
  sortField,
  setSortField,
  sortOrder,
  setSortOrder,
}) {
  const toggleOrder = () =>
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");

  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
      
      {/* Sort Field Dropdown */}
      <div className="relative">
        <select
          value={sortField}
          onChange={(e) => setSortField(e.target.value)}
          className="appearance-none border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition"
        >
          <option value="name">Sort by Name</option>
          <option value="company">Sort by Company</option>
        </select>

        {/* Dropdown Icon */}
        <span className="absolute right-3 top-2.5 text-gray-400 pointer-events-none">
          ⌄
        </span>
      </div>

      {/* Sort Order Toggle */}
      <button
        onClick={toggleOrder}
        className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg border border-gray-300 bg-white shadow-sm hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-blue-100"
      >
        <span className="font-medium text-gray-700">
          {sortOrder === "asc" ? "Ascending" : "Descending"}
        </span>

        <span className="text-gray-500">
          {sortOrder === "asc" ? "↑" : "↓"}
        </span>
      </button>
    </div>
  );
}