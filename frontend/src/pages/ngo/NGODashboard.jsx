import { useQuery } from "@tanstack/react-query";

import DashboardLayout from "../../layouts/DashboardLayout";

import {
  getAvailableDonations,
  getMyReservations,
} from "../../services/ngoService";

function NGODashboard() {
  // =========================
  // AVAILABLE DONATIONS
  // =========================

  const {
    data: donationsData,
    isLoading: donationsLoading,
    isError: donationsError,
  } = useQuery({
    queryKey: ["ngo-donations"],
    queryFn: () => getAvailableDonations(),
  });

  // =========================
  // RESERVATIONS
  // =========================

  const {
    data: reservationsData,
    isLoading: reservationsLoading,
    isError: reservationsError,
  } = useQuery({
    queryKey: ["ngo-reservations"],
    queryFn: () => getMyReservations(),
  });

  // =========================
  // LOADING
  // =========================

  if (
    donationsLoading ||
    reservationsLoading
  ) {
    return (
      <DashboardLayout>
        <div className="flex min-h-[300px] items-center justify-center">
          <h2 className="text-xl font-semibold">
            Loading dashboard...
          </h2>
        </div>
      </DashboardLayout>
    );
  }

  // =========================
  // DATA
  // =========================

  const donations =
    donationsData?.results ??
    donationsData ??
    [];

  const reservations =
    reservationsData?.results ??
    reservationsData ??
    [];

  // =========================
  // STATISTICS
  // =========================

  const availableCount =
    donations.length;

  const reservationCount =
    reservations.length;

  const activeCount =
    reservations.filter(
      (reservation) =>
        reservation.status === "PENDING" ||
        reservation.status === "CONFIRMED"
    ).length;

  const completedCount =
    reservations.filter(
      (reservation) =>
        reservation.status === "COMPLETED"
    ).length;

  // =========================
  // DASHBOARD
  // =========================

  return (
    <DashboardLayout>

      {/* Header */}

      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          NGO Dashboard
        </h1>

        <p className="mt-2 text-gray-500">
          Manage food donations and
          reservations for your organization.
        </p>
      </div>

      {/* Error Notice */}

      {(donationsError ||
        reservationsError) && (
        <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-600">
          Some dashboard information could
          not be loaded.
        </div>
      )}

      {/* Statistics */}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

        {/* Available */}

        <div className="rounded-xl bg-white p-6 shadow-md">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Available Food
              </p>

              <p className="mt-2 text-3xl font-bold text-green-600">
                {availableCount}
              </p>
            </div>

            <div className="rounded-full bg-green-100 p-4 text-2xl">
              🍱
            </div>

          </div>
        </div>

        {/* Reservations */}

        <div className="rounded-xl bg-white p-6 shadow-md">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                My Reservations
              </p>

              <p className="mt-2 text-3xl font-bold text-blue-600">
                {reservationCount}
              </p>
            </div>

            <div className="rounded-full bg-blue-100 p-4 text-2xl">
              📦
            </div>

          </div>
        </div>

        {/* Active */}

        <div className="rounded-xl bg-white p-6 shadow-md">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Active Reservations
              </p>

              <p className="mt-2 text-3xl font-bold text-yellow-600">
                {activeCount}
              </p>
            </div>

            <div className="rounded-full bg-yellow-100 p-4 text-2xl">
              🔄
            </div>

          </div>
        </div>

        {/* Completed */}

        <div className="rounded-xl bg-white p-6 shadow-md">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Completed
              </p>

              <p className="mt-2 text-3xl font-bold text-purple-600">
                {completedCount}
              </p>
            </div>

            <div className="rounded-full bg-purple-100 p-4 text-2xl">
              ✅
            </div>

          </div>
        </div>

      </div>

      {/* Quick Actions */}

      <div className="mt-8 rounded-xl bg-white p-6 shadow-md">

        <h2 className="text-xl font-bold">
          Quick Actions
        </h2>

        <div className="mt-5 grid gap-4 md:grid-cols-2">

          <a
            href="/ngo/donations"
            className="rounded-lg bg-green-600 px-5 py-4 text-center font-medium text-white transition hover:bg-green-700"
          >
            Browse Available Donations
          </a>

          <a
            href="/ngo/reservations"
            className="rounded-lg bg-blue-600 px-5 py-4 text-center font-medium text-white transition hover:bg-blue-700"
          >
            View My Reservations
          </a>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default NGODashboard;