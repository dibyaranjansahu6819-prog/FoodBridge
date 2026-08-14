import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";
import NGODonationCard from "../../components/ngo/NGODonationCard";

import { getAvailableDonations } from "../../services/ngoService";

function AvailableDonations() {
  const navigate = useNavigate();

  // =========================
  // FILTER STATES
  // =========================

  const [search, setSearch] = useState("");
  const [foodType, setFoodType] = useState("");
  const [foodCategory, setFoodCategory] = useState("");
  const [status, setStatus] = useState("");

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
      "ngo-donations",
      search,
      foodType,
      foodCategory,
      status,
    ],

    queryFn: () =>
      getAvailableDonations({
        search: search || undefined,
        food_type: foodType || undefined,
        food_category:
          foodCategory || undefined,
        status: status || undefined,
      }),
  });

  // =========================
  // LOADING
  // =========================

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex min-h-[300px] items-center justify-center">
          <h2 className="text-xl font-semibold">
            Loading available donations...
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
              "Failed to load donations."}
          </h2>
        </div>
      </DashboardLayout>
    );
  }

  // =========================
  // DONATIONS
  // =========================

  const donations =
    data?.results ?? data ?? [];

  // =========================
  // RESET FILTERS
  // =========================

  const clearFilters = () => {
    setSearch("");
    setFoodType("");
    setFoodCategory("");
    setStatus("");
  };

  return (
    <DashboardLayout>

      {/* =========================
          HEADER
      ========================= */}

      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Available Donations
        </h1>

        <p className="mt-2 text-gray-500">
          Find food donations available for
          your organization.
        </p>
      </div>

      {/* =========================
          FILTERS
      ========================= */}

      <div className="mb-6 rounded-xl bg-white p-5 shadow">

        <div className="grid gap-4 md:grid-cols-4">

          {/* Search */}

          <input
            type="text"
            placeholder="Search food..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            className="rounded-lg border p-3 outline-none focus:ring-2 focus:ring-green-500"
          />

          {/* Food Type */}

          <select
            value={foodType}
            onChange={(event) =>
              setFoodType(event.target.value)
            }
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

            <option value="VEGAN">
              Vegan
            </option>

            <option value="OTHER">
              Other
            </option>
          </select>

          {/* Food Category */}

          <select
            value={foodCategory}
            onChange={(event) =>
              setFoodCategory(event.target.value)
            }
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

            <option value="BAKERY">
              Bakery
            </option>

            <option value="FRUITS">
              Fruits
            </option>

            <option value="OTHER">
              Other
            </option>
          </select>

          {/* Status */}

          <select
            value={status}
            onChange={(event) =>
              setStatus(event.target.value)
            }
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

            <option value="EXPIRED">
              Expired
            </option>
          </select>

        </div>

        {/* Clear */}

        {(search ||
          foodType ||
          foodCategory ||
          status) && (
          <button
            onClick={clearFilters}
            className="mt-4 rounded-lg border px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
          >
            Clear Filters
          </button>
        )}

      </div>

      {/* =========================
          RESULT COUNT
      ========================= */}

      <div className="mb-5">
        <p className="text-sm text-gray-500">
          {donations.length} donation
          {donations.length !== 1
            ? "s"
            : ""}{" "}
          found
        </p>
      </div>

      {/* =========================
          EMPTY STATE
      ========================= */}

      {donations.length === 0 ? (

        <div className="rounded-xl bg-white p-10 text-center shadow">

          <div className="text-5xl">
            🍽️
          </div>

          <h2 className="mt-4 text-xl font-bold">
            No donations found
          </h2>

          <p className="mt-2 text-gray-500">
            Try changing your search or
            filters.
          </p>

          <button
            onClick={clearFilters}
            className="mt-6 rounded-lg bg-green-600 px-5 py-3 text-white hover:bg-green-700"
          >
            Clear Filters
          </button>

        </div>

      ) : (

        /* =========================
           DONATION GRID
        ========================= */

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {donations.map((donation) => (
            <NGODonationCard
              key={donation.id}
              donation={donation}
              onView={(donation) =>
                navigate(
                  `/ngo/donations/${donation.id}`
                )
              }
            />
          ))}

        </div>

      )}

    </DashboardLayout>
  );
}

export default AvailableDonations;