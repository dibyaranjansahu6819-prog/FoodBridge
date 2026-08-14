import { useState } from "react";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";
import DonationCard from "../../components/donations/DonationCard";

import {
  getDonations,
  deleteDonation,
} from "../../services/donationService";
import LoadingState from "../../components/ui/LoadingState";
import ErrorState from "../../components/ui/ErrorState";
import EmptyState from "../../components/ui/EmptyState";

function DonationList() {
  // =========================
  // FILTER STATES
  // =========================

  const [search, setSearch] = useState("");
  const [foodType, setFoodType] = useState("");
  const [foodCategory, setFoodCategory] = useState("");
  const [status, setStatus] = useState("");

  // =========================
  // PAGINATION
  // =========================

  const [page, setPage] = useState(1);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // =========================
  // DELETE DONATION
  // =========================

  const deleteMutation = useMutation({
    mutationFn: deleteDonation,

    onSuccess: () => {
      toast.success("Donation deleted successfully!");

      queryClient.invalidateQueries({
        queryKey: ["donations"],
      });
    },

    onError: (error) => {
      console.error(
        "Delete donation error:",
        error.response?.data || error.message
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to delete donation."
      );
    },
  });

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this donation?"
    );

    if (!confirmed) {
      return;
    }

    deleteMutation.mutate(id);
  };

  // =========================
  // SEARCH
  // =========================

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setPage(1);
  };

  // =========================
  // FOOD TYPE
  // =========================

  const handleFoodTypeChange = (event) => {
    setFoodType(event.target.value);
    setPage(1);
  };

  // =========================
  // FOOD CATEGORY
  // =========================

  const handleFoodCategoryChange = (event) => {
    setFoodCategory(event.target.value);
    setPage(1);
  };

  // =========================
  // STATUS
  // =========================

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
    setPage(1);
  };

  // =========================
  // GET DONATIONS
  // =========================

  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [
      "donations",
      search,
      foodType,
      foodCategory,
      status,
      page,
    ],

    queryFn: () =>
      getDonations({
        search: search || undefined,
        food_type: foodType || undefined,
        food_category: foodCategory || undefined,
        status: status || undefined,
        page,
      }),
  });

  // =========================
  // LOADING
  // =========================

  if (isLoading) {
  return (
    <DashboardLayout>
      <LoadingState message="Loading donations..." />
    </DashboardLayout>
  );
}

  // =========================
  // ERROR
  // =========================

  if (isError) {
  return (
    <DashboardLayout>
      <ErrorState
        message={
          error.response?.data?.message ||
          error.message ||
          "Failed to load donations."
        }
        onRetry={() => window.location.reload()}
      />
    </DashboardLayout>
  );
}

  // =========================
  // DONATIONS
  // =========================

  const donations = data?.results ?? data ?? [];

  // =========================
  // PAGINATION HELPERS
  // =========================

  const handlePreviousPage = () => {
    if (data?.previous) {
      setPage((previous) => previous - 1);
    }
  };

  const handleNextPage = () => {
    if (data?.next) {
      setPage((previous) => previous + 1);
    }
  };

  // =========================
  // UI
  // =========================

  return (
    <DashboardLayout>

      {/* =========================
          HEADER
      ========================= */}

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            My Donations
          </h1>

          <p className="mt-2 text-gray-500">
            Manage all your food donations.
          </p>
        </div>

        <button
          onClick={() =>
            navigate("/donations/create")
          }
          className="rounded-lg bg-green-600 px-5 py-3 text-white hover:bg-green-700"
        >
          + New Donation
        </button>
      </div>

      {/* =========================
          FILTERS
      ========================= */}

      <div className="mb-6 rounded-xl bg-white p-5 shadow">
        <div className="grid gap-4 md:grid-cols-4">

          {/* SEARCH */}

          <input
            type="text"
            placeholder="Search food..."
            value={search}
            onChange={handleSearchChange}
            className="rounded-lg border p-3 outline-none focus:ring-2 focus:ring-green-500"
          />

          {/* FOOD TYPE */}

          <select
            value={foodType}
            onChange={handleFoodTypeChange}
            className="rounded-lg border p-3"
          >
            <option value="">
              All Food Types
            </option>

            <option value="VEG">
              Vegetarian
            </option>

            <option value="NON_VEG">
              Non-Vegetarian
            </option>
          </select>

          {/* FOOD CATEGORY */}

          <select
            value={foodCategory}
            onChange={handleFoodCategoryChange}
            className="rounded-lg border p-3"
          >
            <option value="">
              All Categories
            </option>

            <option value="COOKED">
              Cooked
            </option>

            <option value="PACKAGED">
              Packaged
            </option>

            <option value="RAW">
              Raw
            </option>
          </select>

          {/* STATUS */}

          <select
            value={status}
            onChange={handleStatusChange}
            className="rounded-lg border p-3"
          >
            <option value="">
              All Statuses
            </option>

            <option value="AVAILABLE">
              Available
            </option>

            <option value="RESERVED">
              Reserved
            </option>

            <option value="COMPLETED">
              Completed
            </option>

            <option value="CANCELLED">
              Cancelled
            </option>
          </select>

        </div>
      </div>

      {/* =========================
          DONATION LIST
      ========================= */}

     {donations.length === 0 ? (
  <EmptyState
    title="No donations found"
    message="You haven't added any donations yet."
    action={{
      label: "Create Donation",
      onClick: () =>
        navigate("/donations/create"),
    }}
  />
) : (

        <div className="grid gap-6 md:grid-cols-2">

          {donations.map((donation) => (
            <DonationCard
              key={donation.id}
              donation={donation}

              onEdit={(donation) =>
                navigate(
                  `/donations/${donation.id}/edit`
                )
              }

              onDelete={handleDelete}
            />
          ))}

        </div>
      )}

      {/* =========================
          PAGINATION
      ========================= */}

      {data?.results && (
        <div className="mt-8 flex items-center justify-center gap-4">

          {/* PREVIOUS */}

          <button
            onClick={handlePreviousPage}
            disabled={!data.previous}
            className="rounded-lg border px-5 py-2 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            ← Previous
          </button>

          {/* CURRENT PAGE */}

          <span className="rounded-lg bg-gray-100 px-5 py-2 font-medium">
            Page {page}
          </span>

          {/* NEXT */}

          <button
            onClick={handleNextPage}
            disabled={!data.next}
            className="rounded-lg bg-green-600 px-5 py-2 text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next →
          </button>

        </div>
      )}

    </DashboardLayout>
  );
}

export default DonationList;