import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const navItemStyle = {
    cursor: "pointer",
    fontWeight: "500",
    padding: "8px 12px",
    borderRadius: "5px",
    transition: "0.3s",
    border: "1px solid transparent", // Hidden border by default
    color: "#e0e0e0"
  };

  const handleHover = (e) => {
    e.target.style.border = "1px solid #00f2fe";
    e.target.style.color = "#00f2fe";
  };

  const handleMouseOut = (e) => {
    e.target.style.border = "1px solid transparent";
    e.target.style.color = "#e0e0e0";
  };

  return (
    <nav style={{
      height: "80px", // Thicker Navbar
      background: "#00203f",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "0 40px",
      color: "white",
      boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
      position: "sticky",
      top: 0,
      zIndex: 1000
    }}>
      {/* Logo Section */}
      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <div style={{
          width: "45px",
          height: "45px",
          background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
          borderRadius: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "1.5rem",
          fontWeight: "bold",
          color: "#00203f"
        }}>H</div>
      
      </div>

      {/* Expanded Links */}
      <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
        <span style={navItemStyle} onMouseOver={handleHover} onMouseOut={handleMouseOut} onClick={() => navigate("/dashboard")}>Dashboard</span>
        <span style={navItemStyle} onMouseOver={handleHover} onMouseOut={handleMouseOut} onClick={() => navigate("/clinical")}>Clinical</span>
        <span style={navItemStyle} onMouseOver={handleHover} onMouseOut={handleMouseOut} onClick={() => navigate("/infrastructure")}>Infrastructure</span>
        <span style={navItemStyle} onMouseOver={handleHover} onMouseOut={handleMouseOut} onClick={() => navigate("/billingAndFinance")}>Finance</span>
        <span style={navItemStyle} onMouseOver={handleHover} onMouseOut={handleMouseOut} onClick={() => navigate("/analyticsHome")}>Insights</span>
        <span style={navItemStyle} onMouseOver={handleHover} onMouseOut={handleMouseOut} onClick={() => navigate("/reports")}>Reports</span>
        
        <button 
          onClick={handleLogout}
          style={{
            marginLeft: "20px",
            background: "transparent",
            color: "#ff4d4d",
            border: "2px solid #ff4d4d",
            padding: "8px 20px",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "0.3s"
          }}
          onMouseOver={(e) => { e.target.style.background = "#ff4d4d"; e.target.style.color = "white"; }}
          onMouseOut={(e) => { e.target.style.background = "transparent"; e.target.style.color = "#ff4d4d"; }}
        >
          LOGOUT
        </button>
      </div>
    </nav>
  );
}

export default Navbar;