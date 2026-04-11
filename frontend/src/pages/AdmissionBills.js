import { useEffect, useState } from "react";
import API from "../api/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function AdmissionBills() {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBills = () => {
    API.get("/bills-a/all")
      .then(res => {
        setBills(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchBills();
  }, []);

  const handleStatusChange = (id, newStatus) => {
    API.put(`/bills-a/update/${id}`, { status: newStatus })
      .then(() => fetchBills())
      .catch(err => alert("Update failed"));
  };

  const containerStyle = {
    minHeight: "100vh",
    backgroundColor: "#f4f7f6",
    fontFamily: "'Segoe UI', Roboto, sans-serif"
  };

  return (
    <div style={containerStyle}>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ flex: 1, padding: "40px" }}>
          <div style={{ marginBottom: "30px" }}>
            <h1 style={{ color: "#00203f", margin: 0 }}>Admission Invoices</h1>
            <p style={{ color: "#666" }}>Records for discharged patients (Direct Data Access).</p>
          </div>

          <div style={{ background: "white", padding: "25px", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
            {loading ? (
              <p>Loading billing data...</p>
            ) : (
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ textAlign: "left", borderBottom: "2px solid #2980b9" }}>
                    <th style={thStyle}>Bill ID</th>
                    <th style={thStyle}>Admission Ref</th>
                    <th style={thStyle}>Total Amount</th>
                    <th style={thStyle}>Payment Status</th>
                    <th style={thStyle}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {bills.map((b) => (
                    <tr key={b.id} style={{ borderBottom: "1px solid #eee" }}>
                      <td style={tdStyle}><b>#INV-{b.id}</b></td>
                      <td style={tdStyle}>ADM-{b.admission_id}</td>
                      <td style={{ ...tdStyle, fontWeight: "bold" }}>₹{parseFloat(b.amount).toLocaleString('en-IN')}</td>
                      <td style={tdStyle}>
                        <span style={{
                          padding: "4px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: "600",
                          backgroundColor: b.status === "Paid" ? "#d4edda" : "#fff3cd",
                          color: b.status === "Paid" ? "#155724" : "#856404"
                        }}>{b.status}</span>
                      </td>
                      <td style={tdStyle}>
                        <select 
                          value={b.status} 
                          onChange={(e) => handleStatusChange(b.id, e.target.value)}
                          style={{ padding: "5px", borderRadius: "4px", border: "1px solid #ccc" }}
                        >
                          <option value="Unpaid">Unpaid</option>
                          <option value="Paid">Paid</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {!loading && bills.length === 0 && (
              <div style={{ textAlign: "center", padding: "20px", color: "#999" }}>
                No records found. Try discharging an admission to generate a bill.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const thStyle = { padding: "15px", color: "#2980b9", fontSize: "14px" };
const tdStyle = { padding: "15px", fontSize: "14px" };

export default AdmissionBills;