import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{
      height: "100vh",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      // Background image with a dark overlay to make text pop
      backgroundImage: "linear-gradient(rgba(0, 32, 63, 0.7), rgba(0, 32, 63, 0.7)), url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=2053')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    }}>
      <div style={{
        background: "rgba(255, 255, 255, 0.95)", // Semi-transparent white
        padding: "50px",
        borderRadius: "15px",
        textAlign: "center",
        boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
        maxWidth: "450px",
        width: "90%"
      }}>
        <div style={{ color: "#004a99", marginBottom: "20px" }}>
           {/* Replace with your logo image later */}
           <h1 style={{ fontSize: "2.2rem", fontWeight: "700", margin: "0" }}>HMS</h1>
           <div style={{ height: "4px", width: "50px", background: "#00f2fe", margin: "10px auto" }}></div>
        </div>
        
        <h2 style={{ color: "#333", fontSize: "1.5rem", marginBottom: "10px" }}>
          Hospital Management System
        </h2>
        <p style={{ color: "#666", lineHeight: "1.6", marginBottom: "30px" }}>
          A secure portal for healthcare professionals to manage patients, 
          doctors, and clinical records efficiently.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <button
            onClick={() => navigate("/login")}
            style={{
              padding: "12px",
              fontSize: "1rem",
              fontWeight: "600",
              color: "#fff",
              background: "#004a99",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "0.3s",
              boxShadow: "0 4px 6px rgba(0,74,153,0.2)"
            }}
            onMouseOver={(e) => e.target.style.background = "#003366"}
            onMouseOut={(e) => e.target.style.background = "#004a99"}
          >
            Sign In to Dashboard
          </button>

          <button
            onClick={() => navigate("/register")}
            style={{
              padding: "12px",
              fontSize: "1rem",
              fontWeight: "600",
              color: "#004a99",
              background: "transparent",
              border: "2px solid #004a99",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "0.3s"
            }}
            onMouseOver={(e) => {
              e.target.style.background = "#004a99";
              e.target.style.color = "#fff";
            }}
            onMouseOut={(e) => {
              e.target.style.background = "transparent";
              e.target.style.color = "#004a99";
            }}
          >
            Create New Account
          </button>
        </div>
        
        <p style={{ marginTop: "30px", fontSize: "0.8rem", color: "#999" }}>
          &copy; 2026 Hospital Management System.
        </p>
      </div>
    </div>
  );
}

export default Home;