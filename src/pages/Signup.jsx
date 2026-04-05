import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Signup = () => {
  const { signup } = useContext(AuthContext);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleSubmit = async () => {
    const res = await signup(form);

    if (res.success) {
      window.location.href = "/dashboard";
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="page-center">
      <div className="auth-container">
        <h2>📝 Signup</h2>

        <input
          placeholder="Name"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          placeholder="Email"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button onClick={handleSubmit}>Signup</button>

        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default Signup;