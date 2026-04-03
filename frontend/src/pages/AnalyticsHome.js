import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function AnalyticsHome() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const cardStyle = {
    background: "rgba(255, 255, 255, 0.9)",
    padding: "25px",
    borderRadius: "15px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
    textAlign: "center",
    cursor: "pointer",
    transition: "0.3s transform",
    border: "1px solid rgba(0, 74, 153, 0.1)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backdropFilter: "blur(4px)"
  };

  const iconStyle = {
    fontSize: "2.2rem",
    marginBottom: "12px"
  };

  return (
    <div style={{ 
      minHeight: "100vh",
      backgroundImage: "linear-gradient(rgba(244, 247, 246, 0.85), rgba(244, 247, 246, 0.85)), url('https://images.unsplash.com/photo-1512678080530-7760d81faba6?q=80&w=2074&auto=format&fit=crop')",
      backgroundSize: "cover",
      backgroundAttachment: "fixed",
      backgroundPosition: "center",
      fontFamily: "'Segoe UI', Roboto, sans-serif"
    }}>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        
        <div style={{ flex: 1, padding: "40px" }}>
          {/* Header Section */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
            <div>
              <h1 style={{ color: "#00203f", margin: 0 }}>Analytics & Insights</h1>
              <p style={{ color: "#555" }}>Review hospital performance, patient statistics, and financial trends.</p>
            </div>
            <button 
              onClick={() => navigate("/dashboard")}
              style={{
                padding: "10px 20px",
                background: "#004a99",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontWeight: "600",
                cursor: "pointer",
                boxShadow: "0 4px 6px rgba(0,74,153,0.2)"
              }}
            >
              ← Back to Dashboard
            </button>
          </div>

          {/* Analytics Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "25px"
          }}>
            <div style={cardStyle} onClick={() => navigate("/analytics")} onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-5px)"} onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}>
              <span style={iconStyle}>🔍</span>
              <h4 style={{ color: "#00203f", margin: 0 }}>View Analytics</h4>
              <p style={{ color: "#777", fontSize: "0.85rem", marginTop: "5px" }}>General operational data</p>
            </div>

            <div style={cardStyle} onClick={() => navigate("/reports")} onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-5px)"} onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}>
              <span style={iconStyle}>📑</span>
              <h4 style={{ color: "#00203f", margin: 0 }}>Reports</h4>
              <p style={{ color: "#777", fontSize: "0.85rem", marginTop: "5px" }}>Generated system logs</p>
            </div>

            <div style={cardStyle} onClick={() => navigate("/patients/patientsbyroom")} onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-5px)"} onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}>
              <span style={iconStyle}>👥</span>
              <h4 style={{ color: "#00203f", margin: 0 }}>Patients By Room</h4>
              <p style={{ color: "#777", fontSize: "0.85rem", marginTop: "5px" }}>Occupancy distribution</p>
            </div>

            <div style={cardStyle} onClick={() => navigate("/bills/billingAnalytics")} onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-5px)"} onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}>
              <span style={iconStyle}>💹</span>
              <h4 style={{ color: "#00203f", margin: 0 }}>Billing Analytics</h4>
              <p style={{ color: "#777", fontSize: "0.85rem", marginTop: "5px" }}>Revenue and payment trends</p>
            </div>
          </div>

          {/* Minimal Footer Logout */}
          <div style={{ marginTop: "60px", textAlign: "center" }}>
             <button 
               onClick={handleLogout}
               style={{ 
                 background: "rgba(255, 77, 77, 0.1)", 
                 border: "1px solid #ff4d4d", 
                 color: "#ff4d4d", 
                 padding: "8px 20px", 
                 borderRadius: "20px", 
                 cursor: "pointer", 
                 fontWeight: "600",
                 transition: "0.3s"
               }}
               onMouseOver={(e) => { e.target.style.background = "#ff4d4d"; e.target.style.color = "#fff"; }}
               onMouseOut={(e) => { e.target.style.background = "rgba(255, 77, 77, 0.1)"; e.target.style.color = "#ff4d4d"; }}
             >
               Logout Session
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsHome;