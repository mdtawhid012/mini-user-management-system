import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { user, token, login } = useAuth();
  const navigate = useNavigate();

  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    if (user) {
      setFullName(user.fullName);
      setEmail(user.email);
    }
  }, [user]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingUpdate(true);
    try {
      const response = await fetch("http://localhost:3000/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ fullName, email }),
      });

      const data = await response.json();

      if (!response.ok) {
         if (data.errors) {
          const errorMessages = Object.values(data.errors).flat();
          throw new Error((errorMessages[0] as string) || "Update failed");
        }
        throw new Error(data.message || "Failed to update profile");
      }

      if (user && token) {
        login({ ...user, fullName, email }, token);
      }
      
      toast.success("Profile updated successfully");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setLoadingUpdate(false);
    }
  };

  const handleCancelUpdate = () => {
    if (user) {
      setFullName(user.fullName);
      setEmail(user.email);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingPassword(true);
    try {
      const response = await fetch("http://localhost:3000/user/password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(passwordData),
      });

      const data = await response.json();

       if (!response.ok) {
        throw new Error(data.message || "Failed to change password");
      }

      toast.success("Password changed successfully");
      setPasswordData({ oldPassword: "", newPassword: "" });
    } catch (error) {
       if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setLoadingPassword(false);
    }
  };

  const handleCancelPassword = () => {
    setPasswordData({ oldPassword: "", newPassword: "" });
  };

  if (!user) {
     navigate("/login");
     return null;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:p-6 space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Personal Information
          </h2>
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={loadingUpdate}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center disabled:opacity-50"
              >
                {loadingUpdate && <Spinner className="mr-2 h-4 w-4" />}
                Save Changes
              </button>
              <button
                type="button"
                onClick={handleCancelUpdate}
                disabled={loadingUpdate}
                className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition flex items-center justify-center disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Security
          </h2>
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Current Password
              </label>
              <input
                type="password"
                value={passwordData.oldPassword}
                onChange={(e) =>
                  setPasswordData({ ...passwordData, oldPassword: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                New Password
              </label>
              <input
                type="password"
                value={passwordData.newPassword}
                onChange={(e) =>
                  setPasswordData({ ...passwordData, newPassword: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={loadingPassword}
                className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition flex items-center justify-center disabled:opacity-50"
              >
                {loadingPassword && <Spinner className="mr-2 h-4 w-4" />}
                Update Password
              </button>
              <button
                type="button"
                onClick={handleCancelPassword}
                disabled={loadingPassword}
                className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition flex items-center justify-center disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;