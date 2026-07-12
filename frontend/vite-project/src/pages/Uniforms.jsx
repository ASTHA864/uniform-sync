import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function Uniforms() {
  const [uniforms, setUniforms] = useState([]);

  useEffect(() => {
    fetchUniforms();
  }, []);

  const fetchUniforms = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/uniforms", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUniforms(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="p-5 flex-1">
        <h1>Uniform Management</h1>

        <table className="w-full border shadow bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-3">School</th>
              <th className="border p-3">Class</th>
              <th className="border p-3">Category</th>
              <th className="border p-3">Size</th>
              <th className="border p-3">Price</th>
              <th className="border p-3">Stock</th>
            </tr>
          </thead>

          <tbody>
            {uniforms.map((uniform) => (
              <tr key={uniform._id}>
                <td className="border p-3">{uniform.school?.name}</td>
                <td className="border p-3">{uniform.className}</td>
                <td className="border p-3">{uniform.category}</td>
                <td className="border p-3">{uniform.size}</td>
                <td className="border p-3">₹{uniform.price}</td>
                <td className="border p-3">{uniform.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Uniforms;
