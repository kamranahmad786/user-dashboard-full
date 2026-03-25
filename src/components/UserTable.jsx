import { useNavigate } from "react-router-dom";

export default function UserTable({ users }) {
  const navigate = useNavigate();

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left border-collapse">
        
        {/* Header */}
        <thead className="bg-gray-100 text-gray-600 uppercase text-xs tracking-wider">
          <tr>
            <th className="px-6 py-3">User</th>
            <th className="px-6 py-3">Email</th>
            <th className="px-6 py-3">Phone</th>
            <th className="px-6 py-3">Company</th>
          </tr>
        </thead>

        {/* Body */}
        <tbody className="divide-y">
          {users.map((user) => (
            <tr
              key={user.id}
              onClick={() => navigate(`/user/${user.id}`)}
              className="cursor-pointer hover:bg-gray-50 transition"
            >
              
              {/* User (Avatar + Name) */}
              <td className="px-6 py-4 flex items-center gap-3">
                
                <div className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold">
                  {user.name.charAt(0)}
                </div>

                <div>
                  <p className="font-medium text-gray-800">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    @{user.username}
                  </p>
                </div>
              </td>

              {/* Email */}
              <td className="px-6 py-4 text-gray-600">
                {user.email}
              </td>

              {/* Phone */}
              <td className="px-6 py-4 text-gray-600">
                {user.phone}
              </td>

              {/* Company */}
              <td className="px-6 py-4 text-gray-700 font-medium">
                {user.company.name}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}