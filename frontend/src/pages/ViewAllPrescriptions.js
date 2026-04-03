import { useEffect, useState } from "react";
import API from "../api/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function ViewAllPrescriptions() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/prescriptions/all")
      .then(res => {
        setPrescriptions(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const containerStyle = {
    minHeight: "100vh",
    backgroundImage: "linear-gradient(rgba(244, 247, 246, 0.9), rgba(244, 247, 246, 0.9)), url('https://images.unsplash.com/photo-1512678080530-7760d81faba6?q=80&w=2074&auto=format&fit=crop')",
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
    fontFamily: "'Segoe UI', Roboto, sans-serif"
  };

  const glassCard = {
    background: "rgba(255, 255, 255, 0.95)",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0 8px 30px rgba(0,0,0,0.05)",
    backdropFilter: "blur(5px)",
    border: "1px solid rgba(111, 66, 193, 0.1)",
    overflow: "hidden"
  };

  return (
    <div style={containerStyle}>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        
        <div style={{ flex: 1, padding: "40px" }}>
          
          {/* Header Section */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
            <div>
              <h1 style={{ color: "#2c3e50", margin: 0 }}>Central Prescription Registry</h1>
              <p style={{ color: "#666" }}>Full historical log of all medications issued across the facility.</p>
            </div>
            <button 
              onClick={() => window.print()} 
              style={printBtnStyle}
            >
              🖨️ Export Registry
            </button>
          </div>

          <div style={glassCard}>
            {loading ? (
              <div style={{ textAlign: "center", padding: "40px", color: "#6f42c1" }}>
                <h3>Accessing Secure Database...</h3>
              </div>
            ) : (
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ textAlign: "left", borderBottom: "2px solid #6f42c1" }}>
                    <th style={thStyle}>Date Issued</th>
                    <th style={thStyle}>Patient Name</th>
                    <th style={thStyle}>Physician</th>
                    <th style={thStyle}>Medication</th>
                    <th style={thStyle}>Clinical Instructions</th>
                  </tr>
                </thead>
                <tbody>
                  {prescriptions.map((p, index) => (
                    <tr key={p.prescription_id} style={{ 
                      borderBottom: "1px solid #eee",
                      backgroundColor: index % 2 === 0 ? "transparent" : "rgba(111, 66, 193, 0.02)"
                    }}>
                      <td style={tdStyle}>
                        <span style={dateStyle}>{p.prescription_date?.substring(0, 10)}</span>
                      </td>
                      <td style={{ ...tdStyle, fontWeight: "600", color: "#00203f" }}>
                        {p.patient_name}
                      </td>
                      <td style={tdStyle}>
                        <span style={docTag}>Dr. {p.doctor_name}</span>
                      </td>
                      <td style={{ ...tdStyle, color: "#6f42c1", fontWeight: "bold" }}>
                        {p.medication}
                      </td>
                      <td style={tdStyle}>
                        <div style={{ fontWeight: "600" }}>{p.dosage}</div>
                        <div style={{ fontSize: "12px", color: "#777", marginTop: "3px" }}>{p.instructions}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {!loading && prescriptions.length === 0 && (
              <div style={{ padding: "60px", textAlign: "center", color: "#95a5a6" }}>
                <p style={{ fontSize: "1.2rem" }}>No prescription records found in the central repository.</p>
              </div>
            )}
          </div>

          <div style={{ marginTop: "20px", color: "#7f8c8d", fontSize: "0.8rem", textAlign: "right" }}>
            Total Records Found: {prescriptions.length} | Audit Logs Active
          </div>
        </div>
      </div>
    </div>
  );
}

// Styling Constants
const thStyle = { padding: "18px 15px", fontSize: "14px", fontWeight: "700", color: "#6f42c1", textTransform: "uppercase", letterSpacing: "0.5px" };
const tdStyle = { padding: "18px 15px", fontSize: "14px", verticalAlign: "middle" };
const printBtnStyle = { padding: "10px 20px", background: "white", color: "#6f42c1", border: "2px solid #6f42c1", borderRadius: "8px", cursor: "pointer", fontWeight: "600", transition: "0.3s" };
const dateStyle = { color: "#555", fontSize: "0.85rem", background: "#f8f9fa", padding: "4px 8px", borderRadius: "4px" };
const docTag = { background: "rgba(111, 66, 193, 0.08)", color: "#6f42c1", padding: "4px 10px", borderRadius: "6px", fontSize: "0.85rem", fontWeight: "600" };

export default ViewAllPrescriptions;