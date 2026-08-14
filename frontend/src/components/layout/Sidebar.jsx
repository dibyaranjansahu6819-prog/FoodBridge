import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

function Sidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const linkClass = (path) =>
    `block rounded-lg px-4 py-3 transition ${
      isActive(path)
        ? "bg-white font-semibold text-green-700"
        : "text-white hover:bg-green-600"
    }`;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <aside className="flex h-screen w-64 flex-col bg-green-700 text-white">

      {/* =========================
          LOGO
      ========================= */}

      <div className="border-b border-green-600 px-5 py-6">
        <h1 className="text-2xl font-bold">
          FoodBridge
        </h1>

        <p className="mt-1 text-sm text-green-100">
          {user?.role === "NGO"
            ? "NGO Portal"
            : user?.role === "DONOR"
            ? "Donor Portal"
            : "Food Donation Platform"}
        </p>
      </div>

      {/* =========================
          NAVIGATION
      ========================= */}

      <nav className="flex flex-1 flex-col gap-2 p-5">

        {/* =========================
            NGO
        ========================= */}

        {user?.role === "NGO" && (
          <>
            <Link
              to="/ngo/dashboard"
              className={linkClass("/ngo/dashboard")}
            >
              🏠 Dashboard
            </Link>

            <Link
              to="/ngo/donations"
              className={linkClass("/ngo/donations")}
            >
              🍱 Available Donations
            </Link>

            <Link
              to="/ngo/reservations"
              className={linkClass("/ngo/reservations")}
            >
              📦 My Reservations
            </Link>
          </>
        )}

        {/* =========================
            DONOR
        ========================= */}

        {user?.role === "DONOR" && (
          <>
            <Link
              to="/dashboard"
              className={linkClass("/dashboard")}
            >
              🏠 Dashboard
            </Link>

            <Link
              to="/donations"
              className={linkClass("/donations")}
            >
              🍱 My Donations
            </Link>

            <Link
              to="/donations/create"
              className={linkClass("/donations/create")}
            >
              ➕ Create Donation
            </Link>

            {/* Reservation Requests */}

            <Link
              to="/donor/reservations"
              className={linkClass("/donor/reservations")}
            >
              📋 Reservation Requests
            </Link>
          </>
        )}

        {/* =========================
            PROFILE
        ========================= */}

        <Link
          to="/profile"
          className={linkClass("/profile")}
        >
          👤 Profile
        </Link>

        {/* =========================
            LOGOUT
        ========================= */}

        <button
          type="button"
          onClick={handleLogout}
          className="mt-auto rounded-lg px-4 py-3 text-left text-white transition hover:bg-red-600"
        >
          🚪 Logout
        </button>

      </nav>
    </aside>
  );
}

export default Sidebar;