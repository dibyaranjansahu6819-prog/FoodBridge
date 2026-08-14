import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import DashboardLayout from "../../layouts/DashboardLayout";
import {
  getDonation,
  updateDonation,
} from "../../services/donationService";

function EditDonation() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    food_name: "",
    description: "",
    food_type: "VEG",
    food_category: "COOKED",
    quantity: "",
    servings: "",
    pickup_start_time: "",
    expiry_time: "",
    pickup_address: "",
    contact_number: "",
    notes: "",
  });

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function loadDonation() {
      try {
        const donation = await getDonation(id);

        setFormData({
          food_name: donation.food_name || "",
          description: donation.description || "",
          food_type: donation.food_type || "VEG",
          food_category:
            donation.food_category || "COOKED",
          quantity: donation.quantity || "",
          servings: donation.servings || "",
          pickup_start_time:
            donation.pickup_start_time
              ? donation.pickup_start_time.slice(0, 16)
              : "",
          expiry_time:
            donation.expiry_time
              ? donation.expiry_time.slice(0, 16)
              : "",
          pickup_address:
            donation.pickup_address || "",
          contact_number:
            donation.contact_number || "",
          notes: donation.notes || "",
        });

        if (donation.image) {
          setImagePreview(donation.image);
        }
      } catch (error) {
        console.error(
          "Load donation error:",
          error.response?.data || error.message
        );

        toast.error("Failed to load donation.");
      } finally {
        setIsLoading(false);
      }
    }

    loadDonation();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      toast.error(
        "Only JPG, PNG, and WEBP images are allowed."
      );

      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error(
        "Image size must be less than 5 MB."
      );

      event.target.value = "";
      return;
    }

    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsSubmitting(true);

    try {
      const data = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });

      if (image) {
        data.append("image", image);
      }

      await updateDonation(id, data);

      toast.success("Donation updated successfully!");

      navigate("/donations");
    } catch (error) {
      console.error(
        "Update donation error:",
        error.response?.data || error.message
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to update donation."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <h2 className="text-xl font-semibold">
          Loading donation...
        </h2>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold">
          Edit Donation
        </h1>

        <p className="mt-2 text-gray-500">
          Update your donation information.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 rounded-xl bg-white p-8 shadow"
        >
          {/* Food Name */}
          <div className="mb-5">
            <label className="mb-2 block font-medium">
              Food Name
            </label>

            <input
              name="food_name"
              value={formData.food_name}
              onChange={handleChange}
              required
              className="w-full rounded-lg border p-3"
            />
          </div>

          {/* Description */}
          <div className="mb-5">
            <label className="mb-2 block font-medium">
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full rounded-lg border p-3"
            />
          </div>

          {/* Type / Category */}
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block font-medium">
                Food Type
              </label>

              <select
                name="food_type"
                value={formData.food_type}
                onChange={handleChange}
                className="w-full rounded-lg border p-3"
              >
                <option value="VEG">Vegetarian</option>
                <option value="NON_VEG">
                  Non-Vegetarian
                </option>
              </select>
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Food Category
              </label>

              <select
                name="food_category"
                value={formData.food_category}
                onChange={handleChange}
                className="w-full rounded-lg border p-3"
              >
                <option value="COOKED">Cooked</option>
                <option value="PACKAGED">Packaged</option>
                <option value="RAW">Raw</option>
              </select>
            </div>
          </div>

          {/* Quantity / Servings */}
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block font-medium">
                Quantity
              </label>

              <input
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
                className="w-full rounded-lg border p-3"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Servings
              </label>

              <input
                name="servings"
                type="number"
                min="1"
                value={formData.servings}
                onChange={handleChange}
                required
                className="w-full rounded-lg border p-3"
              />
            </div>
          </div>

          {/* Pickup / Expiry */}
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block font-medium">
                Pickup Start Time
              </label>

              <input
                name="pickup_start_time"
                type="datetime-local"
                value={formData.pickup_start_time}
                onChange={handleChange}
                required
                className="w-full rounded-lg border p-3"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Expiry Time
              </label>

              <input
                name="expiry_time"
                type="datetime-local"
                value={formData.expiry_time}
                onChange={handleChange}
                required
                className="w-full rounded-lg border p-3"
              />
            </div>
          </div>

          {/* Address */}
          <div className="mt-5">
            <label className="mb-2 block font-medium">
              Pickup Address
            </label>

            <input
              name="pickup_address"
              value={formData.pickup_address}
              onChange={handleChange}
              required
              className="w-full rounded-lg border p-3"
            />
          </div>

          {/* Contact */}
          <div className="mt-5">
            <label className="mb-2 block font-medium">
              Contact Number
            </label>

            <input
              name="contact_number"
              value={formData.contact_number}
              onChange={handleChange}
              required
              className="w-full rounded-lg border p-3"
            />
          </div>

          {/* Notes */}
          <div className="mt-5">
            <label className="mb-2 block font-medium">
              Notes
            </label>

            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="3"
              className="w-full rounded-lg border p-3"
            />
          </div>

          {/* Image */}
          <div className="mt-5">
            <label className="mb-2 block font-medium">
              Food Image
            </label>

            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImageChange}
              className="w-full rounded-lg border p-3"
            />

            {imagePreview && (
              <div className="mt-4">
                <img
                  src={imagePreview}
                  alt="Food preview"
                  className="h-48 w-full rounded-lg object-cover"
                />
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="mt-8 flex gap-4">
            <button
              type="button"
              onClick={() => navigate("/donations")}
              className="rounded-lg border px-6 py-3"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg bg-green-600 px-6 py-3 text-white hover:bg-green-700 disabled:opacity-50"
            >
              {isSubmitting
                ? "Saving..."
                : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}

export default EditDonation;