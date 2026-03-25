import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchUsers } from "../services/api";

export default function UserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers()
      .then((users) => {
        const found = users.find((u) => u.id === Number(id));
        setUser(found);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading user details...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-500">
        <p>User not found</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 text-blue-600 hover:underline"
        >
          Go back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Header */}
      <div className="bg-white shadow-sm border-b px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-800">
          User Details
        </h1>

        <button
          onClick={() => navigate("/")}
          className="text-sm bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded"
        >
          ← Back
        </button>
      </div>

      {/* Content */}
      <div className="p-6 max-w-4xl mx-auto">

        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
          <div className="flex items-center gap-4">
            
            {/* Avatar */}
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 text-xl font-semibold">
              {user.name.charAt(0)}
            </div>

            {/* Basic Info */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {user.name}
              </h2>
              <p className="text-gray-500 text-sm">
                @{user.username}
              </p>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* Contact Info */}
          <div className="bg-white rounded-xl shadow-sm border p-5">
            <h3 className="text-lg font-semibold mb-3 text-gray-700">
              Contact Information
            </h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Phone:</strong> {user.phone}</p>
              <p><strong>Website:</strong> {user.website}</p>
            </div>
          </div>

          {/* Company Info */}
          <div className="bg-white rounded-xl shadow-sm border p-5">
            <h3 className="text-lg font-semibold mb-3 text-gray-700">
              Company
            </h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p><strong>Name:</strong> {user.company.name}</p>
              <p><strong>Catchphrase:</strong> {user.company.catchPhrase}</p>
              <p><strong>Business:</strong> {user.company.bs}</p>
            </div>
          </div>

          {/* Address */}
          <div className="bg-white rounded-xl shadow-sm border p-5 md:col-span-2">
            <h3 className="text-lg font-semibold mb-3 text-gray-700">
              Address
            </h3>
            <div className="text-sm text-gray-600">
              {user.address.street}, {user.address.suite}, <br />
              {user.address.city} - {user.address.zipcode}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}