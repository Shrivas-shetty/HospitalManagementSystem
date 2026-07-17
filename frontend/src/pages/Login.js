import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [message, setMessage] = useState({ text: "", type: "" });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { username, password });
      localStorage.setItem("token", res.data.token);

      setMessage({ text: "Login Successful! Redirecting...", type: "success" });
      setTimeout(() => navigate("/dashboard"), 1500);

    } catch (err) {
      setMessage({ text: "Invalid Username or Password", type: "error" });
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    }
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

        {message.text && (
          <div style={{
            padding: "10px",
            marginBottom: "15px",
            borderRadius: "8px",
            fontSize: "0.9rem",
            fontWeight: "600",
            backgroundColor: message.type === "success" ? "#d4edda" : "#f8d7da",
            color: message.type === "success" ? "#155724" : "#721c24",
            border: `1px solid ${message.type === "success" ? "#c3e6cb" : "#f5c6cb"}`
          }}>
            {message.type === "success" ? "✓ " : "✕ "} {message.text}
          </div>
        )}

        <h2 style={{ color: "#333", fontSize: "1.5rem", marginBottom: "10px" }}>
          Welcome Back
        </h2>

        <p style={{ color: "#666", fontSize: "0.9rem", marginBottom: "20px" }}>
          Please enter your details to access the dashboard.
        </p>

        {/* demo credentails box */}
        <div style={{
          background: "#eef6ff",
          border: "1px dashed #004a99",
          borderRadius: "8px",
          padding: "12px",
          fontSize: "0.85rem",
          color: "#003366",
          marginBottom: "20px",
          textAlign: "left"
        }}>
          <strong>Demo Access:</strong><br />
          Username: <b>admin3</b><br />
          Password: <b>3210</b><br /><br />

          <div style={{ fontSize: "0.8rem", color: "#555" }}>
            * Live backend is temporarily unavailable due to hosting limitations. <br />
            * Full source code and implementation are available on GitHub.
          </div>

          <button
            onClick={() => window.open("https://github.com/Shrivas-shetty/HospitalManagementSystem", "_blank")}
            style={{
              marginTop: "10px",
              padding: "8px 12px",
              fontSize: "0.8rem",
              fontWeight: "600",
              color: "#fff",
              background: "#004a99",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer"
            }} 
          >
            View GitHub Repository
          </button>
        </div>

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <input
            placeholder="Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              fontSize: "1rem",
              outline: "none"
            }}
          />

          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              fontSize: "1rem",
              outline: "none"
            }}
          />

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
            Sign In
          </button>

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
            Back
          </button>
        </form>

        <p style={{ marginTop: "25px", fontSize: "0.9rem", color: "#666" }}>
          New user?{" "}
          <span
            onClick={() => navigate("/register")}
            style={{ color: "#004a99", cursor: "pointer", fontWeight: "700" }}
          >
            Create an account
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;