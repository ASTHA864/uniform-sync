import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function Uniforms() {
  const [uniforms, setUniforms] = useState([]);
  const [schools, setSchools] = useState([]);

  const [formData, setFormData] = useState({
    school: "",
    className: "",
    category: "",
    gender: "",
    size: "",
    color: "",
    price: "",
    costPrice: "",
    stock: "",
  });

  useEffect(() => {
    fetchUniforms();
    fetchSchools();
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

      const response = await api.post(
        "/uniforms",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Success:", response.data);

      alert("Uniform Added Successfully");

      setFormData({
        school: "",
        className: "",
        category: "",
        gender: "",
        size: "",
        color: "",
        price: "",
        costPrice: "",
        stock: "",
      });

      fetchUniforms();
    } catch (error) {
      console.log("Full Error:", error);
      console.log("Response Data:", error.response?.data);

      alert(
        error.response?.data?.message ||
          "Failed to add uniform"
      );
    }
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="p-6 flex-1 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-5">
          Uniform Management
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-5 rounded-lg shadow mb-6"
        >
          <h2 className="text-xl font-semibold mb-4">
            Add Uniform
          </h2>

          <select
            name="school"
            value={formData.school}
            onChange={handleChange}
            className="border p-2 w-full mb-3 rounded"
            required
          >
            <option value="">Select School</option>

            {schools.map((school) => (
              <option key={school._id} value={school._id}>
                {school.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="className"
            placeholder="Class Name"
            value={formData.className}
            onChange={handleChange}
            className="border p-2 w-full mb-3 rounded"
            required
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="border p-2 w-full mb-3 rounded"
            required
          />

          <input
            type="text"
            name="gender"
            placeholder="Gender"
            value={formData.gender}
            onChange={handleChange}
            className="border p-2 w-full mb-3 rounded"
            required
          />

          <input
            type="text"
            name="size"
            placeholder="Size"
            value={formData.size}
            onChange={handleChange}
            className="border p-2 w-full mb-3 rounded"
            required
          />

          <input
            type="text"
            name="color"
            placeholder="Color"
            value={formData.color}
            onChange={handleChange}
            className="border p-2 w-full mb-3 rounded"
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Selling Price"
            value={formData.price}
            onChange={handleChange}
            className="border p-2 w-full mb-3 rounded"
            required
          />

          <input
            type="number"
            name="costPrice"
            placeholder="Cost Price"
            value={formData.costPrice}
            onChange={handleChange}
            className="border p-2 w-full mb-3 rounded"
            required
          />

          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={formData.stock}
            onChange={handleChange}
            className="border p-2 w-full mb-3 rounded"
          />

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Add Uniform
          </button>
        </form>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-200">
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
                  <td className="border p-3">
                    {uniform.school?.name}
                  </td>
                  <td className="border p-3">
                    {uniform.className}
                  </td>
                  <td className="border p-3">
                    {uniform.category}
                  </td>
                  <td className="border p-3">
                    {uniform.size}
                  </td>
                  <td className="border p-3">
                    ₹{uniform.price}
                  </td>
                  <td className="border p-3">
                    {uniform.stock}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Uniforms;
