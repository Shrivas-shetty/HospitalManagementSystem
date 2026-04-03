import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Dashboard() {
  const navigate = useNavigate();

  const cardStyle = {
    background: "rgba(255, 255, 255, 0.9)", // Slight transparency to show background
    padding: "35px",
    borderRadius: "20px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    textAlign: "center",
    cursor: "pointer",
    transition: "0.4s",
    border: "1px solid rgba(0, 74, 153, 0.1)",
    backdropFilter: "blur(5px)" // Glass effect
  };

  return (
    <div style={{ 
      minHeight: "100vh",
      // Pale Hospital Background Logic
      backgroundImage: "linear-gradient(rgba(244, 247, 246, 0.85), rgba(244, 247, 246, 0.85)), url('https://images.unsplash.com/photo-1512678080530-7760d81faba6?q=80&w=2074&auto=format&fit=crop')",
      backgroundSize: "cover",
      backgroundAttachment: "fixed",
      backgroundPosition: "center"
    }}>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        
        <div style={{ flex: 1, padding: "50px" }}>
          <header style={{ marginBottom: "40px" }}>
            <h1 style={{ color: "#00203f", margin: 0, fontSize: "2.5rem" }}>Hospital Dashboard</h1>
            <p style={{ color: "#555", fontSize: "1.1rem" }}>Welcome, Administrator. Select a module to begin.</p>
          </header>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "30px"
          }}>
            {/* Category Cards */}
            {[
              { title: "Clinical", path: "/clinical", icon: "🩺", desc: "Patient records & Doctor schedules" },
              { title: "Infrastructure", path: "/infrastructure", icon: "🏢", desc: "Rooms, Wards & Admissions" },
              { title: "Billing & Finance", path: "/billingAndFinance", icon: "💰", desc: "Invoices, Payments & Revenue" },
              { title: "Analytics", path: "/analyticsHome", icon: "📈", desc: "Performance & Hospital Statistics" }
            ].map((item, idx) => (
              <div 
                key={idx}
                style={cardStyle} 
                onClick={() => navigate(item.path)}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px)";
                  e.currentTarget.style.boxShadow = "0 15px 35px rgba(0,0,0,0.2)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.1)";
                }}
              >
                <div style={{ fontSize: "3rem", marginBottom: "15px" }}>{item.icon}</div>
                <h3 style={{ color: "#004a99", margin: "10px 0" }}>{item.title}</h3>
                <p style={{ color: "#666", fontSize: "0.95rem" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;