import { useEffect, useState } from "react";
import axios from "axios";
import { CheckCircle, XCircle, Plus, Loader, Sparkles, Image as ImageIcon, Palette } from "lucide-react";
import Toast from "../../components/Toast";

const AddSubCategory = () => {
  const [categories, setCategories] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [toast, setToast] = useState({ isOpen: false, message: "", type: "success" });

  const [form, setForm] = useState({
    name: "",
    categoryId: "",
    imageUrl: "",
    color: "#F0F9FF",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const localRes = await axios.get("http://localhost:3000/categories");
        setCategories(localRes.data || []);
      } catch (err) {
        console.error("Error loading categories:", err);
        setMessage("Failed to load categories. Please check your server.");
        setMessageType("error");
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (message) {
      setMessage("");
      setMessageType("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      setMessage("Please enter a subcategory name.");
      setMessageType("error");
      return;
    }

    if (!form.categoryId) {
      setMessage("Please select a category.");
      setMessageType("error");
      return;
    }

    if (!form.imageUrl.trim()) {
      setMessage("Please provide an image URL.");
      setMessageType("error");
      return;
    }

    try {
      setSubmitting(true);
      setMessage("");
      setMessageType("");

      await axios.post("http://localhost:3000/subcategories", form);

      setToast({ isOpen: true, message: `Subcategory "${form.name.trim()}" successfully added!`, type: "success" });

      setForm({
        name: "",
        categoryId: "",
        imageUrl: "",
        color: "#F0F9FF",
      });

      setMessage("");
      setMessageType("");
    } catch (err) {
      console.error(err);
      setMessage("Failed to add subcategory. Ensure server is running.");
      setMessageType("error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="text-indigo-500" size={28} />
          <h1 className="text-3xl font-bold text-gray-900">Add New Subcategory</h1>
        </div>
        <p className="text-gray-600 text-lg">
          Create a subcategory under an existing category to organize your quizzes
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {message && (
          <div
            className={`m-6 p-4 rounded-xl flex items-center gap-3 ${
              messageType === "success"
                ? "bg-green-50 border border-green-200 text-green-700"
                : "bg-red-50 border border-red-200 text-red-700"
            }`}
          >
            {messageType === "success" ? (
              <CheckCircle size={20} className="flex-shrink-0" />
            ) : (
              <XCircle size={20} className="flex-shrink-0" />
            )}
            <span className="text-sm font-medium">{message}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
          {/* Form Section */}
          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
            {/* Subcategory Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Subcategory Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="e.g., World History, Quantum Physics, Modern Art"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-gray-900 placeholder-gray-400 text-base"
                required
              />
            </div>

            {/* Select Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Parent Category
              </label>
              <select
                name="categoryId"
                value={form.categoryId}
                onChange={handleChange}
                className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-gray-900 text-base"
                required
              >
                <option value="">Select a Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <ImageIcon size={18} className="text-gray-500" />
                Image URL
              </label>
              <input
                type="url"
                name="imageUrl"
                placeholder="https://example.com/image.png"
                value={form.imageUrl}
                onChange={handleChange}
                className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-gray-900 placeholder-gray-400 text-base"
                required
              />
            </div>

            {/* Color Picker */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <Palette size={18} className="text-gray-500" />
                Card Background Color
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="color"
                  name="color"
                  value={form.color}
                  onChange={handleChange}
                  className="h-14 w-20 border-2 border-gray-200 rounded-xl cursor-pointer"
                />
                <input
                  type="text"
                  name="color"
                  value={form.color}
                  placeholder="#F0F9FF"
                  onChange={handleChange}
                  className="flex-1 px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-gray-900 text-base"
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Choose a color for the subcategory card background
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <Loader size={18} className="animate-spin" />
                    Adding...
                  </>
                ) : (
                  <>
                    <Plus size={18} />
                    Add Subcategory
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => {
                  setForm({
                    name: "",
                    categoryId: "",
                    imageUrl: "",
                    color: "#F0F9FF",
                  });
                  setMessage("");
                  setMessageType("");
                }}
                disabled={submitting}
                className="px-6 py-3.5 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Clear
              </button>
            </div>
          </form>

          {/* Live Preview */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <div className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <Sparkles size={18} className="text-indigo-500" />
                Live Preview
              </div>
              <div
                className="rounded-2xl shadow-lg border-2 border-gray-200 overflow-hidden transition-all"
                style={{ backgroundColor: form.color }}
              >
                <div className="p-6">
                  {/* Image */}
                  <div className="w-full h-40 bg-white/60 rounded-xl flex items-center justify-center overflow-hidden mb-4 border border-white/40">
                    {form.imageUrl ? (
                      <img
                        src={form.imageUrl}
                        alt="preview"
                        className="max-h-full max-w-full object-contain"
                        onError={(e) => (e.currentTarget.style.display = "none")}
                      />
                    ) : (
                      <span className="text-sm text-gray-500">Image Preview</span>
                    )}
                  </div>

                  {/* Name */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {form.name || "Subcategory Name"}
                  </h3>

                  {/* Category Label */}
                  <p className="text-sm text-gray-600">
                    {form.categoryId
                      ? `Category: ${categories.find((c) => c.id == form.categoryId)?.name || "Unknown"}`
                      : "No category selected"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      <Toast
        isOpen={toast.isOpen}
        onClose={() => setToast({ ...toast, isOpen: false })}
        message={toast.message}
        type={toast.type}
      />
    </div>
  );
};

export default AddSubCategory;
