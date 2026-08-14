import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { loginUser } from "../../services/authService";
import { useAuth } from "../../contexts/AuthContext";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data);

      login(response);

      toast.success(response.message);

      // Role-based redirect
      if (response.user.role === "NGO") {
        navigate("/ngo/dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(
        "Login Error:",
        error.response?.data || error.message
      );

      toast.error(
        error.response?.data?.message ||
          "Invalid email or password."
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">

      <div className="w-full max-w-md">

        {/* Logo */}

        <div className="mb-8 text-center">
          <Link
            to="/"
            className="text-3xl font-bold text-green-600"
          >
            FoodBridge
          </Link>

          <p className="mt-2 text-gray-500">
            Welcome back
          </p>
        </div>

        {/* Login Card */}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-2xl bg-white p-8 shadow-lg"
        >

          <h1 className="mb-6 text-3xl font-bold text-gray-900">
            Login
          </h1>

          {/* Email */}

          <div className="mb-5">

            <label className="mb-2 block font-medium text-gray-700">
              Email
            </label>

            <input
              {...register("email", {
                required: "Email is required",
              })}
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-lg border p-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}

          </div>

          {/* Password */}

          <div className="mb-6">

            <label className="mb-2 block font-medium text-gray-700">
              Password
            </label>

            <input
              {...register("password", {
                required: "Password is required",
              })}
              type="password"
              placeholder="Enter your password"
              className="w-full rounded-lg border p-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
            />

            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}

          </div>

          {/* Login Button */}

          <button
            type="submit"
            className="w-full rounded-lg bg-green-600 p-3 font-semibold text-white transition hover:bg-green-700"
          >
            Login
          </button>

          {/* Register Link */}

          <p className="mt-6 text-center text-gray-600">

            Don't have an account?{" "}

            <Link
              to="/register"
              className="font-semibold text-green-600 hover:text-green-700 hover:underline"
            >
              Create an account
            </Link>

          </p>

          {/* Home Link */}

          <div className="mt-4 text-center">

            <Link
              to="/"
              className="text-sm text-gray-500 hover:text-green-600"
            >
              ← Back to Home
            </Link>

          </div>

        </form>

      </div>

    </div>
  );
}

export default Login;