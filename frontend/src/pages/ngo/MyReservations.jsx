import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import toast from "react-hot-toast";

import DashboardLayout from "../../layouts/DashboardLayout";
import ReservationCard from "../../components/ngo/ReservationCard";

import {
  getMyReservations,
  cancelReservation,
  completeReservation,
} from "../../services/ngoService";

function MyReservations() {
  const queryClient = useQueryClient();

  // =========================
  // GET RESERVATIONS
  // =========================

  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["ngo-reservations"],
    queryFn: () => getMyReservations(),
  });

  // =========================
  // CANCEL
  // =========================

  const cancelMutation = useMutation({
    mutationFn: cancelReservation,

    onSuccess: () => {
      toast.success(
        "Reservation cancelled successfully!"
      );

      queryClient.invalidateQueries({
        queryKey: ["ngo-reservations"],
      });

      queryClient.invalidateQueries({
        queryKey: ["ngo-donations"],
      });
    },

    onError: (error) => {
      console.error(
        "Cancel reservation error:",
        error.response?.data ||
          error.message
      );

      toast.error(
        error.response?.data?.detail ||
          error.response?.data?.message ||
          "Failed to cancel reservation."
      );
    },
  });

  // =========================
  // COMPLETE
  // =========================

  const completeMutation = useMutation({
    mutationFn: completeReservation,

    onSuccess: () => {
      toast.success(
        "Reservation completed successfully!"
      );

      queryClient.invalidateQueries({
        queryKey: ["ngo-reservations"],
      });

      queryClient.invalidateQueries({
        queryKey: ["ngo-donations"],
      });
    },

    onError: (error) => {
      console.error(
        "Complete reservation error:",
        error.response?.data ||
          error.message
      );

      toast.error(
        error.response?.data?.detail ||
          error.response?.data?.message ||
          "Failed to complete reservation."
      );
    },
  });

  // =========================
  // HANDLERS
  // =========================

  const handleCancel = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this reservation?"
    );

    if (!confirmed) {
      return;
    }

    cancelMutation.mutate(id);
  };

  const handleComplete = (id) => {
    const confirmed = window.confirm(
      "Mark this reservation as completed?"
    );

    if (!confirmed) {
      return;
    }

    completeMutation.mutate(id);
  };

  // =========================
  // LOADING
  // =========================

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex min-h-[300px] items-center justify-center">
          <h2 className="text-xl font-semibold">
            Loading reservations...
          </h2>
        </div>
      </DashboardLayout>
    );
  }

  // =========================
  // ERROR
  // =========================

  if (isError) {
    return (
      <DashboardLayout>
        <div className="rounded-xl bg-white p-10 shadow">
          <h2 className="font-bold text-red-600">
            {error.response?.data?.message ||
              error.message ||
              "Failed to load reservations."}
          </h2>
        </div>
      </DashboardLayout>
    );
  }

  // =========================
  // DATA
  // =========================

  const reservations =
    data?.results ?? data ?? [];
  const pendingCount =
  reservations.filter(
    (reservation) =>
      reservation.status === "PENDING"
  ).length;

const confirmedCount =
  reservations.filter(
    (reservation) =>
      reservation.status === "CONFIRMED"
  ).length;

const completedCount =
  reservations.filter(
    (reservation) =>
      reservation.status === "COMPLETED"
  ).length;

const cancelledCount =
  reservations.filter(
    (reservation) =>
      reservation.status === "CANCELLED"
  ).length;

  // =========================
  // UI
  // =========================

  return (
    <DashboardLayout>

      {/* Header */}

      <div className="mb-8">
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

  <div className="rounded-xl bg-white p-5 shadow">
    <p className="text-sm text-gray-500">
      Pending
    </p>

    <p className="mt-2 text-2xl font-bold text-yellow-600">
      {pendingCount}
    </p>
  </div>

  <div className="rounded-xl bg-white p-5 shadow">
    <p className="text-sm text-gray-500">
      Confirmed
    </p>

    <p className="mt-2 text-2xl font-bold text-green-600">
      {confirmedCount}
    </p>
  </div>

  <div className="rounded-xl bg-white p-5 shadow">
    <p className="text-sm text-gray-500">
      Completed
    </p>

    <p className="mt-2 text-2xl font-bold text-blue-600">
      {completedCount}
    </p>
  </div>

  <div className="rounded-xl bg-white p-5 shadow">
    <p className="text-sm text-gray-500">
      Cancelled
    </p>

    <p className="mt-2 text-2xl font-bold text-red-600">
      {cancelledCount}
    </p>
  </div>

</div>

        <h1 className="text-3xl font-bold">
          My Reservations
        </h1>

        <p className="mt-2 text-gray-500">
          Manage the food donations reserved
          by your organization.
        </p>
      </div>

      {/* Empty */}

      {reservations.length === 0 ? (
        <div className="rounded-xl bg-white p-10 text-center shadow">

          <div className="text-5xl">
            📦
          </div>

          <h2 className="mt-4 text-xl font-bold">
            No reservations yet
          </h2>

          <p className="mt-2 text-gray-500">
            You haven't reserved any food
            donations yet.
          </p>

        </div>
      ) : (

        /* Reservation Grid */

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {reservations.map(
            (reservation) => (
              <ReservationCard
                key={reservation.id}
                reservation={reservation}
                onCancel={handleCancel}
                onComplete={handleComplete}
              />
            )
          )}

        </div>
      )}

    </DashboardLayout>
  );
}

export default MyReservations;