import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

function Register() {
  const [data, setData] = useState({
    username: "",
    password: "",
    role: ""
  });
  
  // Custom notification state
  const [message, setMessage] = useState({ text: "", type: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", data);
      setMessage({ text: "Registration Successful! Redirecting...", type: "success" });
      
      // Delay navigation so user sees the success message
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      console.log(err);
      setMessage({ text: "Error registering. Username might be taken.", type: "error" });
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    }
  };

  const inputStyle = {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "1rem",
    outline: "none",
    width: "100%",
    boxSizing: "border-box"
  };

  return (
    <div style={{
      height: "100vh",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundImage: "linear-gradient(rgba(0, 32, 63, 0.7), rgba(0, 32, 63, 0.7)), url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=2053')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    }}>
      <div style={{
        background: "rgba(255, 255, 255, 0.95)",
        padding: "50px",
        borderRadius: "15px",
        textAlign: "center",
        boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
        maxWidth: "400px",
        width: "90%"
      }}>
        <div style={{ color: "#004a99", marginBottom: "20px" }}>
           <h1 style={{ fontSize: "2.2rem", fontWeight: "700", margin: "0" }}>HMS</h1>
           <div style={{ height: "4px", width: "50px", background: "#00f2fe", margin: "10px auto" }}></div>
        </div>

        {/* Custom UI Notification */}
        {message.text && (
          <div style={{
            padding: "10px",
            marginBottom: "15px",
            borderRadius: "8px",
            fontSize: "0.85rem",
            fontWeight: "600",
            backgroundColor: message.type === "success" ? "#d4edda" : "#f8d7da",
            color: message.type === "success" ? "#155724" : "#721c24",
            border: `1px solid ${message.type === "success" ? "#c3e6cb" : "#f5c6cb"}`,
          }}>
            {message.type === "success" ? "✓ " : "✕ "} {message.text}
          </div>
        )}

        <h2 style={{ color: "#333", fontSize: "1.5rem", marginBottom: "10px" }}>Create Account</h2>
        <p style={{ color: "#666", fontSize: "0.9rem", marginBottom: "25px" }}>
          Join the healthcare management network.
        </p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <input
            placeholder="Username"
            required
            style={inputStyle}
            onChange={(e) => setData({ ...data, username: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            required
            style={inputStyle}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />

          <select
            required
            style={inputStyle}
            value={data.role}
            onChange={(e) => setData({ ...data, role: e.target.value })}
          >
            <option value="" disabled>Select Role</option>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </select>

          <button
            type="submit"
            style={{
              marginTop: "10px",
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
            Register Now
          </button>

          {/* BACK BUTTON */}
          <button
            type="button"
            onClick={() => navigate("/")}
            style={{
              padding: "10px",
              fontSize: "0.9rem",
              fontWeight: "600",
              color: "#004a99",
              background: "transparent",
              border: "2px solid #004a99",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "0.3s",
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
            Back
          </button>
        </form>

        <p style={{ marginTop: "25px", fontSize: "0.9rem", color: "#666" }}>
          Already registered? <span 
            onClick={() => navigate("/login")}
            style={{ color: "#004a99", cursor: "pointer", fontWeight: "700" }}
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;