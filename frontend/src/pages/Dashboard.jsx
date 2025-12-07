import { useEffect, useState } from "react";
import axios from "axios";



function Dashboard() {
  const [data, setData] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios.get("https://hubcredo-assignment-qopl.onrender.com/api/auth/dashboard", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setData(res.data.message + " | User ID: " + res.data.userId))
      .catch(() => setData("Invalid or expired token"));
  }, []);

  return (
    <div className="container mt-5">
      <h2>Dashboard</h2>
      <div className="alert alert-info mt-3">
        {data}
      </div>
    </div>
  );
}

export default Dashboard;
