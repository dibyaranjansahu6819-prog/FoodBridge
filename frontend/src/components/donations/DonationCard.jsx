function DonationCard({
  donation,
  onEdit,
  onDelete,
}) {
  const statusColors = {
    AVAILABLE: "bg-green-100 text-green-700",
    RESERVED: "bg-yellow-100 text-yellow-700",
    COMPLETED: "bg-blue-100 text-blue-700",
    CANCELLED: "bg-red-100 text-red-700",
  };

  const formatDate = (date) => {
    if (!date) {
      return "Not specified";
    }

    return new Date(date).toLocaleString();
  };

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-md transition hover:shadow-lg">

      {/* =========================
          IMAGE
      ========================= */}

      {donation.image && (
        <img
          src={donation.image}
          alt={donation.food_name}
          className="h-48 w-full object-cover"
        />
      )}

      {/* =========================
          CONTENT
      ========================= */}

      <div className="p-6">

        {/* Header */}

        <div className="flex items-start justify-between gap-4">

          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {donation.food_name}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {donation.food_type} •{" "}
              {donation.food_category}
            </p>
          </div>

          {/* Status */}

          <span
            className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
              statusColors[donation.status] ||
              "bg-gray-100 text-gray-700"
            }`}
          >
            {donation.status}
          </span>

        </div>

        {/* Description */}

        {donation.description && (
          <p className="mt-4 text-sm text-gray-600">
            {donation.description}
          </p>
        )}

        {/* Details */}

        <div className="mt-5 space-y-3 text-sm">

          <div className="flex justify-between gap-4">
            <span className="text-gray-500">
              Quantity
            </span>

            <span className="font-medium text-gray-900">
              {donation.quantity}
            </span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="text-gray-500">
              Servings
            </span>

            <span className="font-medium text-gray-900">
              {donation.servings}
            </span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="text-gray-500">
              Pickup
            </span>

            <span className="text-right font-medium text-gray-900">
              {donation.pickup_address}
            </span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="text-gray-500">
              Pickup Time
            </span>

            <span className="text-right font-medium text-gray-900">
              {formatDate(
                donation.pickup_start_time
              )}
            </span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="text-gray-500">
              Expiry
            </span>

            <span className="text-right font-medium text-gray-900">
              {formatDate(
                donation.expiry_time
              )}
            </span>
          </div>

        </div>

        {/* Buttons */}

        <div className="mt-6 flex gap-3">

          <button
            onClick={() => onEdit(donation)}
            className="flex-1 rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white transition hover:bg-blue-700"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(donation.id)}
            className="flex-1 rounded-lg bg-red-600 px-4 py-2.5 font-medium text-white transition hover:bg-red-700"
          >
            Delete
          </button>

        </div>

      </div>
    </div>
  );
}

export default DonationCard;