function NGODonationCard({ donation, onView }) {
  const statusColors = {
    AVAILABLE: "bg-green-100 text-green-700",
    RESERVED: "bg-yellow-100 text-yellow-700",
    COMPLETED: "bg-blue-100 text-blue-700",
    EXPIRED: "bg-red-100 text-red-700",
  };

  const formatDate = (date) => {
    if (!date) {
      return "Not specified";
    }

    return new Date(date).toLocaleString();
  };

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-md transition hover:shadow-lg">

      {/* Image */}

      {donation.image ? (
        <img
          src={donation.image}
          alt={donation.food_name}
          className="h-48 w-full object-cover"
        />
      ) : (
        <div className="flex h-48 items-center justify-center bg-gray-100">
          <span className="text-5xl">
            🍽️
          </span>
        </div>
      )}

      {/* Content */}

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
          <p className="mt-4 line-clamp-2 text-sm text-gray-600">
            {donation.description}
          </p>
        )}

        {/* Details */}

        <div className="mt-5 space-y-3 text-sm">

          <div className="flex justify-between gap-4">
            <span className="text-gray-500">
              Quantity
            </span>

            <span className="font-medium">
              {donation.quantity}
            </span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="text-gray-500">
              Servings
            </span>

            <span className="font-medium">
              {donation.servings}
            </span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="text-gray-500">
              Pickup
            </span>

            <span className="text-right font-medium">
              {donation.pickup_address}
            </span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="text-gray-500">
              Pickup Time
            </span>

            <span className="text-right font-medium">
              {formatDate(
                donation.pickup_start_time
              )}
            </span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="text-gray-500">
              Expires
            </span>

            <span className="text-right font-medium">
              {formatDate(
                donation.expiry_time
              )}
            </span>
          </div>

        </div>

        {/* Button */}

        <button
          onClick={() => onView(donation)}
          className="mt-6 w-full rounded-lg bg-green-600 px-4 py-3 font-medium text-white transition hover:bg-green-700"
        >
          View Details
        </button>

      </div>
    </div>
  );
}

export default NGODonationCard;