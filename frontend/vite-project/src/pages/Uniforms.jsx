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

        <table>
          <thead>
            <tr>
              <th>School</th>
              <th>Class</th>
              <th>Category</th>
              <th>Size</th>
              <th>Price</th>
              <th>Stock</th>
            </tr>
          </thead>

          <tbody>
            {uniforms.map((uniform) => (
              <tr key={uniform._id}>
                <td>{uniform.school?.name}</td>
                <td>{uniform.className}</td>
                <td>{uniform.category}</td>
                <td>{uniform.size}</td>
                <td>₹{uniform.price}</td>
                <td>{uniform.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Uniforms;
