import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { registerUser } from "../../services/authService";

function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  // Password visibility
  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      const response = await registerUser({
        full_name: data.full_name,
        email: data.email,
        password: data.password,
        role: data.role,
      });

      console.log(
        "Register Response:",
        response
      );

      toast.success(
        response.message ||
          "Registration successful!"
      );

      navigate("/login");

    } catch (error) {
      console.error(
        "Registration Error:",
        error.response?.data ||
          error.message
      );

      toast.error(
        error.response?.data?.message ||
          "Registration failed."
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">

      <div className="w-full max-w-lg">

        {/* =========================
            LOGO
        ========================= */}

        <div className="mb-8 text-center">

          <Link
            to="/"
            className="text-3xl font-bold text-green-600"
          >
            FoodBridge
          </Link>

          <p className="mt-2 text-gray-500">
            Create your account
          </p>

        </div>


        {/* =========================
            REGISTRATION FORM
        ========================= */}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-2xl bg-white p-8 shadow-lg"
        >

          <h1 className="mb-6 text-3xl font-bold">
            Create Account
          </h1>


          {/* =========================
              FULL NAME
          ========================= */}

          <div className="mb-5">

            <label className="mb-2 block font-medium text-gray-700">
              Full Name
            </label>

            <input
              {...register("full_name", {
                required:
                  "Full name is required",
              })}
              type="text"
              placeholder="Enter your full name"
              className="w-full rounded-lg border p-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
            />

            {errors.full_name && (
              <p className="mt-1 text-sm text-red-600">
                {errors.full_name.message}
              </p>
            )}

          </div>


          {/* =========================
              EMAIL
          ========================= */}

          <div className="mb-5">

            <label className="mb-2 block font-medium text-gray-700">
              Email
            </label>

            <input
              {...register("email", {
                required:
                  "Email is required",
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


          {/* =========================
              ROLE
          ========================= */}

          <div className="mb-5">

            <label className="mb-2 block font-medium text-gray-700">
              Account Type
            </label>

            <select
              {...register("role", {
                required:
                  "Please select an account type",
              })}
              className="w-full rounded-lg border p-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
            >

              <option value="">
                Select account type
              </option>

              <option value="DONOR">
                Food Donor
              </option>

              <option value="NGO">
                NGO
              </option>

            </select>

            {errors.role && (
              <p className="mt-1 text-sm text-red-600">
                {errors.role.message}
              </p>
            )}

          </div>


          {/* =========================
              PASSWORD
          ========================= */}

          <div className="mb-5">

            <label className="mb-2 block font-medium text-gray-700">
              Password
            </label>

            <div className="relative">

              <input
                {...register("password", {
                  required:
                    "Password is required",

                  minLength: {
                    value: 8,
                    message:
                      "Password must be at least 8 characters",
                  },
                })}
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Create a password"
                className="w-full rounded-lg border p-3 pr-20 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-green-600 hover:text-green-700"
              >
                {showPassword
                  ? "Hide"
                  : "Show"}
              </button>

            </div>

            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}

          </div>


          {/* =========================
              CONFIRM PASSWORD
          ========================= */}

          <div className="mb-6">

            <label className="mb-2 block font-medium text-gray-700">
              Confirm Password
            </label>

            <div className="relative">

              <input
                {...register(
                  "confirm_password",
                  {
                    required:
                      "Please confirm your password",

                    validate: (value) =>
                      value === password ||
                      "Passwords do not match",
                  }
                )}
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                placeholder="Confirm your password"
                className="w-full rounded-lg border p-3 pr-20 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-green-600 hover:text-green-700"
              >
                {showConfirmPassword
                  ? "Hide"
                  : "Show"}
              </button>

            </div>

            {errors.confirm_password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.confirm_password.message}
              </p>
            )}

          </div>


          {/* =========================
              REGISTER BUTTON
          ========================= */}

          <button
            type="submit"
            className="w-full rounded-lg bg-green-600 p-3 font-semibold text-white transition hover:bg-green-700"
          >
            Create Account
          </button>


          {/* =========================
              LOGIN LINK
          ========================= */}

          <p className="mt-6 text-center text-gray-600">

            Already have an account?{" "}

            <Link
              to="/login"
              className="font-semibold text-green-600 hover:text-green-700 hover:underline"
            >
              Login
            </Link>

          </p>


          {/* =========================
              HOME LINK
          ========================= */}

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

export default Register;