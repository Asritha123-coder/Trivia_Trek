import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { X } from "lucide-react";

const LoginModal = ({ isOpen, onClose, initialTab = "login" }) => {
  const [tab, setTab] = useState(initialTab);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, signup, googleLogin, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      onClose();
    }
  }, [isAuthenticated, onClose]);

  // Google login handler
  const handleGoogle = async (response) => {
    try {
      setLoading(true);
      setError("");
      const token = response.credential;
      const userInfo = JSON.parse(atob(token.split(".")[1]));
      
      const result = await googleLogin(userInfo);
      if (result.success) {
        setSuccess("Login successful!");
        setTimeout(() => {
          onClose();
          window.location.reload();
        }, 500);
      } else {
        setError(result.error || "Google login failed");
      }
    } catch (error) {
      console.error("Google login error:", error);
      setError("Google login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && window.google) {
      const loginBtnId = tab === "login" ? "googleLoginBtn" : "googleSignupBtn";
      const container = document.getElementById(loginBtnId);
      if (container) {
        container.innerHTML = "";
        window.google.accounts.id.initialize({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          callback: handleGoogle,
        });
        window.google.accounts.id.renderButton(container, {
          theme: "outline",
          size: "large",
          width: "100%",
        });
      }
    }
  }, [isOpen, tab]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const email = e.target.email.value;
    const password = e.target.password.value;

    const result = await login(email, password);
    
    if (result.success) {
      setSuccess("Login successful!");
      setTimeout(() => {
        onClose();
        window.location.reload();
      }, 500);
    } else {
      setError(result.error || "Login failed");
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long!");
      setLoading(false);
      return;
    }

    const result = await signup(name, email, password);
    
    if (result.success) {
      setSuccess("Signup successful!");
      e.target.reset();
      setTimeout(() => {
        onClose();
        window.location.reload();
      }, 500);
    } else {
      setError(result.error || "Signup failed");
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl m-4 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <X size={24} />
        </button>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => {
              setTab("login");
              setError("");
              setSuccess("");
            }}
            className={`flex-1 py-4 px-6 font-semibold transition-colors ${
              tab === "login"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => {
              setTab("signup");
              setError("");
              setSuccess("");
            }}
            className={`flex-1 py-4 px-6 font-semibold transition-colors ${
              tab === "signup"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Sign Up
          </button>
        </div>

        <div className="p-8">
          {tab === "login" ? (
            <>
              <h2 className="text-3xl font-bold mb-2 text-center text-blue-700">
                Welcome Back
              </h2>
              <p className="text-center text-gray-500 mb-6">Login to TriviaTrek</p>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {success && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
                  {success}
                </div>
              )}

              <form className="flex flex-col gap-4" onSubmit={handleLogin}>
                <div>
                  <label htmlFor="login-email" className="block text-gray-700 font-medium mb-2">
                    Email
                  </label>
                  <input
                    id="login-email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                    required
                    disabled={loading}
                  />
                </div>

                <div>
                  <label htmlFor="login-password" className="block text-gray-700 font-medium mb-2">
                    Password
                  </label>
                  <input
                    id="login-password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                    required
                    disabled={loading}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </form>

              <div className="flex items-center my-6">
                <div className="flex-grow h-px bg-gray-300"></div>
                <span className="mx-3 text-gray-400 text-sm">or</span>
                <div className="flex-grow h-px bg-gray-300"></div>
              </div>

              <div id="googleLoginBtn" className="w-full mb-4 flex justify-center"></div>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold mb-2 text-center text-blue-700">
                Join TriviaTrek
              </h2>
              <p className="text-center text-gray-500 mb-6">Create your account</p>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {success && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
                  {success}
                </div>
              )}

              <form className="flex flex-col gap-4" onSubmit={handleSignup}>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Name</label>
                  <input
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    required
                    disabled={loading}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Email</label>
                  <input
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    required
                    disabled={loading}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Password</label>
                  <input
                    name="password"
                    type="password"
                    placeholder="Enter your password (min 6 characters)"
                    required
                    disabled={loading}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Confirm Password
                  </label>
                  <input
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    required
                    disabled={loading}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                >
                  {loading ? "Creating account..." : "Sign Up"}
                </button>
              </form>

              <div className="flex items-center my-6">
                <div className="flex-grow h-px bg-gray-300" />
                <span className="mx-3 text-gray-400 text-sm">or</span>
                <div className="flex-grow h-px bg-gray-300" />
              </div>

              <div id="googleSignupBtn" className="w-full mb-4 flex justify-center"></div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginModal;

