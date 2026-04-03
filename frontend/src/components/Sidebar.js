import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const menuSection = {
    marginBottom: "20px",
  };

  const sectionTitle = {
    fontSize: "0.75rem",
    color: "#4facfe",
    textTransform: "uppercase",
    letterSpacing: "1px",
    marginBottom: "10px",
    paddingLeft: "10px"
  };

  const linkStyle = {
    display: "block",
    padding: "10px",
    color: "#fff",
    textDecoration: "none",
    fontSize: "0.9rem",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "0.3s"
  };

  return (
    <div style={{
      width: "240px",
      background: "#00203f",
      height: "calc(100vh - 60px)",
      padding: "20px",
      boxSizing: "border-box",
      borderRight: "1px solid rgba(255,255,255,0.1)",
      overflowY: "auto"
    }}>
      <div style={menuSection}>
        <p style={sectionTitle}>Clinical</p>
        <div style={linkStyle} onClick={() => navigate("/patients")}>Patients</div>
        <div style={linkStyle} onClick={() => navigate("/doctors")}>Doctors</div>
        <div style={linkStyle} onClick={() => navigate("/appointments")}>Appointments</div>
        <div style={linkStyle} onClick={() => navigate("/prescriptions")}>Prescriptions</div>
      </div>

      <div style={menuSection}>
        <p style={sectionTitle}>Infrastructure</p>
        <div style={linkStyle} onClick={() => navigate("/departments")}>Departments</div>
        <div style={linkStyle} onClick={() => navigate("/rooms")}>Rooms</div>
        <div style={linkStyle} onClick={() => navigate("/admissions")}>Admissions</div>
        <div style={linkStyle} onClick={() => navigate("/stayhistory")}>Stay History</div>
      </div>

      <div style={menuSection}>
        <p style={sectionTitle}>Billing & Finance</p>
        <div style={linkStyle} onClick={() => navigate("/bills")}>Bills</div>
        <div style={linkStyle} onClick={() => navigate("/payments")}>Payments</div>
        <div style={linkStyle} onClick={() => navigate("/bills/billingAnalytics")}>Billing Analytics</div>
      </div>

      <div style={menuSection}>
        <p style={sectionTitle}>Insights</p>
        <div style={linkStyle} onClick={() => navigate("/analytics")}>Main Analytics</div>
        <div style={linkStyle} onClick={() => navigate("/reports")}>Reports</div>
      </div>
    </div>
  );
}

export default Sidebar;