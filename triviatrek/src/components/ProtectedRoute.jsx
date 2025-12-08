import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import LoginModal from "./LoginModal";

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { isAuthenticated, userRole, loading } = useAuth();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      setShowModal(true);
    } else if (isAuthenticated) {
      setShowModal(false);
    }
  }, [loading, isAuthenticated]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        <LoginModal isOpen={showModal} onClose={() => setShowModal(false)} />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-gray-600 mb-4">Please login to access this page</p>
          </div>
        </div>
      </>
    );
  }

  if (requireAdmin && userRole !== "admin") {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-red-600 text-lg">Access denied. Admin privileges required.</p>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
