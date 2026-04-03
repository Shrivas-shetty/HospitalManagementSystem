import { useEffect, useState } from "react";
import API from "../api/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Payments() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    API.get("/payments")
      .then(res => setHistory(res.data))
      .catch(err => console.error(err));
  }, []);

  // Consistent background style
  const pageStyle = { 
    backgroundImage: "linear-gradient(rgba(244, 247, 246, 0.9), rgba(244, 247, 246, 0.9)), url('https://images.unsplash.com/photo-1512678080530-7760d81faba6?q=80&w=2074&auto=format&fit=crop')",
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
    minHeight: "100vh" 
  };

  return (
    <div style={pageStyle}>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        
        <div style={{ flex: 1, padding: "40px 20px", maxWidth: "1100px", margin: "0 auto" }}>
          <h2 style={{ color: "#2c3e50", marginBottom: "20px" }}>Transaction History</h2>
          
          <div style={{ backgroundColor: "#fff", borderRadius: "10px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: "#34495e", color: "#fff", textAlign: "left" }}>
                  <th style={thStyle}>Receipt ID</th>
                  <th style={thStyle}>Patient</th>
                  <th style={thStyle}>Bill ID</th>
                  <th style={thStyle}>Amount</th>
                  <th style={thStyle}>Date</th>
                  <th style={thStyle}>Method</th>
                </tr>
              </thead>
              <tbody>
                {history.map(p => (
                  <tr key={p.payment_id} style={{ borderBottom: "1px solid #eee" }}>
                    <td style={tdStyle}>#{p.payment_id}</td>
                    <td style={{ ...tdStyle, fontWeight: "bold" }}>{p.patient_name}</td>
                    <td style={tdStyle}>{p.bill_id}</td>
                    <td style={{ ...tdStyle, color: "#27ae60", fontWeight: "bold" }}>₹{p.amount}</td>
                    <td style={tdStyle}>{p.payment_date?.substring(0, 10)}</td>
                    <td style={tdStyle}>
                      <span style={methodTag}>{p.method}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {history.length === 0 && (
              <p style={{ textAlign: "center", padding: "40px", color: "#7f8c8d" }}>
                No payments found in the transaction log.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// YOUR ORIGINAL STYLES
const thStyle = { padding: "15px" };
const tdStyle = { padding: "15px", fontSize: "14px" };
const methodTag = { backgroundColor: "#e9ecef", padding: "4px 8px", borderRadius: "4px", fontSize: "12px", color: "#495057" };

export default Payments;