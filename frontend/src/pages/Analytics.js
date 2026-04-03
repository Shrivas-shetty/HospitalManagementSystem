import { useEffect, useState } from "react";
import API from "../api/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

function Analytics() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/analytics")
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);

  const containerStyle = {
    minHeight: "100vh",
    backgroundImage: "linear-gradient(rgba(244, 247, 246, 0.9), rgba(244, 247, 246, 0.9)), url('https://images.unsplash.com/photo-1512678080530-7760d81faba6?q=80&w=2074&auto=format&fit=crop')",
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
    fontFamily: "'Segoe UI', Roboto, sans-serif"
  };

  const statCard = (title, value, icon, color) => ({
    background: "rgba(255, 255, 255, 0.95)",
    padding: "30px",
    borderRadius: "16px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
    borderLeft: `6px solid ${color}`,
    textAlign: "center",
    backdropFilter: "blur(5px)",
    transition: "0.3s transform",
    cursor: "default"
  });

  if (!data) return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", color: "#004a99" }}>
      <h2 style={{ fontWeight: "300" }}>Analyzing System Data...</h2>
    </div>
  );

  return (
    <div style={containerStyle}>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        
        <div style={{ flex: 1, padding: "40px" }}>
          {/* Header Row */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px" }}>
            <div>
              <h1 style={{ color: "#00203f", margin: 0 }}>System Analytics</h1>
              <p style={{ color: "#666" }}>Real-time metrics for HealthSync infrastructure.</p>
            </div>
            <button 
              onClick={() => navigate("/dashboard")}
              style={{ padding: "10px 20px", background: "#00203f", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" }}
            >
              ← Dashboard
            </button>
          </div>

          {/* Stats Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "25px"
          }}>
            <div style={statCard("Patients", data.patients, "👥", "#3498db")}>
              <span style={{ fontSize: "2.5rem" }}>👥</span>
              <h4 style={{ color: "#777", margin: "10px 0 5px 0", textTransform: "uppercase", fontSize: "0.8rem" }}>Total Patients</h4>
              <h2 style={{ color: "#00203f", margin: 0, fontSize: "2.2rem" }}>{data.patients}</h2>
            </div>

            <div style={statCard("Doctors", data.doctors, "👨‍⚕️", "#2ecc71")}>
              <span style={{ fontSize: "2.5rem" }}>👨‍⚕️</span>
              <h4 style={{ color: "#777", margin: "10px 0 5px 0", textTransform: "uppercase", fontSize: "0.8rem" }}>Total Doctors</h4>
              <h2 style={{ color: "#00203f", margin: 0, fontSize: "2.2rem" }}>{data.doctors}</h2>
            </div>

            <div style={statCard("Departments", data.departments, "🏢", "#9b59b6")}>
              <span style={{ fontSize: "2.5rem" }}>🏢</span>
              <h4 style={{ color: "#777", margin: "10px 0 5px 0", textTransform: "uppercase", fontSize: "0.8rem" }}>Departments</h4>
              <h2 style={{ color: "#00203f", margin: 0, fontSize: "2.2rem" }}>{data.departments}</h2>
            </div>

            <div style={statCard("Appointments", data.appointments, "📅", "#e67e22")}>
              <span style={{ fontSize: "2.5rem" }}>📅</span>
              <h4 style={{ color: "#777", margin: "10px 0 5px 0", textTransform: "uppercase", fontSize: "0.8rem" }}>Appointments</h4>
              <h2 style={{ color: "#00203f", margin: 0, fontSize: "2.2rem" }}>{data.appointments}</h2>
            </div>
          </div>

          {/* Aesthetic Detail Section */}
          <div style={{ marginTop: "50px", padding: "30px", background: "rgba(0, 74, 153, 0.05)", borderRadius: "15px", border: "1px dashed #004a99" }}>
            <h4 style={{ color: "#004a99", marginTop: 0 }}>Metric Overview</h4>
            <p style={{ color: "#555", fontSize: "0.9rem", lineHeight: "1.6" }}>
              These counts are fetched directly from the database using SQL aggregate functions. 
              The system currently maintains a ratio of <b>{(data.patients / data.doctors).toFixed(1)}</b> patients per doctor.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Analytics;