import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function BillingAndFinance() {
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
    fontSize: "2rem",
    marginBottom: "10px"
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
          {/* Header Row */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
            <div>
              <h1 style={{ color: "#00203f", margin: 0 }}>Billing & Finance</h1>
              <p style={{ color: "#555" }}>Manage patient invoicing, payment tracking, and financial insights.</p>
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
                cursor: "pointer"
              }}
            >
              ← Back to Dashboard
            </button>
          </div>

          {/* Action Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px"
          }}>
            <div style={cardStyle} onClick={() => navigate("/bills")} onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-5px)"} onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}>
              <span style={iconStyle}>💵</span>
              <h4 style={{ color: "#00203f", margin: 0 }}>Manage Bills</h4>
            </div>

            <div style={cardStyle} onClick={() => navigate("/payments")} onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-5px)"} onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}>
              <span style={iconStyle}>💳</span>
              <h4 style={{ color: "#00203f", margin: 0 }}>View Payments</h4>
            </div>

            <div style={cardStyle} onClick={() => navigate("/bills/billingAnalytics")} onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-5px)"} onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}>
              <span style={iconStyle}>📈</span>
              <h4 style={{ color: "#00203f", margin: 0 }}>Billing Analytics</h4>
            </div>

            <div style={cardStyle} onClick={() => navigate("/analytics")} onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-5px)"} onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}>
              <span style={iconStyle}>📊</span>
              <h4 style={{ color: "#00203f", margin: 0 }}>General Analytics</h4>
            </div>

            <div style={cardStyle} onClick={() => navigate("/reports")} onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-5px)"} onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}>
              <span style={iconStyle}>📑</span>
              <h4 style={{ color: "#00203f", margin: 0 }}>Finance Reports</h4>
            </div>

            <div style={cardStyle} onClick={() => navigate("/patients/patientsbyroom")} onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-5px)"} onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}>
              <span style={iconStyle}>🏨</span>
              <h4 style={{ color: "#00203f", margin: 0 }}>Room Revenue</h4>
            </div>
          </div>

          <div style={{ marginTop: "40px", textAlign: "right" }}>
             <button 
               onClick={handleLogout}
               style={{ background: "none", border: "none", color: "#ff4d4d", cursor: "pointer", fontWeight: "600" }}
             >
               Sign Out
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BillingAndFinance;