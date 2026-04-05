import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useContext(AuthContext); // ✅ use context
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [attemptsLeft, setAttemptsLeft] = useState(null);
  const [blocked, setBlocked] = useState(false);
  const [loading, setLoading] = useState(false);

  /////////////////////////////////////////
  // SUBMIT
  /////////////////////////////////////////
  const submit = async () => {
    if (!form.email || !form.password) {
      setError("Please enter email and password");
      return;
    }

    setLoading(true);
    setError("");
    setAttemptsLeft(null);

    const res = await login(form.email, form.password);

    setLoading(false);

    /////////////////////////////////////////
    // SUCCESS
    /////////////////////////////////////////
    if (res.success) {
      navigate("/dashboard");
      return;
    }

    /////////////////////////////////////////
    // RATE LIMIT
    /////////////////////////////////////////
    if (res.type === "rate_limit") {
      setBlocked(true);
      setError(res.message);
      return;
    }

    /////////////////////////////////////////
    // INVALID CREDENTIALS
    /////////////////////////////////////////
    if (res.type === "invalid") {
      setError(res.message);
      setAttemptsLeft(res.attemptsLeft);
      return;
    }

    /////////////////////////////////////////
    // FALLBACK ERROR
    /////////////////////////////////////////
    setError(res.message || "Login failed");
  };

  /////////////////////////////////////////
  // UI
  /////////////////////////////////////////
  return (
    <div className="page-center">
      <div className="auth-container">
        <h2>🔐 Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          disabled={blocked}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          disabled={blocked}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button onClick={submit} disabled={blocked || loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* ❌ Error */}
        {error && <p className="error">{error}</p>}

        {/* ⚠️ Attempts Left */}
        {attemptsLeft !== null && attemptsLeft >= 0 && !blocked && (
          <p className="warning">
            Attempts left: {attemptsLeft}
          </p>
        )}

        {/* 🚫 Blocked */}
        {blocked && (
          <p className="blocked">
            🚫 Too many attempts. Please try again later.
          </p>
        )}

        {/* 🔗 Signup */}
        <p
          style={{ cursor: "pointer", textAlign: "center" }}
          onClick={() => navigate("/signup")}
        >
          Don't have an account? Signup
        </p>
      </div>
    </div>
  );
};

export default Login;