import { useEffect, useState, useMemo } from "react";
import { fetchUsers } from "../services/api";
import UserTable from "../components/UserTable";
import SearchBar from "../components/SearchBar";
import SortControls from "../components/SortControls";

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers()
      .then((data) => setUsers(data))
      .finally(() => setLoading(false));
  }, []);

  const filteredUsers = useMemo(() => {
    return users
      .filter((user) =>
        `${user.name} ${user.email}`
          .toLowerCase()
          .includes(search.toLowerCase())
      )
      .sort((a, b) => {
        const aVal =
          sortField === "company" ? a.company.name : a.name;
        const bVal =
          sortField === "company" ? b.company.name : b.name;

        return sortOrder === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      });
  }, [users, search, sortField, sortOrder]);

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Header */}
      <div className="bg-white shadow-sm border-b px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            User Directory
          </h1>
          <p className="text-sm text-gray-500">
            Manage and explore user data
          </p>
        </div>

        <div className="text-sm text-gray-600">
          Total Users: <span className="font-semibold">{users.length}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 max-w-7xl mx-auto">

        {/* Controls Card */}
        <div className="bg-white p-4 rounded-xl shadow-sm border mb-6">
          <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            
            <div className="w-full md:w-1/2">
              <SearchBar search={search} setSearch={setSearch} />
            </div>

            <SortControls
              sortField={sortField}
              setSortField={setSortField}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
            />
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          
          {loading ? (
            <div className="p-6 text-center text-gray-500">
              Loading users...
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No users found
            </div>
          ) : (
            <UserTable users={filteredUsers} />
          )}
        </div>

      </div>
    </div>
  );
}