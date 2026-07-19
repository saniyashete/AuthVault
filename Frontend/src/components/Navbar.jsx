import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { logoutUser } from "../services/authApi";

function Navbar() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await logoutUser();

      setUser(null);

      toast.success(response.data.message);

      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout Failed");
    }
  };

  return (
    <nav
      className="
      w-full
      bg-white
      shadow-sm
      border-b
      px-6
      py-4
      flex
      items-center
      justify-between
      "
    >
      {/* Brand */}
      <Link
        to="/"
        className="
        text-xl
        font-bold
        text-teal-600
        "
      >
        AuthApp
      </Link>

      <div className="flex items-center gap-5">
        {!user ? (
          <>
            <Link
              to="/register"
              className="
              text-gray-600
              hover:text-teal-600
              "
            >
              Register
            </Link>

            <Link
              to="/login"
              className="
              text-gray-600
              hover:text-teal-600
              "
            >
              Login
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/profile"
              className="
              text-gray-600
              hover:text-teal-600
              "
            >
              Profile
            </Link>

            <button
              onClick={handleLogout}
              className="
              px-4
              py-2
              rounded-lg
              bg-red-500
              text-white
              font-semibold
              hover:bg-red-600
              transition
              "
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
