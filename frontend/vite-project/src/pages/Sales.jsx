import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function Sales() {
  const [sales, setSales] = useState([]);
  const [uniforms, setUniforms] = useState([]);

  const [formData, setFormData] = useState({
    customerName: "",
    customerPhone: "",
    uniform: "",
    quantity: 1,
    paymentMethod: "Cash",
  });

  useEffect(() => {
    fetchSales();
    fetchUniforms();
  }, []);

  const fetchSales = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/sales", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSales(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

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

      const payload = {
        customerName: formData.customerName,
        customerPhone: formData.customerPhone,
        paymentMethod: formData.paymentMethod,
        items: [
          {
            uniform: formData.uniform,
            quantity: Number(formData.quantity),
          },
        ],
      };

      await api.post("/sales", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Sale Created Successfully");

      setFormData({
        customerName: "",
        customerPhone: "",
        uniform: "",
        quantity: 1,
        paymentMethod: "Cash",
      });

      fetchSales();
    } catch (error) {
      console.log(error);
      alert(
        error.response?.data?.message ||
          "Failed to create sale"
      );
    }
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="p-6 flex-1 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-5">
          Sales Management
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-5 rounded-lg shadow mb-6"
        >
          <h2 className="text-xl font-semibold mb-4">
            Create Sale
          </h2>

          <input
            type="text"
            name="customerName"
            placeholder="Customer Name"
            value={formData.customerName}
            onChange={handleChange}
            className="border p-2 w-full mb-3 rounded"
            required
          />

          <input
            type="text"
            name="customerPhone"
            placeholder="Customer Phone"
            value={formData.customerPhone}
            onChange={handleChange}
            className="border p-2 w-full mb-3 rounded"
            required
          />

          <select
            name="uniform"
            value={formData.uniform}
            onChange={handleChange}
            className="border p-2 w-full mb-3 rounded"
            required
          >
            <option value="">Select Uniform</option>

            {uniforms.map((uniform) => (
              <option
                key={uniform._id}
                value={uniform._id}
              >
                {uniform.className} - {uniform.category}
              </option>
            ))}
          </select>

          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="border p-2 w-full mb-3 rounded"
            min="1"
            required
          />

          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            className="border p-2 w-full mb-3 rounded"
          >
            <option value="Cash">Cash</option>
            <option value="UPI">UPI</option>
            <option value="Card">Card</option>
          </select>

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Create Sale
          </button>
        </form>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="border p-3">Customer</th>
                <th className="border p-3">Phone</th>
                <th className="border p-3">Amount</th>
                <th className="border p-3">Payment</th>
              </tr>
            </thead>

            <tbody>
              {sales.map((sale) => (
                <tr key={sale._id}>
                  <td className="border p-3">
                    {sale.customerName}
                  </td>

                  <td className="border p-3">
                    {sale.customerPhone}
                  </td>

                  <td className="border p-3">
                    ₹{sale.totalAmount}
                  </td>

                  <td className="border p-3">
                    {sale.paymentMethod}
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

export default Sales;

