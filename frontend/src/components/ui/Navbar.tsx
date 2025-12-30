import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-blue-600">
            UserAuth
          </Link>

          <div className="flex items-center gap-6">
            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-3">
                  <div className="flex flex-col leading-tight">
                    <span className="text-xs text-gray-500">
                      Welcome back
                    </span>
                    <span className="text-sm font-semibold text-gray-800">
                      {user?.fullName}
                    </span>
                  </div>

                  <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-700 capitalize">
                    {user?.role}
                  </span>
                </div>

                <Link
                    to="/profile"
                    className="text-sm font-medium text-gray-600 hover:text-blue-600 transition"
                  >
                    Profile
                  </Link>

                {user?.role === "admin" && (
                  <Link
                    to="/admin"
                    className="text-sm font-medium text-gray-600 hover:text-blue-600 transition"
                  >
                    Admin Dashboard
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-lg text-sm transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-600 hover:text-blue-600 transition"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg text-sm transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
