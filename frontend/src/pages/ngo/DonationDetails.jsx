import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import DashboardLayout from "../../layouts/DashboardLayout";

import {
  getDonationDetails,
  reserveDonation,
} from "../../services/ngoService";

function DonationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

const reserveMutation = useMutation({
  mutationFn: reserveDonation,

  onSuccess: () => {
    toast.success(
      "Donation reserved successfully!"
    );

    queryClient.invalidateQueries({
      queryKey: ["ngo-donation", id],
    });

    queryClient.invalidateQueries({
      queryKey: ["ngo-donations"],
    });
  },

  onError: (error) => {
    console.error(
  "Reservation error:",
  error.response?.data || error.message
);

console.log(
  "DONATION ID ERROR:",
  error.response?.data?.errors?.donation_id
);
    toast.error(
      error.response?.data?.message ||
        error.response?.data?.detail ||
        "Failed to reserve donation."
    );
  },
});

  const {
    data: donation,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["ngo-donation", id],
    queryFn: () => getDonationDetails(id),
    enabled: !!id,
  });

  const formatDate = (date) => {
    if (!date) {
      return "Not specified";
    }

    return new Date(date).toLocaleString();
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex min-h-[300px] items-center justify-center">
          <h2 className="text-xl font-semibold">
            Loading donation...
          </h2>
        </div>
      </DashboardLayout>
    );
  }

  if (isError) {
    return (
      <DashboardLayout>
        <div className="rounded-xl bg-white p-10 shadow">
          <h2 className="font-bold text-red-600">
            {error.response?.data?.message ||
              error.message ||
              "Failed to load donation."}
          </h2>

          <button
            onClick={() =>
              navigate("/ngo/donations")
            }
            className="mt-6 rounded-lg bg-green-600 px-5 py-2 text-white hover:bg-green-700"
          >
            Back to Donations
          </button>
        </div>
      </DashboardLayout>
    );
  }

  if (!donation) {
    return (
      <DashboardLayout>
        <div className="rounded-xl bg-white p-10 text-center shadow">
          <h2 className="text-xl font-bold">
            Donation not found
          </h2>

          <button
            onClick={() =>
              navigate("/ngo/donations")
            }
            className="mt-6 rounded-lg bg-green-600 px-5 py-2 text-white hover:bg-green-700"
          >
            Back to Donations
          </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-5xl">

        {/* Back Button */}

        <button
          onClick={() =>
            navigate("/ngo/donations")
          }
          className="mb-6 text-sm font-medium text-green-600 hover:text-green-700"
        >
          ← Back to Available Donations
        </button>

        {/* Main Card */}

        <div className="overflow-hidden rounded-2xl bg-white shadow-lg">

          {/* Image */}

          {donation.image ? (
            <img
              src={donation.image}
              alt={donation.food_name}
              className="h-72 w-full object-cover"
            />
          ) : (
            <div className="flex h-72 items-center justify-center bg-gray-100">
              <span className="text-7xl">
                🍽️
              </span>
            </div>
          )}

          {/* Content */}

          <div className="p-8">

            {/* Header */}

            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

              <div>
                <h1 className="text-3xl font-bold">
                  {donation.food_name}
                </h1>

                <p className="mt-2 text-gray-500">
                  {donation.food_type} •{" "}
                  {donation.food_category}
                </p>
              </div>

              <span className="w-fit rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                {donation.status}
              </span>

            </div>

            {/* Description */}

            {donation.description && (
              <div className="mt-8">
                <h2 className="text-lg font-bold">
                  Description
                </h2>

                <p className="mt-2 text-gray-600">
                  {donation.description}
                </p>
              </div>
            )}

            {/* Details */}

            <div className="mt-8 grid gap-6 md:grid-cols-2">

              <div className="rounded-lg bg-gray-50 p-5">
                <p className="text-sm text-gray-500">
                  Quantity
                </p>

                <p className="mt-1 font-semibold">
                  {donation.quantity}
                </p>
              </div>

              <div className="rounded-lg bg-gray-50 p-5">
                <p className="text-sm text-gray-500">
                  Servings
                </p>

                <p className="mt-1 font-semibold">
                  {donation.servings}
                </p>
              </div>

              <div className="rounded-lg bg-gray-50 p-5">
                <p className="text-sm text-gray-500">
                  Food Type
                </p>

                <p className="mt-1 font-semibold">
                  {donation.food_type}
                </p>
              </div>

              <div className="rounded-lg bg-gray-50 p-5">
                <p className="text-sm text-gray-500">
                  Food Category
                </p>

                <p className="mt-1 font-semibold">
                  {donation.food_category}
                </p>
              </div>

            </div>

            {/* Pickup Information */}

            <div className="mt-8">

              <h2 className="text-lg font-bold">
                Pickup Information
              </h2>

              <div className="mt-4 space-y-4">

                <div>
                  <p className="text-sm text-gray-500">
                    Pickup Address
                  </p>

                  <p className="mt-1 font-medium">
                    {donation.pickup_address}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Pickup Start
                  </p>

                  <p className="mt-1 font-medium">
                    {formatDate(
                      donation.pickup_start_time
                    )}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Expiry
                  </p>

                  <p className="mt-1 font-medium">
                    {formatDate(
                      donation.expiry_time
                    )}
                  </p>
                </div>

              </div>

            </div>

            {/* Contact */}

            {donation.contact_number && (
              <div className="mt-8 rounded-lg bg-green-50 p-5">

                <p className="text-sm text-gray-500">
                  Contact Number
                </p>

                <p className="mt-1 font-semibold text-green-700">
                  {donation.contact_number}
                </p>

              </div>
            )}

            {/* Reserve Button */}

            {donation.status === "AVAILABLE" && (
  <button
    onClick={() => {
      const confirmed = window.confirm(
        "Are you sure you want to reserve this donation?"
      );

      if (!confirmed) {
        return;
      }

      reserveMutation.mutate(donation.id);
    }}
    disabled={reserveMutation.isPending}
    className="mt-8 w-full rounded-lg bg-green-600 px-6 py-4 text-lg font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
  >
    {reserveMutation.isPending
      ? "Reserving..."
      : "Reserve Donation"}
  </button>
)}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default DonationDetails;