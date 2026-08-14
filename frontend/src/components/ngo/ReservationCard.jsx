function ReservationCard({
  reservation,
  onCancel,
  onComplete,
}) {
  const donation = reservation?.donation;

  const imageUrl = donation?.image
    ? donation.image.startsWith("http")
      ? donation.image
      : `http://127.0.0.1:8000${donation.image}`
    : null;

  const statusStyles = {
    PENDING:
      "bg-yellow-100 text-yellow-700",

    CONFIRMED:
      "bg-green-100 text-green-700",

    CANCELLED:
      "bg-red-100 text-red-700",

    COMPLETED:
      "bg-blue-100 text-blue-700",
  };

  const formatDate = (date) => {
    if (!date) {
      return "Not specified";
    }

    const parsed = new Date(date);

    if (Number.isNaN(parsed.getTime())) {
      return "Not specified";
    }

    return parsed.toLocaleString();
  };

  const canCancel =
    reservation.status === "PENDING" ||
    reservation.status === "CONFIRMED";

  const canComplete =
    reservation.status === "CONFIRMED";

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-md transition hover:shadow-lg">
      {/* IMAGE */}

      <div className="h-64 w-full bg-gray-100">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={
              donation?.food_name ||
              "Food donation"
            }
            className="h-full w-full object-cover"
            onError={(event) => {
              event.currentTarget.style.display =
                "none";
            }}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400">
            No image available
          </div>
        )}
      </div>

      <div className="p-6">
        {/* HEADER */}

        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {donation?.food_name ||
                "Food Donation"}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {donation?.food_type || "N/A"}{" "}
              •{" "}
              {donation?.food_category || "N/A"}
            </p>
          </div>

          <span
            className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
              statusStyles[
                reservation.status
              ] ||
              "bg-gray-100 text-gray-700"
            }`}
          >
            {reservation.status ||
              "UNKNOWN"}
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
              donation?.quantity || "N/A"
            }
          />

          <Detail
            label="Servings"
            value={
              donation?.servings || "N/A"
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
            label="Contact Number"
            value={
              donation?.contact_number ||
              "N/A"
            }
          />

          <Detail
            label="Pickup Start"
            value={formatDate(
              donation?.pickup_start_time
            )}
          />

          <Detail
            label="Expiry"
            value={formatDate(
              donation?.expiry_time
            )}
          />

          <Detail
            label="Reserved At"
            value={formatDate(
              reservation.reserved_at
            )}
          />
        </div>

        {/* NOTES */}

        {donation?.notes && (
          <div className="mt-5 rounded-lg bg-gray-50 p-4">
            <p className="text-sm font-semibold text-gray-700">
              Notes
            </p>

            <p className="mt-1 text-sm text-gray-600">
              {donation.notes}
            </p>
          </div>
        )}

        {/* STATUS */}

        <div className="mt-5">
          {reservation.status ===
            "PENDING" && (
            <div className="rounded-lg bg-yellow-50 p-4 text-sm text-yellow-700">
              Waiting for the donor to confirm
              this reservation.
            </div>
          )}

          {reservation.status ===
            "CONFIRMED" && (
            <div className="rounded-lg bg-green-50 p-4 text-sm text-green-700">
              Reservation confirmed. You can
              arrange the food pickup.
            </div>
          )}

          {reservation.status ===
            "CANCELLED" && (
            <div className="rounded-lg bg-red-50 p-4 text-sm text-red-700">
              This reservation has been
              cancelled.
            </div>
          )}

          {reservation.status ===
            "COMPLETED" && (
            <div className="rounded-lg bg-blue-50 p-4 text-sm text-blue-700">
              This donation has been successfully
              completed.
            </div>
          )}
        </div>

        {/* BUTTONS */}

        {(canCancel || canComplete) && (
          <div className="mt-6 flex flex-wrap gap-3">
            {canCancel && (
              <button
                type="button"
                onClick={() =>
                  onCancel(reservation.id)
                }
                className="rounded-lg bg-red-600 px-5 py-2.5 font-semibold text-white transition hover:bg-red-700"
              >
                Cancel Reservation
              </button>
            )}

            {canComplete && (
              <button
                type="button"
                onClick={() =>
                  onComplete(reservation.id)
                }
                className="rounded-lg bg-green-600 px-5 py-2.5 font-semibold text-white transition hover:bg-green-700"
              >
                Complete Reservation
              </button>
            )}
          </div>
        )}
      </div>
    </div>
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

export default ReservationCard;