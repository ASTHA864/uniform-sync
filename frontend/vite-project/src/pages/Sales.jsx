import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function Sales() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    fetchSales();
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

  return (
    <div className="flex">
      <Sidebar />

      <div className="p-5 flex-1">
        <h1>Sales Management</h1>

        <table className="w-full border shadow bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-3">Customer</th>
              <th className="border p-3">Phone</th>
              <th className="border p-3">Total Amount</th>
              <th className="border p-3">Payment</th>
            </tr>
          </thead>

          <tbody>
            {sales.map((sale) => (
              <tr key={sale._id}>
                <td className="border p-3">{sale.customerName}</td>
                <td className="border p-3">{sale.customerPhone}</td>
                <td className="border p-3">₹{sale.totalAmount}</td>
                <td className="border p-3">{sale.paymentMethod}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Sales;
