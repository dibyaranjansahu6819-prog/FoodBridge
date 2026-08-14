import api from "../api/axios";

// =========================================================
// AVAILABLE DONATIONS
// =========================================================

export async function getAvailableDonations(params = {}) {
  const response = await api.get("donations/ngo/", {
    params,
  });

  return response.data;
}

// =========================================================
// SINGLE DONATION
// =========================================================

export async function getDonationDetails(id) {
  const response = await api.get(
    `donations/ngo/${id}/`
  );

  return response.data;
}

// =========================================================
// CREATE RESERVATION
// NGO
// =========================================================

export async function reserveDonation(donationId) {
  const response = await api.post(
    "reservations/",
    {
      donation_id: donationId,
    }
  );

  return response.data;
}

// =========================================================
// NGO RESERVATIONS
// =========================================================

export async function getMyReservations(params = {}) {
  const response = await api.get(
    "reservations/",
    {
      params,
    }
  );

  return response.data;
}

// =========================================================
// CANCEL
// NGO
// =========================================================

export async function cancelReservation(id) {
  const response = await api.post(
    `reservations/${id}/cancel/`
  );

  return response.data;
}

// =========================================================
// COMPLETE
// NGO
// =========================================================

export async function completeReservation(id) {
  const response = await api.post(
    `reservations/${id}/complete/`
  );

  return response.data;
}