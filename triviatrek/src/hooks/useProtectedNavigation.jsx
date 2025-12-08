import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoginModal from "../components/LoginModal";

export const useProtectedNavigation = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [pendingPath, setPendingPath] = useState(null);

  useEffect(() => {
    if (isAuthenticated && pendingPath) {
      setShowModal(false);
      if (pendingPath.state) {
        navigate(pendingPath.path, { state: pendingPath.state });
      } else {
        navigate(pendingPath.path);
      }
      setPendingPath(null);
    }
  }, [isAuthenticated, pendingPath, navigate]);

  const navigateTo = (path, state = null) => {
    if (isAuthenticated) {
      if (state) {
        navigate(path, { state });
      } else {
        navigate(path);
      }
    } else {
      setPendingPath({ path, state });
      setShowModal(true);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setPendingPath(null);
  };

  const Modal = () => (
    <LoginModal isOpen={showModal} onClose={handleModalClose} />
  );

  return { navigateTo, Modal };
};

