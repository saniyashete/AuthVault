import { Lock, Mail } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import AuthLayout from "../components/layout/AuthLayout";
import Logo from "../components/Logo";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import { useAuth } from "../context/AuthContext";
import { loginUser } from "../services/authApi";
function Login() {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { fetchProfile } = useAuth();

  const handleChange = (e) => {
    setUserInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await loginUser(userInfo);

      await fetchProfile();

      toast.success(response.data.message);

      navigate("/profile");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <AuthLayout>
        <Card>
          <Logo></Logo>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>

            <p className="text-gray-500 mt-2">
              Sign in to continue to AuthVault
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Email
              </label>

              <Input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={userInfo.email}
                onChange={handleChange}
                icon={Mail}
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Password
              </label>

              <Input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={userInfo.password}
                onChange={handleChange}
                icon={Lock}
              />
            </div>

            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="text-sm text-teal-600 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <Button type="submit" loading={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have an account?
            <Link
              to="/register"
              className="ml-1 text-teal-600 font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </Card>
      </AuthLayout>
    </>
  );
}

export default Login;
