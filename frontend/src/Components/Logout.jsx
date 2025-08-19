import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import { toast } from "react-toastify";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expiry");
    toast.success("Logout successful");
    navigate("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    let decoded;
    try {
      decoded = jwtDecode(token);
    } catch (err) {
      handleLogout();
      return;
    }

    const expiry = decoded.exp * 1000;
    const now = Date.now();
    const timeout = expiry - now;

    if (timeout <= 0) {
      handleLogout();
    } else {
      const timer = setTimeout(() => {
        toast.error("Session Expired! Please login again.");
        handleLogout();
      }, timeout);

      return () => clearTimeout(timer);
    }
  }, []);

  return null;
};

export default Logout;
