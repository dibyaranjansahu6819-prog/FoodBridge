import { useAuth } from "../../contexts/AuthContext";

function Navbar() {
  const { user } = useAuth();

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6 shadow-sm">
      <h1 className="text-2xl font-bold text-green-600">
        FoodBridge
      </h1>

      <div className="text-right">
        <p className="font-semibold">
          {user?.full_name}
        </p>

        <p className="text-sm text-gray-500">
          {user?.role}
        </p>
      </div>
    </header>
  );
}

export default Navbar;