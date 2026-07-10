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

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Phone</th>
            </tr>
          </thead>

          <tbody>
            {schools.map((school) => (
              <tr key={school._id}>
                <td>{school.name}</td>
                <td>{school.address}</td>
                <td>{school.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Schools;
