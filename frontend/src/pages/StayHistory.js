import { useEffect, useState } from "react";
import API from "../api/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function StayHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/stay-history/all")
      .then(res => {
        setHistory(res.data);
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
    border: "1px solid rgba(41, 128, 185, 0.1)",
    overflow: "hidden"
  };

  return (
    <div style={containerStyle}>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        
        <div style={{ flex: 1, padding: "40px" }}>
          
          <div style={{ marginBottom: "30px" }}>
            <h1 style={{ color: "#00203f", margin: 0 }}>Occupancy Archive</h1>
            <p style={{ color: "#666" }}>Comprehensive log of patient admissions, room assignments, and stay durations.</p>
          </div>

          <div style={glassCard}>
            {loading ? (
              <div style={{ textAlign: "center", padding: "40px", color: "#2980b9" }}>
                <h3>Retrieving stay records...</h3>
              </div>
            ) : (
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ textAlign: "left", borderBottom: "2px solid #2980b9" }}>
                    <th style={thStyle}>Patient ID</th>
                    <th style={thStyle}>Patient Name</th>
                    <th style={thStyle}>Room & Ward</th>
                    <th style={thStyle}>Admit Date</th>
                    <th style={thStyle}>Discharge Date</th>
                    <th style={thStyle}>Stay Duration</th>
                    <th style={thStyle}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((sh, index) => {
                    const admit = new Date(sh.admit_date);
                    const discharge = sh.discharge_date ? new Date(sh.discharge_date) : new Date();
                    const diffTime = Math.max(0, discharge - admit); 
                    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    const uniqueKey = `${sh.patient_id}-${sh.admit_date}-${index}`;
                    const isStillAdmitted = !sh.discharge_date;

                    return (
                      <tr key={uniqueKey} style={trStyle}>
                        <td style={tdStyle}><b>PID-{sh.patient_id}</b></td>
                        <td style={{ ...tdStyle, fontWeight: "600", color: "#2c3e50" }}>{sh.patient_name}</td>
                        <td style={tdStyle}>
                          <div style={{ fontWeight: "600" }}>Room {sh.room_number}</div>
                          <div style={{ fontSize: "11px", color: "#3498db", textTransform: "uppercase" }}>{sh.room_type}</div>
                        </td>
                        <td style={tdStyle}>{sh.admit_date?.substring(0, 10)}</td>
                        <td style={tdStyle}>
                          {isStillAdmitted ? (
                            <span style={{ color: "#95a5a6", fontStyle: "italic" }}>Pending</span>
                          ) : (
                            sh.discharge_date.substring(0, 10)
                          )}
                        </td>
                        <td style={tdStyle}>
                          <span style={durationBadge}>{days} {days === 1 ? 'Day' : 'Days'}</span>
                        </td>
                        <td style={tdStyle}>
                          <span style={{
                            ...statusPill,
                            backgroundColor: isStillAdmitted ? "#e8f5e9" : "#f1f2f6",
                            color: isStillAdmitted ? "#2e7d32" : "#57606f"
                          }}>
                            {isStillAdmitted ? "Active Stay" : "Archived"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}

            {!loading && history.length === 0 && (
              <div style={{ padding: "60px", textAlign: "center", color: "#95a5a6" }}>
                <p>No historical stay records found in the registry.</p>
              </div>
            )}
          </div>
          
          <div style={{ marginTop: "20px", fontSize: "0.8rem", color: "#7f8c8d", textAlign: "center" }}>
            Audit Log ID: SH-REGEN-2026 | Records are synchronized with the central database.
          </div>
        </div>
      </div>
    </div>
  );
}

// Styling Constants
const thStyle = { padding: "18px 15px", fontSize: "13px", fontWeight: "700", color: "#2980b9", textTransform: "uppercase" };
const tdStyle = { padding: "18px 15px", fontSize: "14px" };
const trStyle = { borderBottom: "1px solid #f0f0f0", transition: "0.2s" };
const durationBadge = { backgroundColor: "rgba(41, 128, 185, 0.1)", color: "#2980b9", padding: "4px 10px", borderRadius: "6px", fontWeight: "700", fontSize: "13px" };
const statusPill = { padding: "4px 12px", borderRadius: "20px", fontSize: "11px", fontWeight: "bold", textTransform: "uppercase" };

export default StayHistory;