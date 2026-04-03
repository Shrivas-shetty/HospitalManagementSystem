import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Infrastructure() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const cardStyle = {
    background: "rgba(255, 255, 255, 0.9)",
    padding: "30px",
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
    fontSize: "2.5rem",
    marginBottom: "15px"
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
              <h1 style={{ color: "#00203f", margin: 0 }}>Infrastructure Management</h1>
              <p style={{ color: "#555" }}>Manage hospital departments, room allocations, and facility logistics.</p>
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
                boxShadow: "0 4px 6px rgba(0,74,153,0.2)",
                transition: "0.3s"
              }}
              onMouseOver={(e) => e.target.style.background = "#003366"}
              onMouseOut={(e) => e.target.style.background = "#004a99"}
            >
              ← Back to Dashboard
            </button>
          </div>

          {/* Grid of Action Cards */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "25px"
          }}>
            <div 
              style={cardStyle} 
              onClick={() => navigate("/departments")} 
              onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-5px)"} 
              onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
            >
              <span style={iconStyle}>🏢</span>
              <h3 style={{ color: "#00203f", margin: "10px 0" }}>Manage Departments</h3>
              <p style={{ color: "#666", fontSize: "0.9rem" }}>Organize clinical and admin wings.</p>
            </div>

            <div 
              style={cardStyle} 
              onClick={() => navigate("/rooms")} 
              onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-5px)"} 
              onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
            >
              <span style={iconStyle}>🛌</span>
              <h3 style={{ color: "#00203f", margin: "10px 0" }}>Manage Rooms</h3>
              <p style={{ color: "#666", fontSize: "0.9rem" }}>Track availability and ward status.</p>
            </div>

            <div 
              style={cardStyle} 
              onClick={() => navigate("/admissions")} 
              onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-5px)"} 
              onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
            >
              <span style={iconStyle}>🔑</span>
              <h3 style={{ color: "#00203f", margin: "10px 0" }}>Manage Admissions</h3>
              <p style={{ color: "#666", fontSize: "0.9rem" }}>Process patient entry and ward assignment.</p>
            </div>

            <div 
              style={cardStyle} 
              onClick={() => navigate("/stayhistory")} 
              onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-5px)"} 
              onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
            >
              <span style={iconStyle}>📜</span>
              <h3 style={{ color: "#00203f", margin: "10px 0" }}>View Stay History</h3>
              <p style={{ color: "#666", fontSize: "0.9rem" }}>Historical logs of patient occupancy.</p>
            </div>
          </div>

          {/* Logout Section */}
          <div style={{ marginTop: "50px", textAlign: "right" }}>
             <button 
               onClick={handleLogout}
               style={{ 
                 background: "none", 
                 border: "none", 
                 color: "#ff4d4d", 
                 cursor: "pointer", 
                 fontWeight: "600", 
                 fontSize: "0.9rem",
                 opacity: "0.8"
               }}
             >
               Session Logout
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Infrastructure;