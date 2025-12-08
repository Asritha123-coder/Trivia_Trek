import React, { useState } from "react";
import axios from "axios";
import { CheckCircle, XCircle, Plus, Loader, Sparkles } from "lucide-react";
import Toast from "../../components/Toast";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ isOpen: false, message: "", type: "success" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setMessageType("");

    if (!name.trim()) {
      setMessage("Category name is required");
      setMessageType("error");
      return;
    }

    if (name.trim().length < 3) {
      setMessage("Category name must be at least 3 characters long");
      setMessageType("error");
      return;
    }

    setLoading(true);

    try {
      await axios.post("http://localhost:3000/categories", { name: name.trim() });
      setToast({ isOpen: true, message: `Category "${name.trim()}" successfully added!`, type: "success" });
      setName("");
      setMessage("");
      setMessageType("");
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || "Error adding category. Please try again.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="text-indigo-500" size={28} />
          <h1 className="text-3xl font-bold text-gray-900">Add New Category</h1>
        </div>
        <p className="text-gray-600 text-lg">
          Create a new category to organize your quizzes and content
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
        {message && (
          <div
            className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${
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

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="categoryName"
              className="block text-sm font-semibold text-gray-700 mb-3"
            >
              Category Name
            </label>
            <input
              id="categoryName"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (message) {
                  setMessage("");
                  setMessageType("");
                }
              }}
              placeholder="e.g., Science, History, Sports, Technology"
              className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-gray-900 placeholder-gray-400 text-base"
              required
              disabled={loading}
              minLength={3}
            />
            <p className="mt-2 text-sm text-gray-500">
              Enter a descriptive name for your category (minimum 3 characters)
            </p>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading || !name.trim()}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-md"
            >
              {loading ? (
                <>
                  <Loader size={18} className="animate-spin" />
                  Adding...
                </>
              ) : (
                <>
                  <Plus size={18} />
                  Add Category
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => {
                setName("");
                setMessage("");
                setMessageType("");
              }}
              disabled={loading}
              className="px-6 py-3.5 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Clear
            </button>
          </div>
        </form>
      </div>

      {/* Info Card */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-xl p-6">
        <p className="text-sm text-indigo-800">
          <strong className="font-semibold">💡 Tip:</strong> Categories help organize your quizzes. 
          Use clear, descriptive names that users will easily understand. Once created, you can add 
          subcategories and questions to each category.
        </p>
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

export default AddCategory;
