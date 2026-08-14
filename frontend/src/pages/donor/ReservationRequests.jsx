import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import toast from "react-hot-toast";

import DashboardLayout from "../../layouts/DashboardLayout";

import {
  getReservationRequests,
  confirmReservation,
  rejectReservation,
} from "../../services/donorService";

function ReservationRequests() {
  const queryClient = useQueryClient();

  // =========================================================
  // GET REQUESTS
  // =========================================================

  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["donor-reservation-requests"],
    queryFn: () => getReservationRequests(),
  });

  // =========================================================
  // CONFIRM
  // =========================================================

  const confirmMutation = useMutation({
    mutationFn: confirmReservation,

    onSuccess: () => {
      toast.success(
        "Reservation confirmed successfully!"
      );

      queryClient.invalidateQueries({
        queryKey: ["donor-reservation-requests"],
      });

      queryClient.invalidateQueries({
        queryKey: ["donations"],
      });

      queryClient.invalidateQueries({
        queryKey: ["ngo-reservations"],
      });
    },

    onError: (error) => {
      console.error(
        "Confirm reservation error:",
        error.response?.data || error.message
      );

      toast.error(
        error.response?.data?.message ||
          error.response?.data?.detail ||
          "Failed to confirm reservation."
      );
    },
  });

  // =========================================================
  // REJECT
  // =========================================================

  const rejectMutation = useMutation({
    mutationFn: rejectReservation,

    onSuccess: () => {
      toast.success(
        "Reservation rejected successfully."
      );

      queryClient.invalidateQueries({
        queryKey: ["donor-reservation-requests"],
      });

      queryClient.invalidateQueries({
        queryKey: ["donations"],
      });

      queryClient.invalidateQueries({
        queryKey: ["ngo-donations"],
      });
    },

    onError: (error) => {
      console.error(
        "Reject reservation error:",
        error.response?.data || error.message
      );

      toast.error(
        error.response?.data?.message ||
          error.response?.data?.detail ||
          "Failed to reject reservation."
      );
    },
  });

  // =========================================================
  // HANDLERS
  // =========================================================

  const handleConfirm = (id) => {
    const confirmed = window.confirm(
      "Do you want to confirm this reservation?"
    );

    if (!confirmed) {
      return;
    }

    confirmMutation.mutate(id);
  };

  const handleReject = (id) => {
    const confirmed = window.confirm(
      "Do you want to reject this reservation?"
    );

    if (!confirmed) {
      return;
    }

    rejectMutation.mutate(id);
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex min-h-[300px] items-center justify-center">
          <h2 className="text-xl font-semibold">
            Loading reservation requests...
          </h2>
        </div>
      </DashboardLayout>
    );
  }

  // =========================================================
  // ERROR
  // =========================================================

  if (isError) {
    return (
      <DashboardLayout>
        <div className="rounded-xl bg-white p-10 shadow">
          <h2 className="font-bold text-red-600">
            {error.response?.data?.message ||
              error.message ||
              "Failed to load reservation requests."}
          </h2>
        </div>
      </DashboardLayout>
    );
  }

  // =========================================================
  // DATA
  // =========================================================

  const reservations =
    data?.results ?? data ?? [];

  // =========================================================
  // UI
  // =========================================================

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Reservation Requests
        </h1>

        <p className="mt-2 text-gray-500">
          Review NGOs requesting your food donations.
        </p>
      </div>

      {reservations.length === 0 ? (
        <div className="rounded-xl bg-white p-12 text-center shadow">
          <h2 className="text-xl font-semibold text-gray-800">
            No reservation requests
          </h2>

          <p className="mt-2 text-gray-500">
            You currently have no reservation requests
            for your donations.
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {reservations.map((reservation) => {
            const donation =
              reservation.donation;

            const imageUrl =
              donation?.image
                ? donation.image.startsWith("http")
                  ? donation.image
                  : `http://127.0.0.1:8000${donation.image}`
                : null;

            return (
              <div
                key={reservation.id}
                className="overflow-hidden rounded-2xl bg-white shadow-md"
              >
                <div className="grid md:grid-cols-[280px_1fr]">
                  {/* IMAGE */}

                  <div className="h-64 bg-gray-100 md:h-full">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={
                          donation?.food_name ||
                          "Food donation"
                        }
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-gray-400">
                        No image available
                      </div>
                    )}
                  </div>

                  {/* CONTENT */}

                  <div className="p-6">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                          {donation?.food_name ||
                            "Food Donation"}
                        </h2>

                        <p className="mt-1 text-gray-500">
                          {donation?.food_type ||
                            "N/A"}{" "}
                          •{" "}
                          {donation?.food_category ||
                            "N/A"}
                        </p>
                      </div>

                      <span
                        className={`rounded-full px-4 py-2 text-sm font-semibold ${
                          reservation.status ===
                          "PENDING"
                            ? "bg-yellow-100 text-yellow-700"
                            : reservation.status ===
                              "CONFIRMED"
                            ? "bg-green-100 text-green-700"
                            : reservation.status ===
                              "CANCELLED"
                            ? "bg-red-100 text-red-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {reservation.status}
                      </span>
                    </div>

                    {/* DESCRIPTION */}

                    <p className="mt-5 text-gray-600">
                      {donation?.description ||
                        "No description available."}
                    </p>

                    {/* DETAILS */}

                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      <Detail
                        label="Quantity"
                        value={
                          donation?.quantity ||
                          "N/A"
                        }
                      />

                      <Detail
                        label="Servings"
                        value={
                          donation?.servings ||
                          "N/A"
                        }
                      />

                      <Detail
                        label="Pickup Address"
                        value={
                          donation?.pickup_address ||
                          "N/A"
                        }
                      />

                      <Detail
                        label="Contact"
                        value={
                          donation?.contact_number ||
                          "N/A"
                        }
                      />

                      <Detail
                        label="Pickup Time"
                        value={
                          donation?.pickup_start_time
                            ? new Date(
                                donation.pickup_start_time
                              ).toLocaleString()
                            : "N/A"
                        }
                      />

                      <Detail
                        label="Expiry Time"
                        value={
                          donation?.expiry_time
                            ? new Date(
                                donation.expiry_time
                              ).toLocaleString()
                            : "N/A"
                        }
                      />
                    </div>

                    {/* ACTIONS */}

                    {reservation.status ===
                      "PENDING" && (
                      <div className="mt-6 flex flex-wrap gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            handleConfirm(
                              reservation.id
                            )
                          }
                          disabled={
                            confirmMutation.isPending ||
                            rejectMutation.isPending
                          }
                          className="rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {confirmMutation.isPending
                            ? "Confirming..."
                            : "Confirm Reservation"}
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleReject(
                              reservation.id
                            )
                          }
                          disabled={
                            confirmMutation.isPending ||
                            rejectMutation.isPending
                          }
                          className="rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {rejectMutation.isPending
                            ? "Rejecting..."
                            : "Reject Reservation"}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </DashboardLayout>
  );
}

function Detail({ label, value }) {
  return (
    <div className="rounded-lg bg-gray-50 p-3">
      <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
        {label}
      </p>

      <p className="mt-1 break-words font-medium text-gray-900">
        {value}
      </p>
    </div>
  );
}

export default ReservationRequests;