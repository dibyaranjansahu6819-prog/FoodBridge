import api from "../api/axios";

// =========================================================
// DONOR RESERVATION REQUESTS
// =========================================================

export async function getReservationRequests(
  params = {}
) {
  const response = await api.get(
    "reservations/",
    {
      params,
    }
  );

  return response.data;
}

// =========================================================
// CONFIRM
// =========================================================

export async function confirmReservation(id) {
  const response = await api.post(
    `reservations/${id}/confirm/`
  );

  return response.data;
}

// =========================================================
// REJECT
// =========================================================

export async function rejectReservation(id) {
  const response = await api.post(
    `reservations/${id}/reject/`
  );

  return response.data;
}