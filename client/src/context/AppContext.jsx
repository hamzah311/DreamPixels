import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [credit, setCredit] = useState(0);
  const [loading, setLoading] = useState(true);

  // Safer token initialization (avoid stale/invalid tokens)
  const storedToken = localStorage.getItem("token");
  const [token, setTokenState] = useState(
    storedToken && storedToken !== "null" ? storedToken : ""
  );

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  // Centralized clear function
  const clearAuth = () => {
    localStorage.removeItem("token");
    setTokenState("");
    setUser(null);
    setCredit(0);
  };

  // Secure way to set token and reload user
  const saveToken = async (newToken) => {
    if (!newToken) return clearAuth();
    localStorage.setItem("token", newToken);
    setTokenState(newToken);
    await loadCreditsData(newToken);
  };

  // Load user and credit info, verifying token validity
  const loadCreditsData = async (tkn = token) => {
    if (!tkn) return;

    setLoading(true);
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/credits`, {
        headers: { Authorization: `Bearer ${tkn}` },
      });

      console.log("Credits API response:", data); // Debug

      if (data.success) {
        setCredit(data.credits ?? 0);
        setUser(data.user ?? null);
      } else {
        toast.error(data.message || "Failed to load user data");
        clearAuth(); // Invalid token → logout
      }
    } catch (error) {
      console.error("Credits error:", error);
      const status = error.response?.status;
      if (status === 401 || status === 403) {
        // Auto logout if unauthorized
        clearAuth();
        toast.error("Session expired, please log in again");
      } else {
        toast.error(error.response?.data?.message || error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // Generate image and update credits
  const generateImage = async (prompt) => {
    if (!token) {
      toast.error("Login first");
      return;
    }

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/image/generate-image`,
        { prompt },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        loadCreditsData(); // update Navbar
        return data.resultImage;
      } else {
        toast.error(data.message);
        loadCreditsData();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // Updated logout for full cleanup
  const logout = () => {
    clearAuth();
    toast.info("Logged out");
    navigate("/"); // optional: redirect to home/login
  };

  // Verify token every time app loads
  useEffect(() => {
    if (token) {
      loadCreditsData(token);
    } else {
      clearAuth();
    }
  }, []);

  const value = {
    user,
    setUser,
    showLogin,
    setShowLogin,
    token,
    setToken: saveToken, // Ensures proper handling
    credit,
    setCredit,
    loading,
    loadCreditsData,
    generateImage,
    logout,
    backendUrl,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
