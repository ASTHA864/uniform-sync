import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function Schools() {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    fetchSchools();
  }, []);

  const fetchSchools = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/schools", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSchools(response.data.data || response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="p-5 flex-1">
        <h1>Schools Management</h1>

        <table className="w-full border shadow bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-3">Name</th>
              <th className="border p-3">Address</th>
              <th className="border p-3">Phone</th>
            </tr>
          </thead>

          <tbody>
            {schools.map((school) => (
              <tr key={school._id}>
                <td className="border p-3">{school.name}</td>
                <td className="border p-3">{school.address}</td>
                <td className="border p-3">{school.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Schools;
