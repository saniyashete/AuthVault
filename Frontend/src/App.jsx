import { Route, Routes } from "react-router";
import ProtectedLayout from "./components/ProtectedLayout";
import ProtectedRoutes from "./components/ProtectedRoutes";
import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route
        path="/profile"
        element={
          <ProtectedRoutes>
            <ProtectedLayout>
              <Profile />
            </ProtectedLayout>
          </ProtectedRoutes>
        }
      />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
    </Routes>
  );
}

export default App;
