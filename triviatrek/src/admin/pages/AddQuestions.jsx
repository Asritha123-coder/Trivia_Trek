import { useEffect, useState } from "react";
import axios from "axios";
import { CheckCircle, XCircle, Plus, Loader, Sparkles, FileQuestion, CheckCircle2 } from "lucide-react";
import Toast from "../../components/Toast";

const AddQuestions = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [selectedlevel, setlevel] = useState("");
  const [questionCount, setQuestionCount] = useState(1);
  const [questions, setQuestions] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState({ isOpen: false, message: "", type: "success" });

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:3000/categories");
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setMessage("Failed to load categories");
      setMessageType("error");
    }
  };

  const fetchSubcategories = async (categoryId) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/subcategories?categoryId=${categoryId}`
      );
      setSubcategories(res.data);
    } catch (err) {
      console.error("Error fetching subcategories:", err);
      setMessage("Failed to load subcategories");
      setMessageType("error");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetchSubcategories(selectedCategory);
      setSelectedSubCategory("");
    }
  }, [selectedCategory]);

  const handleCountChange = (e) => {
    const value = Number(e.target.value);
    if (value < 1) return;
    setQuestionCount(value);

    const qn = Array.from({ length: value }, () => ({
      question: "",
      optionA: "",
      optionB: "",
      optionC: "",
      optionD: "",
      correct: "",
    }));

    setQuestions(qn);
  };

  const handleQuestionChange = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedCategory || !selectedSubCategory) {
      setMessage("Please select category and subcategory");
      setMessageType("error");
      return;
    }

    if (!selectedlevel) {
      setMessage("Please select a difficulty level");
      setMessageType("error");
      return;
    }

    // Validate all questions are filled
    const incomplete = questions.some(
      (q) =>
        !q.question.trim() ||
        !q.optionA.trim() ||
        !q.optionB.trim() ||
        !q.optionC.trim() ||
        !q.optionD.trim() ||
        !q.correct
    );

    if (incomplete) {
      setMessage("Please fill in all fields for all questions");
      setMessageType("error");
      return;
    }

    try {
      setSubmitting(true);
      setMessage("");
      setMessageType("");

      await axios.post("http://localhost:3000/questions", {
        categoryId: selectedCategory,
        subCategoryId: selectedSubCategory,
        level: selectedlevel,
        questions,
      });

      setToast({ isOpen: true, message: `${questionCount} question${questionCount !== 1 ? "s" : ""} successfully added!`, type: "success" });
      setMessage("");
      setMessageType("");

      // Reset form
      setSelectedCategory("");
      setSelectedSubCategory("");
      setlevel("");
      setQuestionCount(1);
      setQuestions([{ question: "", optionA: "", optionB: "", optionC: "", optionD: "", correct: "" }]);

      setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 3000);
    } catch (error) {
      console.error("Error adding questions:", error);
      setMessage("Failed to add questions. Please try again.");
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
          <h1 className="text-3xl font-bold text-gray-900">Add Questions</h1>
        </div>
        <p className="text-gray-600 text-lg">
          Create quiz questions by selecting a category, subcategory, and difficulty level
        </p>
      </div>

      {/* Message */}
      {message && (
        <div
          className={`p-4 rounded-xl flex items-center gap-3 ${
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

      {/* Form Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
        {/* Selection Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 pb-8 border-b border-gray-200">
          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Category
            </label>
            <select
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-gray-900 text-base"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Subcategory */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Subcategory
            </label>
            <select
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-gray-900 text-base disabled:bg-gray-50 disabled:cursor-not-allowed"
              value={selectedSubCategory}
              onChange={(e) => setSelectedSubCategory(e.target.value)}
              disabled={!selectedCategory}
            >
              <option value="">Select Subcategory</option>
              {subcategories.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.name}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty Level */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Difficulty Level
            </label>
            <select
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-gray-900 text-base"
              value={selectedlevel}
              onChange={(e) => setlevel(e.target.value)}
            >
              <option value="">Select Level</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          {/* Question Count */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Number of Questions
            </label>
            <input
              type="number"
              min="1"
              max="20"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-gray-900 text-base"
              value={questionCount}
              onChange={handleCountChange}
            />
          </div>
        </div>

        {/* Dynamic Question Forms */}
        <div className="space-y-6">
          {questions.map((q, index) => (
            <div
              key={index}
              className="border-2 border-gray-200 rounded-2xl p-6 bg-gradient-to-br from-gray-50 to-white shadow-sm"
            >
              <div className="flex items-center gap-2 mb-6">
                <FileQuestion className="text-indigo-500" size={20} />
                <h2 className="text-lg font-bold text-gray-900">Question {index + 1}</h2>
              </div>

              <div className="space-y-4">
                {/* Question Text */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Question Text
                  </label>
                  <textarea
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-gray-900 placeholder-gray-400 text-base resize-none"
                    placeholder="Enter your question here..."
                    rows="3"
                    value={q.question}
                    onChange={(e) =>
                      handleQuestionChange(index, "question", e.target.value)
                    }
                  />
                </div>

                {/* Options Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Option A
                    </label>
                    <input
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-gray-900 placeholder-gray-400 text-base"
                      placeholder="Option A"
                      value={q.optionA}
                      onChange={(e) =>
                        handleQuestionChange(index, "optionA", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Option B
                    </label>
                    <input
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-gray-900 placeholder-gray-400 text-base"
                      placeholder="Option B"
                      value={q.optionB}
                      onChange={(e) =>
                        handleQuestionChange(index, "optionB", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Option C
                    </label>
                    <input
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-gray-900 placeholder-gray-400 text-base"
                      placeholder="Option C"
                      value={q.optionC}
                      onChange={(e) =>
                        handleQuestionChange(index, "optionC", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Option D
                    </label>
                    <input
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-gray-900 placeholder-gray-400 text-base"
                      placeholder="Option D"
                      value={q.optionD}
                      onChange={(e) =>
                        handleQuestionChange(index, "optionD", e.target.value)
                      }
                    />
                  </div>
                </div>

                {/* Correct Answer */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <CheckCircle2 size={18} className="text-green-500" />
                    Correct Answer
                  </label>
                  <select
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-gray-900 text-base"
                    value={q.correct}
                    onChange={(e) =>
                      handleQuestionChange(index, "correct", e.target.value)
                    }
                  >
                    <option value="">Select Correct Answer</option>
                    <option value="A">Option A</option>
                    <option value="B">Option B</option>
                    <option value="C">Option C</option>
                    <option value="D">Option D</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={handleSubmit}
            disabled={submitting || questions.length === 0}
            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <>
                <Loader size={18} className="animate-spin" />
                Submitting Questions...
              </>
            ) : (
              <>
                <Plus size={18} />
                Submit {questionCount} Question{questionCount !== 1 ? "s" : ""}
              </>
            )}
          </button>
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

export default AddQuestions;
