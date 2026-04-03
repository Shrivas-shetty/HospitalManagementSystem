import { useEffect, useState } from "react";
import API from "../api/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Reports() {
  const [revenue, setRevenue] = useState([]);
  const [docStats, setDocStats] = useState([]);
  const [deptRevenue, setDeptRevenue] = useState([]);
  const [topPatients, setTopPatients] = useState([]);

  useEffect(() => {
    // Existing Views
    API.get("/reports/revenue").then(res => setRevenue(res.data)).catch(err => console.error(err));
    API.get("/reports/doctor-stats").then(res => setDocStats(res.data)).catch(err => console.error(err));
    
    // New Queries
    API.get("/reports/dept-revenue").then(res => setDeptRevenue(res.data)).catch(err => console.error(err));
    API.get("/reports/top-patients").then(res => setTopPatients(res.data)).catch(err => console.error(err));
  }, []);

  // Background style consistent with your other pages
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
        
        <div style={{ flex: 1, padding: "40px 20px", maxWidth: "1200px", margin: "0 auto" }}>
          <h2 style={{ color: "#2c3e50", marginBottom: "30px" }}>Hospital Analytics Dashboard</h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "25px" }}>
            
            {/* 1. Monthly Revenue (From View) */}
            <div style={cardStyle}>
              <h3 style={cardTitle}>Monthly Revenue</h3>
              <table style={tableStyle}>
                <thead><tr style={headerRow}><th style={thStyle}>Month</th><th style={thStyle}>Total</th></tr></thead>
                <tbody>
                  {revenue.map((item, i) => (
                    <tr key={i} style={rowStyle}><td style={tdStyle}>{item.month}</td><td style={moneyStyle}>${item.total_revenue}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 2. Doctor Workload (From View) */}
            <div style={cardStyle}>
              <h3 style={cardTitle}>Doctor Stats</h3>
              <table style={tableStyle}>
                <thead><tr style={headerRow}><th style={thStyle}>Doctor</th><th style={thStyle}>Appointments</th></tr></thead>
                <tbody>
                  {docStats.map((doc, i) => (
                    <tr key={i} style={rowStyle}><td style={tdStyle}>{doc.name}</td><td style={tdStyle}><span style={badgeStyle}>{doc.total_appointments}</span></td></tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 3. Dept-wise Revenue (JOIN) */}
            <div style={cardStyle}>
              <h3 style={cardTitle}>Revenue by Department</h3>
              <table style={tableStyle}>
                <thead><tr style={headerRow}><th style={thStyle}>Department</th><th style={thStyle}>Revenue</th></tr></thead>
                <tbody>
                  {deptRevenue.map((dept, i) => (
                    <tr key={i} style={rowStyle}><td style={tdStyle}>{dept.department}</td><td style={moneyStyle}>${dept.total_revenue}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 4. Top Paying Patients (SUBQUERY) */}
            <div style={cardStyle}>
              <h3 style={cardTitle}> Top Paying Patients</h3>
              <div style={{ padding: "10px 0" }}>
                {topPatients.map((p, i) => (
                  <div key={i} style={patientCard}>
                    <div style={{ fontWeight: "bold" }}>{p.name}</div>
                    <div style={{ fontSize: "12px", color: "#7f8c8d" }}>ID: {p.patient_id} | {p.email}</div>
                  </div>
                ))}
                {topPatients.length === 0 && <p style={{fontSize: "14px", color: "#95a5a6"}}>Loading top patient...</p>}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

// YOUR ORIGINAL STYLES
const cardStyle = { backgroundColor: "#fff", padding: "20px", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" };
const cardTitle = { fontSize: "16px", color: "#2c3e50", borderBottom: "2px solid #3498db", paddingBottom: "10px", marginBottom: "15px", textTransform: "uppercase", letterSpacing: "1px" };
const tableStyle = { width: "100%", borderCollapse: "collapse" };
const headerRow = { textAlign: "left", color: "#7f8c8d", fontSize: "12px" };
const rowStyle = { borderBottom: "1px solid #f1f1f1" };
const thStyle = { padding: "10px 5px" };
const tdStyle = { padding: "10px 5px", fontSize: "14px" };
const moneyStyle = { ...tdStyle, fontWeight: "bold", color: "#27ae60" };
const badgeStyle = { backgroundColor: "#ebf5ff", color: "#2980b9", padding: "3px 8px", borderRadius: "12px", fontSize: "12px", fontWeight: "bold" };
const patientCard = { padding: "10px", backgroundColor: "#f9f9f9", borderRadius: "8px", marginBottom: "10px", borderLeft: "4px solid #f1c40f" };

export default Reports;