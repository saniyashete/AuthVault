import { Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import AuthLayout from "../components/layout/AuthLayout";
import Logo from "../components/Logo";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import { registerUser } from "../services/authApi";

function Register() {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userInfo.name || !userInfo.email || !userInfo.password) {
      toast.error("All fields are required");
      return;
    }
    setLoading(true);

    try {
      const response = await registerUser(userInfo);

      toast.success(response.data.message);

      navigate("/login");
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
          <div className="text-center mb-8">
            <Logo></Logo>
            <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>

            <p className="text-gray-500 mt-2">Create your AuthVault Account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Full Name
              </label>

              <Input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={userInfo.name}
                onChange={handleChange}
                icon={User}
              />
            </div>

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

            <Button type="submit" loading={loading}>
              {loading ? "Creating Account..." : "Register"}
            </Button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?
            <Link
              to="/login"
              className="ml-1 text-teal-600 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </Card>
      </AuthLayout>
    </>
  );
}

export default Register;
