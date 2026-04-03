import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Prescriptions() {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get(`/prescriptions/patient/${patientId}`)
      .then(res => {
        setList(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [patientId]);

  // Main Container Background consistent with previous pages
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
    border: "1px solid rgba(111, 66, 193, 0.1)", // Subtle purple tint to match prescriptions theme
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
              <h1 style={{ color: "#2c3e50", margin: 0 }}>Patient Prescriptions</h1>
              <p style={{ color: "#666", fontWeight: "bold" }}>📜 Medical Record for Patient #{patientId}</p>
            </div>
            <button 
              onClick={() => navigate("/patients")} 
              style={backBtnStyle}
            >
              ← Back to Directory
            </button>
          </div>

          <div style={glassCard}>
            {loading ? (
              <div style={{ textAlign: "center", padding: "40px", color: "#6f42c1" }}>
                <h3>Loading medical records...</h3>
              </div>
            ) : list.length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px", color: "#888" }}>
                <p style={{ fontSize: "1.2rem" }}>No active prescriptions found for this patient.</p>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
                {list.map((p) => (
                  <div key={p.prescription_id} style={rxCardStyle}>
                    <div style={rxHeaderStyle}>
                      <span style={{ fontSize: "1.1rem", fontWeight: "bold", color: "#6f42c1" }}>💊 {p.medication}</span>
                      <span style={dateBadgeStyle}>{p.date?.substring(0, 10)}</span>
                    </div>
                    
                    <div style={{ padding: "15px" }}>
                      <p style={detailTextStyle}><strong>Dosage:</strong> {p.dosage}</p>
                      <p style={detailTextStyle}><strong>Instructions:</strong> {p.instructions}</p>
                      
                      <div style={doctorFooterStyle}>
                        <span>Prescribed by:</span>
                        <strong>Dr. {p.doctor_name || "Staff Physician"}</strong>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div style={{ marginTop: "20px", fontSize: "0.85rem", color: "#7f8c8d", textAlign: "center" }}>
            This is a secure medical document. Authorized HealthSync personnel only.
          </div>
        </div>
      </div>
    </div>
  );
}

// Internal Styled Objects
const backBtnStyle = { 
  padding: "10px 20px", 
  background: "#00203f", 
  color: "white", 
  border: "none", 
  borderRadius: "8px", 
  cursor: "pointer", 
  fontWeight: "600" 
};

const rxCardStyle = {
  backgroundColor: "#fff",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
  border: "1px solid #eee",
  overflow: "hidden",
  borderTop: "4px solid #6f42c1"
};

const rxHeaderStyle = {
  backgroundColor: "rgba(111, 66, 193, 0.05)",
  padding: "12px 15px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: "1px solid #f0f0f0"
};

const dateBadgeStyle = {
  fontSize: "0.75rem",
  background: "#fff",
  padding: "3px 8px",
  borderRadius: "5px",
  color: "#888",
  border: "1px solid #eee"
};

const detailTextStyle = {
  margin: "8px 0",
  fontSize: "0.95rem",
  color: "#333",
  lineHeight: "1.4"
};

const doctorFooterStyle = {
  marginTop: "15px",
  paddingTop: "10px",
  borderTop: "1px dashed #ddd",
  display: "flex",
  justifyContent: "space-between",
  fontSize: "0.85rem",
  color: "#555"
};

export default Prescriptions;