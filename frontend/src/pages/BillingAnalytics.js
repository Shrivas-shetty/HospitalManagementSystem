import { useState, useEffect } from "react";
import API from "../api/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function BillingAnalytics() {
  const [patientId, setPatientId] = useState("");
  const [individualBill, setIndividualBill] = useState(null);
  const [longStays, setLongStays] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch the Procedure results on page load
  useEffect(() => {
    API.get("/bills/long-stays")
      .then(res => {
        setLongStays(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleCheckBill = () => {
    if (!patientId) return;
    API.get(`/bills/total-bill/${patientId}`)
      .then(res => setIndividualBill(res.data.total))
      .catch(err => console.error(err));
  };

  // Main Container Background consistent with previous pages
  const containerStyle = {
    minHeight: "100vh",
    backgroundImage: "linear-gradient(rgba(244, 247, 246, 0.95), rgba(244, 247, 246, 0.95)), url('https://images.unsplash.com/photo-1512678080530-7760d81faba6?q=80&w=2074&auto=format&fit=crop')",
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
    fontFamily: "'Segoe UI', Roboto, sans-serif"
  };

  return (
    <div style={containerStyle}>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        
        <div style={{ flex: 1, padding: "40px" }}>
          
          <div style={{ marginBottom: "30px" }}>
            <h1 style={{ color: "#2c3e50", margin: 0 }}>Financial Analytics</h1>
            <p style={{ color: "#666" }}>Backend logic implementation: Stored Functions & Cursor Procedures.</p>
          </div>

          <div style={{ maxWidth: "1000px" }}>
            
            {/* SECTION 1: Stored Function Implementation */}
            <div style={cardStyle}>
              <h3 style={titleStyle}>Quick Bill Lookup (Stored Function)</h3>
              <div style={{ display: "flex", gap: "10px", marginBottom: "15px", marginTop: "20px" }}>
                <input 
                  type="number" 
                  placeholder="Enter Patient ID (e.g. 101)" 
                  style={inputStyle}
                  onChange={(e) => setPatientId(e.target.value)}
                />
                <button onClick={handleCheckBill} style={btnStyle}>Check Total</button>
              </div>
              {individualBill !== null && (
                <div style={resultBox}>
                  Total Amount Paid: <strong style={{color: "#27ae60", fontSize: "1.2rem"}}>${individualBill}</strong>
                </div>
              )}
            </div>

            {/* SECTION 2: Cursor Stored Procedure Implementation */}
            <div style={{ ...cardStyle, marginTop: "30px" }}>
              <h3 style={titleStyle}>Long Stay Report (Cursor Logic: &gt; 5 Days)</h3>
              <div style={{ overflowX: "auto" }}>
                <table style={tableStyle}>
                  <thead>
                    <tr style={{ backgroundColor: "#ebf5ff", textAlign: "left" }}>
                      <th style={thStyle}>Patient Identifier</th>
                      <th style={thStyle}>Stay Duration</th>
                      <th style={thStyle}>Status Alert</th>
                    </tr>
                  </thead>
                  <tbody>
                    {longStays.map((item, i) => (
                      <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                        <td style={tdStyle}><b>Patient #{item.patient_id}</b></td>
                        <td style={tdStyle}>{item.stay_days} Days</td>
                        <td style={tdStyle}>
                          <span style={alertBadge}>⚠️ Extended Stay</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {!loading && longStays.length === 0 && (
                <p style={{textAlign: "center", padding: "20px", color: "#95a5a6"}}>No patients found with stays exceeding 5 days.</p>
              )}
              {loading && <p style={{textAlign: "center", padding: "20px", color: "#3498db"}}>Processing procedure logic...</p>}
            </div>

          </div>
          
          <div style={{ marginTop: "30px", fontSize: "0.85rem", color: "#7f8c8d", borderTop: "1px solid #ddd", paddingTop: "15px" }}>
            <b>Technical Note:</b> The "Quick Bill" uses an SQL Function for real-time calculation, while "Long Stay" triggers a Cursor-based Stored Procedure to iterate through occupancy records.
          </div>
        </div>
      </div>
    </div>
  );
}

// STYLES (Kept as provided, with minor alignment fixes)
const cardStyle = { 
  backgroundColor: "#fff", 
  padding: "25px", 
  borderRadius: "12px", 
  boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
  border: "1px solid rgba(0,0,0,0.05)"
};

const titleStyle = { 
  marginTop: 0, 
  color: "#2c3e50", 
  fontSize: "18px", 
  borderLeft: "4px solid #3498db", 
  paddingLeft: "15px" 
};

const inputStyle = { 
  padding: "12px", 
  borderRadius: "8px", 
  border: "1px solid #ddd", 
  flex: 1,
  fontSize: "14px"
};

const btnStyle = { 
  padding: "10px 25px", 
  backgroundColor: "#3498db", 
  color: "white", 
  border: "none", 
  borderRadius: "8px", 
  cursor: "pointer",
  fontWeight: "600",
  transition: "0.3s"
};

const resultBox = { 
  padding: "15px", 
  backgroundColor: "#f0fdf4", 
  borderRadius: "8px", 
  borderLeft: "5px solid #27ae60",
  marginTop: "10px"
};

const tableStyle = { 
  width: "100%", 
  borderCollapse: "collapse", 
  marginTop: "20px" 
};

const thStyle = { 
  padding: "15px 12px", 
  fontSize: "13px", 
  color: "#2980b9",
  textTransform: "uppercase",
  letterSpacing: "0.5px"
};

const tdStyle = { 
  padding: "15px 12px", 
  fontSize: "14px",
  color: "#333"
};

const alertBadge = { 
  backgroundColor: "#fff3cd", 
  color: "#856404", 
  padding: "5px 12px", 
  borderRadius: "20px", 
  fontSize: "11px", 
  fontWeight: "bold",
  display: "inline-block"
};

export default BillingAnalytics;