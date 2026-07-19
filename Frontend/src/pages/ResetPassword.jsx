import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import Logo from "../components/Logo";
import { resetPassword } from "../services/authApi";
function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      return toast.error("All fields are required");
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      const response = await resetPassword(token, password);

      toast.success(response.message);

      setPassword("");
      setConfirmPassword("");

      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
          <Logo></Logo>
          <h1 className="mb-2 text-center text-3xl font-bold">
            Reset Password
          </h1>

          <p className="mb-6 text-center text-gray-500">
            Create a new password for your AuthVault account.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border p-3 outline-none focus:border-teal-500"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-lg border p-3 outline-none focus:border-teal-500"
            />

            <button
              type="submit"
              className="w-full rounded-lg bg-teal-600 py-3 text-white hover:bg-teal-700"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
