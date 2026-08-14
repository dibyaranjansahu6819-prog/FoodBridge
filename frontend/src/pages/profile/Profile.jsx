import { useAuth } from "../../contexts/AuthContext";
import DashboardLayout from "../../layouts/DashboardLayout";

function Profile() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-4xl">

        {/* Header */}

        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            My Profile
          </h1>

          <p className="mt-2 text-gray-500">
            View your FoodBridge account information.
          </p>
        </div>

        {/* Profile Card */}

        <div className="overflow-hidden rounded-2xl bg-white shadow">

          {/* Profile Header */}

          <div className="bg-green-700 px-8 py-10 text-white">

            <div className="flex items-center gap-5">

              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-3xl font-bold text-green-700">
                {user.full_name
                  ? user.full_name
                      .charAt(0)
                      .toUpperCase()
                  : "U"}
              </div>

              <div>
                <h2 className="text-2xl font-bold">
                  {user.full_name ||
                    "User"}
                </h2>

                <p className="mt-1 text-green-100">
                  {user.role}
                </p>
              </div>

            </div>

          </div>

          {/* Information */}

          <div className="p-8">

            <h2 className="mb-6 text-xl font-bold">
              Account Information
            </h2>

            <div className="grid gap-6 md:grid-cols-2">

              {/* Full Name */}

              <div className="rounded-lg bg-gray-50 p-5">
                <p className="text-sm text-gray-500">
                  Full Name
                </p>

                <p className="mt-2 font-semibold text-gray-900">
                  {user.full_name ||
                    "Not available"}
                </p>
              </div>

              {/* Email */}

              <div className="rounded-lg bg-gray-50 p-5">
                <p className="text-sm text-gray-500">
                  Email Address
                </p>

                <p className="mt-2 break-all font-semibold text-gray-900">
                  {user.email ||
                    "Not available"}
                </p>
              </div>

              {/* Role */}

              <div className="rounded-lg bg-gray-50 p-5">
                <p className="text-sm text-gray-500">
                  Account Role
                </p>

                <p className="mt-2 font-semibold text-green-700">
                  {user.role ||
                    "Not available"}
                </p>
              </div>

              {/* ID */}

              <div className="rounded-lg bg-gray-50 p-5">
                <p className="text-sm text-gray-500">
                  User ID
                </p>

                <p className="mt-2 font-semibold text-gray-900">
                  {user.id ||
                    "Not available"}
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}

export default Profile;