import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import DashboardLayout from "../../layouts/DashboardLayout";
import { createDonation } from "../../services/donationService";

function CreateDonation() {
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
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

      await createDonation(data);

      toast.success("Donation created successfully!");

      navigate("/donations");
    } catch (error) {
      console.error(
        "Create donation error:",
        error.response?.data || error.message
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to create donation."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold">
          Create Donation
        </h1>

        <p className="mt-2 text-gray-500">
          Share surplus food with people who need it.
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
              placeholder="Example: Veg Biryani"
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
              placeholder="Describe the food..."
              className="w-full rounded-lg border p-3"
            />
          </div>

          {/* Food Type + Category */}
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

          {/* Quantity + Servings */}
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
                placeholder="Example: 20 Meals"
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
                placeholder="20"
                className="w-full rounded-lg border p-3"
              />
            </div>
          </div>

          {/* Pickup + Expiry */}
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
              placeholder="Bhubaneswar"
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
              placeholder="9876543210"
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
              placeholder="Additional information..."
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
  onChange={(event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    // Validate file type
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

    // Validate file size: maximum 5 MB
    if (file.size > 5 * 1024 * 1024) {
      toast.error(
        "Image size must be less than 5 MB."
      );

      event.target.value = "";
      return;
    }

    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  }}
  className="w-full rounded-lg border p-3"
/>
{imagePreview && (
  <div className="mt-4">
    <img
      src={imagePreview}
      alt="Food preview"
      className="h-48 w-full rounded-lg object-cover"
    />

    <button
      type="button"
      onClick={() => {
        setImage(null);
        setImagePreview(null);
      }}
      className="mt-3 rounded-lg bg-red-100 px-4 py-2 text-red-600 hover:bg-red-200"
    >
      Remove Image
    </button>
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
                ? "Creating..."
                : "Create Donation"}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}

export default CreateDonation;