import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-white shadow-sm font-sans sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-blue-600">
            UserAuth
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-3">
                  <div className="flex flex-col leading-tight text-right">
                    <span className="text-xs text-gray-500">Welcome back</span>
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

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {isAuthenticated ? (
              <>
                <div className="py-3 border-b border-gray-100 mb-2">
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500">Logged in as</span>
                      <span className="text-sm font-semibold text-gray-800">
                        {user?.fullName}
                      </span>
                    </div>
                    <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-700 capitalize">
                      {user?.role}
                    </span>
                  </div>
                </div>

                <Link
                  to="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                >
                  Profile
                </Link>

                {user?.role === "admin" && (
                  <Link
                    to="/admin"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  >
                    Admin Dashboard
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  className="mt-2 w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700 mt-2 text-center"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
