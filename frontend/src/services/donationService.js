import api from "../api/axios";

// Get all donations
export async function getDonations(params = {}) {
  const response = await api.get("donations/", {
    params,
  });

  return response.data;
}

// Get a single donation
export async function getDonation(id) {
  const response = await api.get(`donations/${id}/`);

  return response.data;
}

// Create donation
export async function createDonation(data) {
  const response = await api.post(
    "donations/",
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
}

// Update donation
export async function updateDonation(id, data) {
  const response = await api.put(
    `donations/${id}/`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
}

// Delete donation
export async function deleteDonation(id) {
  const response = await api.delete(
    `donations/${id}/`
  );

  return response.data;
}