import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";

function ProtectedRoutes({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div
        className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-gradient-to-br
        from-teal-50
        via-white
        to-cyan-100
        "
      >
        <p className="text-xl font-semibold text-teal-600">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoutes;
