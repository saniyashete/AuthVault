import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router";
import Logo from "../components/Logo";
import { forgotPassword } from "../services/authApi";
function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await forgotPassword(email);

      toast.success(response.message);

      setEmail("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
          <Logo />
          <h1 className="mb-2 text-center text-3xl font-bold">
            Forgot Password
          </h1>

          <p className="mb-6 text-center text-gray-500">
            Enter your email to receive a password reset link.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border p-3 outline-none focus:border-teal-500"
            />

            <button
              type="submit"
              className="w-full rounded-lg bg-teal-600 py-3 text-white hover:bg-teal-700"
            >
              Send Reset Link
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/login" className="text-sm text-teal-600 hover:underline">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
