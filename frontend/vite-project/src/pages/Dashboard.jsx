import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/dashboard/stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStats(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>UniformSync Dashboard</h1>

      <button onClick={handleLogout}>Logout</button>

      {stats && (
        <>
          <h3>Total Schools: {stats.totalSchools}</h3>
          <h3>Total Uniforms: {stats.totalUniforms}</h3>
          <h3>Total Sales: {stats.totalSales}</h3>
          <h3>Total Revenue: ₹{stats.totalRevenue}</h3>
        </>
      )}
    </div>
  );
}

export default Dashboard;
