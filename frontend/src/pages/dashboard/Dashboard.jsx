import { useQuery } from "@tanstack/react-query";

import DashboardLayout from "../../layouts/DashboardLayout";
import DashboardCard from "../../components/ui/DashboardCard";

import { getDashboardStats } from "../../services/dashboardService";

function Dashboard() {
  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: getDashboardStats,
  });

  if (isLoading) {
    return (
      <DashboardLayout>
        <h2 className="text-xl font-semibold">Loading dashboard...</h2>
      </DashboardLayout>
    );
  }

  if (isError) {
    return (
      <DashboardLayout>
        <h2 className="text-red-600 font-bold">
          {error.response?.data?.message || error.message}
        </h2>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <h1 className="mb-8 text-3xl font-bold">
        Dashboard
      </h1>

      <div className="grid gap-6 md:grid-cols-4">
        <DashboardCard
          title="Total Donations"
          value={data.total}
          color="text-green-600"
        />

        <DashboardCard
          title="Available"
          value={data.available}
          color="text-blue-600"
        />

        <DashboardCard
          title="Reserved"
          value={data.reserved}
          color="text-orange-500"
        />

        <DashboardCard
          title="Completed"
          value={data.completed}
          color="text-purple-600"
        />
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;