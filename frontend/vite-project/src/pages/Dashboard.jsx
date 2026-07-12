import { useEffect, useState } from "react";
import StatCard from "../components/StatCard";
import Sidebar from "../components/Sidebar";
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
    <div className="flex">
      <Sidebar />

      <div className="p-6 flex-1 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-5">UniformSync Dashboard</h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded mb-5"
        >
          Logout
        </button>

        {stats && (
          <div className="grid grid-cols-2 gap-4 mt-5">
            <StatCard title="Total Schools" value={stats.totalSchools} />
            <StatCard title="Total Uniforms" value={stats.totalUniforms} />
            <StatCard title="Total Sales" value={stats.totalSales} />
            <StatCard title="Total Revenue" value={`₹${stats.totalRevenue}`} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
