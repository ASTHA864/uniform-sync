import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function Schools() {
  const [schools, setSchools] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
  });

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await api.post("/schools", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFormData({
        name: "",
        address: "",
        phone: "",
      });

      fetchSchools();

      alert("School Added Successfully");
    } catch (error) {
      console.log(error);
      alert("Failed to add school");
    }
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="p-6 flex-1 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-5">Schools Management</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-5 rounded-lg shadow mb-6"
        >
          <h2 className="text-xl font-semibold mb-4">Add School</h2>

          <input
            type="text"
            name="name"
            placeholder="School Name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 w-full mb-3 rounded"
            required
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="border p-2 w-full mb-3 rounded"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="border p-2 w-full mb-3 rounded"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add School
          </button>
        </form>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-200">
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
    </div>
  );
}

export default Schools;
