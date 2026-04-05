import React, { createContext, useState, useEffect } from "react";
import { loginUser, signupUser } from "../api/authApi";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  /////////////////////////////////////////
  // Load user from token (optional)
  /////////////////////////////////////////
  useEffect(() => {
    if (token) {
      setUser({}); // you can fetch profile later
    }
  }, [token]);

  /////////////////////////////////////////
  // LOGIN
  /////////////////////////////////////////
  const login = async (email, password) => {
    try {
      const res = await loginUser({ email, password });

      const { token, user } = res.data;

      localStorage.setItem("token", token);

      setToken(token);
      setUser(user);

      return { success: true };
    } catch (err) {
      if (err.response?.status === 429) {
        return {
          success: false,
          message: "Too many attempts. Try again later.",
          type: "rate_limit"
        };
      }

      if (err.response?.status === 401) {
        return {
          success: false,
          message: err.response.data.error || "Invalid credentials",
          attemptsLeft: err.response.data.attempts_left,
          type: "invalid"
        };
      }

      return {
        success: false,
        message: "Something went wrong"
      };
    }
  };

  /////////////////////////////////////////
  // SIGNUP
  /////////////////////////////////////////
  const signup = async (data) => {
    try {
      const res = await signupUser(data);

      const { token, user } = res.data;

      localStorage.setItem("token", token);

      setToken(token);
      setUser(user);

      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: "Signup failed"
      };
    }
  };

  /////////////////////////////////////////
  // LOGOUT
  /////////////////////////////////////////
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        signup,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;