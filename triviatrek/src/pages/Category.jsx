import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

// Category groups mapping
const categoryGroups = {
  "General Knowledge": [9],
  "Entertainment": [10, 11, 12, 13, 14, 15, 16],
  "Science": [17, 18, 19],
  "Other Topics": [20, 21, 22, 23, 24],
};

// Pastel color map for all categories
const pastelColorMap = {
  9: "#e8f1ff",   // blue - General Knowledge
  10: "#fde8f3",  // pink - Books
  11: "#fff9cc",  // yellow - Film
  12: "#f0e8ff",  // purple - Music
  13: "#e8f1ff",  // blue - Theatre
  14: "#fde8f3",  // pink - TV
  15: "#fff9cc",  // yellow - Video Games
  16: "#f0e8ff",  // purple - Board Games
  17: "#ffe4cc",  // orange/peach - Science & Nature
  18: "#ffcccc",  // light red/pink - Computers
  19: "#ccffcc",  // light green - Mathematics
  20: "#e8f1ff",  // blue - Mythology
  21: "#f0e8ff",  // purple - Sports
  22: "#fff9cc",  // yellow - Geography
  23: "#ffe4cc",  // orange - History
  24: "#ffcccc",  // pink - Politics
};

// Image map
const imageMap = {
  9: "https://biznology.com/wp-content/uploads/2017/05/tree-200795_1920-1.jpg",
  10: "https://tse1.mm.bing.net/th/id/OIP.jeVfx14-a23XhQnKRmmwpAHaGe?pid=Api&P=0&h=180",
  11: "https://tse4.mm.bing.net/th/id/OIP.7EMi3QTS5dAc4I21E7-kIQHaEo?pid=Api&P=0&h=180",
  12: "https://tse3.mm.bing.net/th/id/OIP.ZNF_1EUqOflwbBvkA814zAHaFj?pid=Api&P=0&h=180",
  13: "https://tse1.mm.bing.net/th/id/OIP.JJy2qoDvltHpUXlh3rXwLQHaE7?pid=Api&P=0&h=180",
  14: "https://tse1.mm.bing.net/th/id/OIP.rXT36XGHuoKqAlejJaTkKgHaHG?pid=Api&P=0&h=180",
  15: "https://tse3.mm.bing.net/th/id/OIP.Me_OQNI91B-TD-KsE8vGpgHaE7?pid=Api&P=0&h=180",
  16: "https://tse2.mm.bing.net/th/id/OIP.kBEU4jcbAS7hcNrvC5DZDwHaE6?pid=Api&P=0&h=180",
  17: "https://tse1.mm.bing.net/th/id/OIP._SvPOTOk_JxRIHhGJFpKdwHaE8?pid=Api&P=0&h=180",
  18: "https://tse2.mm.bing.net/th/id/OIP.K4qyL8xLc8x_GY-mp7JfrQHaHa?pid=Api&P=0&h=180",
  19: "https://tse3.mm.bing.net/th/id/OIP.ubAcgBoHgEjkEZdkjGWBjwHaFj?pid=Api&P=0&h=180",
  20: "https://assets.editorial.aetnd.com/uploads/2023/03/Greek-mythology-gettyImages-1220052224.jpg",
  21: "https://tse1.mm.bing.net/th/id/OIP.zQ5g5nGZMzCJilxCgykhbwHaFH?pid=Api&P=0&h=180",
  22: "https://tse2.mm.bing.net/th/id/OIP.7amullyIpZi4_Exkjo32UQHaEo?pid=Api&P=0&h=180",
  23: "https://tse2.mm.bing.net/th/id/OIP.C0iWQ_R1WrnaYQp5kwNc_QHaEK?pid=Api&P=0&h=180",
  24: "https://tse1.mm.bing.net/th/id/OIP.X1MlKGrjrSiA_Ls64cooTAHaE7?pid=Api&P=0&h=180",
};

