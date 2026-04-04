import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import JobRankingPage from "./JobRankingPage";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div>

      {/* HEADER */}
      <div className="header">
        <h2>Welcome {user?.name}</h2>
        <button onClick={logout}>Logout</button>
      </div>

      {/* 🔥 ATS PAGE */}
      <div className="container">
        <JobRankingPage />
      </div>

    </div>
  );
};

export default Dashboard;