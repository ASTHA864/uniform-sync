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

        <table>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Phone</th>
              <th>Total Amount</th>
              <th>Payment</th>
            </tr>
          </thead>

          <tbody>
            {sales.map((sale) => (
              <tr key={sale._id}>
                <td>{sale.customerName}</td>
                <td>{sale.customerPhone}</td>
                <td>₹{sale.totalAmount}</td>
                <td>{sale.paymentMethod}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Sales;