const normalizeImageUrl = (url = "") =>
  url.startsWith("hhttps") ? `https${url.slice(6)}` : url;

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [localCategories, setLocalCategories] = useState([]);
  const [localSubcategories, setLocalSubcategories] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [expandedGroups, setExpandedGroups] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [remote, localCats, localSubs] = await Promise.allSettled([
          axios.get("https://opentdb.com/api_category.php"),
          axios.get("http://localhost:3000/categories"),
          axios.get("http://localhost:3000/subcategories"),
        ]);

        if (remote.status === "fulfilled") {
          setCategories(remote.value.data?.trivia_categories || []);
        }

        if (localCats.status === "fulfilled") {
          setLocalCategories(localCats.value.data || []);
        }

        if (localSubs.status === "fulfilled") {
          setLocalSubcategories(localSubs.value.data || []);
        }
      } catch (err) {
        console.error("Failed to load categories:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Get General Knowledge category (id: 9)
  const generalKnowledge = useMemo(() => {
    return categories.find((cat) => cat.id === 9);
  }, [categories]);

  // Get Entertainment categories
  const entertainmentCategories = useMemo(() => {
    const all = categories.filter((cat) => categoryGroups["Entertainment"].includes(cat.id));
    const expanded = expandedGroups["Entertainment"];
    return expanded ? all : all.slice(0, 3);
  }, [categories, expandedGroups]);

  // Get Science categories
  const scienceCategories = useMemo(() => {
    return categories.filter((cat) => categoryGroups["Science"].includes(cat.id));
  }, [categories]);

  // Get Other Topics categories
  const otherTopicsCategories = useMemo(() => {
    const all = categories.filter((cat) => categoryGroups["Other Topics"].includes(cat.id));
    const expanded = expandedGroups["Other Topics"];
    return expanded ? all : all.slice(0, 3);
  }, [categories, expandedGroups]);

  // Community Categories
  const localCollections = useMemo(() => {
    return localCategories
      .map((cat) => {
        const allSubs = localSubcategories.filter(
          (sub) => sub.categoryId === cat.id
        );
        return { ...cat, subcategories: allSubs };
      })
      .filter((cat) => cat.subcategories.length > 0);
  }, [localCategories, localSubcategories]);

  // Enhanced search - searches both remote and local categories
  const filteredCategories = useMemo(() => {
    if (!search.trim()) return { remote: [], local: [] };
    const query = search.toLowerCase();
    
    const remoteResults = categories.filter((cat) =>
      cat.name.toLowerCase().includes(query)
    );

    const localResults = localSubcategories.filter((sub) =>
      sub.name.toLowerCase().includes(query) ||
      localCategories.find((cat) => cat.id === sub.categoryId)?.name.toLowerCase().includes(query)
    );

    return { remote: remoteResults, local: localResults };
  }, [categories, localCategories, localSubcategories, search]);

  const toggleExpand = (groupName) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupName]: !prev[groupName],
    }));
  };

  const getCategoryColor = (catId) => {
    return pastelColorMap[catId] || "#e8f1ff";
  };

  const getCategoryDisplayName = (cat) => {
    if (cat.id === 17) return "Science & Nature";
    if (cat.id === 18) return "Science: Computers";
    if (cat.id === 19) return "Science: Mathematics";
    if (cat.id >= 10 && cat.id <= 16) {
      return cat.name; // Keep full "Entertainment: X" format
    }
    return cat.name;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Explore Section */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
            Explore
          </h1>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search categories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            />
          </div>
        </div>

        {/* Show search results if searching */}
        {search.trim() ? (
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Search Results
            </h2>
            
            {/* Remote Categories Results */}
            {filteredCategories.remote.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Categories</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredCategories.remote.map((cat) => (
                    <motion.div
                      key={cat.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={() => navigate(`/Difficulty/${cat.id}`)}
                      className="rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 relative"
                      style={{ backgroundColor: getCategoryColor(cat.id) }}
                    >
                      {/* Image */}
                      {imageMap[cat.id] ? (
                        <div className="w-full h-36 relative overflow-hidden">
                          <img
                            src={imageMap[cat.id]}
                            alt={cat.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                          {/* Overlay text */}
                          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                            <span className="text-white font-bold text-base">
                              {getCategoryDisplayName(cat).replace("Entertainment: ", "").replace("Science: ", "").replace("Science & ", "")}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="w-full h-36 bg-white/60 flex items-center justify-center">
                          <span className="text-gray-400 text-sm font-medium">
                            {cat.name[0] || "C"}
                          </span>
                        </div>
                      )}

                      {/* Content */}
                      <div className="p-4">
                        <h3 className="text-sm font-bold text-gray-900 mb-1">
                          {getCategoryDisplayName(cat)}
                        </h3>
                        <p className="text-xs text-gray-600">
                          Tap to view quizzes
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Local Categories Results */}
            {filteredCategories.local.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Community Categories</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredCategories.local.map((sub) => {
                    const parentCat = localCategories.find((cat) => cat.id === sub.categoryId);
                    return (
                      <motion.div
                        key={sub.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        onClick={() =>
                          navigate(`/Difficulty/local-${sub.id}`, {
                            state: {
                              customMeta: {
                                categoryName: parentCat?.name || "Community",
                                subcategoryName: sub.name,
                                subCategoryId: sub.id,
                                categoryId: sub.categoryId,
                              },
                            },
                          })
                        }
                        className="rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 relative"
                        style={{ backgroundColor: sub.color || "#e8f1ff" }}
                      >
                        {/* Image */}
                        {sub.imageUrl && (
                          <div className="w-full h-36 relative overflow-hidden">
                            <img
                              src={normalizeImageUrl(sub.imageUrl)}
                              alt={sub.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                              }}
                            />
                            {/* Overlay text */}
                            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                              <span className="text-white font-bold text-base capitalize">
                                {sub.name}
                              </span>
                            </div>
                          </div>
                        )}

                        {/* Content */}
                        <div className="p-4">
                          <h3 className="text-sm font-bold text-gray-900 mb-1 capitalize">
                            {sub.name}
                          </h3>
                          <p className="text-xs text-gray-600">
                            {parentCat?.name || "Community"}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* No Results */}
            {filteredCategories.remote.length === 0 && filteredCategories.local.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg">
                  No categories found matching "{search}"
                </p>
              </div>
            )}
          </section>
        ) : (
          <>
            {/* General Knowledge Section */}
            {generalKnowledge && (
              <section className="mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  General Knowledge
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    onClick={() => navigate(`/Difficulty/${generalKnowledge.id}`)}
                    className="rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 relative"
                    style={{ backgroundColor: getCategoryColor(9) }}
                  >
                    {/* Image */}
                    {imageMap[9] ? (
                      <div className="w-full h-36 relative overflow-hidden">
                        <img
                          src={imageMap[9]}
                          alt={generalKnowledge.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                        {/* Overlay text */}
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                          <span className="text-white font-bold text-base">
                            {generalKnowledge.name}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-36 bg-white/60 flex items-center justify-center">
                        <span className="text-gray-400 text-sm font-medium">GK</span>
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-4">
                      <h3 className="text-sm font-bold text-gray-900 mb-1">
                        {generalKnowledge.name}
                      </h3>
                      <p className="text-xs text-gray-600">
                        Tap to view quizzes
                      </p>
                    </div>
                  </motion.div>
                </div>
              </section>
            )}

            {/* Entertainment Section */}
            {categories.filter((cat) => categoryGroups["Entertainment"].includes(cat.id)).length > 0 && (
              <section className="mb-16">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                    Entertainment
                  </h2>
                  {categories.filter((cat) => categoryGroups["Entertainment"].includes(cat.id)).length > 3 && (
                    <button
                      onClick={() => toggleExpand("Entertainment")}
                      className="text-purple-600 hover:text-purple-700 font-medium text-lg transition-colors"
                    >
                      {expandedGroups["Entertainment"] ? "Show Less" : "View All"}
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {entertainmentCategories.map((cat, index) => (
                    <motion.div
                      key={cat.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      onClick={() => navigate(`/Difficulty/${cat.id}`)}
                      className="rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 relative"
                      style={{ backgroundColor: getCategoryColor(cat.id) }}
                    >
                      {/* Image */}
                      {imageMap[cat.id] ? (
                        <div className="w-full h-36 relative overflow-hidden">
                          <img
                            src={imageMap[cat.id]}
                            alt={cat.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                          {/* Overlay text */}
                          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                            <span className="text-white font-bold text-base">
                              {getCategoryDisplayName(cat).replace("Entertainment: ", "")}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="w-full h-36 bg-white/60 flex items-center justify-center">
                          <span className="text-gray-400 text-sm font-medium">
                            {cat.name[0] || "E"}
                          </span>
                        </div>
                      )}

                      {/* Content */}
                      <div className="p-4">
                        <h3 className="text-sm font-bold text-gray-900 mb-1">
                          {getCategoryDisplayName(cat)}
                        </h3>
                        <p className="text-xs text-gray-600">
                          Tap to view quizzes
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {/* Science Section */}
            {scienceCategories.length > 0 && (
              <section className="mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Science
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {scienceCategories.map((cat, index) => (
                    <motion.div
                      key={cat.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      onClick={() => navigate(`/Difficulty/${cat.id}`)}
                      className="rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 relative"
                      style={{ backgroundColor: getCategoryColor(cat.id) }}
                    >
                      {/* Image */}
                      {imageMap[cat.id] ? (
                        <div className="w-full h-36 relative overflow-hidden">
                          <img
                            src={imageMap[cat.id]}
                            alt={cat.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                          {/* Overlay text */}
                          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                            <span className="text-white font-bold text-base">
                              {getCategoryDisplayName(cat).replace("Science: ", "").replace("Science & ", "")}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="w-full h-36 bg-white/60 flex items-center justify-center">
                          <span className="text-gray-400 text-sm font-medium">
                            {cat.name[0] || "S"}
                          </span>
                        </div>
                      )}

                      {/* Content */}
                      <div className="p-4">
                        <h3 className="text-sm font-bold text-gray-900 mb-1">
                          {getCategoryDisplayName(cat)}
                        </h3>
                        <p className="text-xs text-gray-600">
                          Tap to view quizzes
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {/* Other Topics Section */}
            {categories.filter((cat) => categoryGroups["Other Topics"].includes(cat.id)).length > 0 && (
              <section className="mb-16">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                    Other Topics
                  </h2>
                  {categories.filter((cat) => categoryGroups["Other Topics"].includes(cat.id)).length > 3 && (
                    <button
                      onClick={() => toggleExpand("Other Topics")}
                      className="text-purple-600 hover:text-purple-700 font-medium text-lg transition-colors"
                    >
                      {expandedGroups["Other Topics"] ? "Show Less" : "View All"}
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {otherTopicsCategories.map((cat, index) => (
                    <motion.div
                      key={cat.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      onClick={() => navigate(`/Difficulty/${cat.id}`)}
                      className="rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 relative"
                      style={{ backgroundColor: getCategoryColor(cat.id) }}
                    >
                      {/* Image */}
                      {imageMap[cat.id] ? (
                        <div className="w-full h-36 relative overflow-hidden">
                          <img
                            src={imageMap[cat.id]}
                            alt={cat.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                          {/* Overlay text */}
                          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                            <span className="text-white font-bold text-base">
                              {getCategoryDisplayName(cat)}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="w-full h-36 bg-white/60 flex items-center justify-center">
                          <span className="text-gray-400 text-sm font-medium">
                            {cat.name[0] || "O"}
                          </span>
                        </div>
                      )}

                      {/* Content */}
                      <div className="p-4">
                        <h3 className="text-sm font-bold text-gray-900 mb-1">
                          {getCategoryDisplayName(cat)}
                        </h3>
                        <p className="text-xs text-gray-600">
                          Tap to view quizzes
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {/* Community Categories Section */}
            {localCollections.length > 0 && (
              <section className="mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                  Community Categories
                </h2>

                {localCollections.map((cat, catIndex) => (
                  <motion.div
                    key={cat.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: catIndex * 0.1 }}
                    className="mb-12"
                  >
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">
                      {cat.name}
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {cat.subcategories.map((sub, index) => (
                        <motion.div
                          key={sub.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.05 }}
                          onClick={() =>
                            navigate(`/Difficulty/local-${sub.id}`, {
                              state: {
                                customMeta: {
                                  categoryName: cat.name,
                                  subcategoryName: sub.name,
                                  subCategoryId: sub.id,
                                  categoryId: sub.categoryId,
                                },
                              },
                            })
                          }
                          className="rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 relative"
                          style={{ backgroundColor: sub.color || "#e8f1ff" }}
                        >
                          {/* Image */}
                          {sub.imageUrl && (
                            <div className="w-full h-36 relative overflow-hidden">
                              <img
                                src={normalizeImageUrl(sub.imageUrl)}
                                alt={sub.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.currentTarget.style.display = "none";
                                }}
                              />
                              {/* Overlay text */}
                              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                <span className="text-white font-bold text-base capitalize">
                                  {sub.name}
                                </span>
                              </div>
                            </div>
                          )}

                          {/* Content */}
                          <div className="p-4">
                            <h4 className="text-sm font-bold text-gray-900 mb-1 capitalize">
                              {sub.name}
                            </h4>
                            <p className="text-xs text-gray-600">
                              Added by your team
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Category;
