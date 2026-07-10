import { useEffect, useState } from "react";
import StatCard from "../components/StatCard";
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
        <div className="grid grid-cols-2 gap-4 mt-5">
          <StatCard title="Total Schools" value={stats.totalSchools} />

          <StatCard title="Total Uniforms" value={stats.totalUniforms} />

          <StatCard title="Total Sales" value={stats.totalSales} />

          <StatCard title="Total Revenue" value={`₹${stats.totalRevenue}`} />
        </div>
      )}
    </div>
  );
}

export default Dashboard;
