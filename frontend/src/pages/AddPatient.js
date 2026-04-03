import { useState } from "react";
import API from "../api/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

function AddPatient() {
  const [data, setData] = useState({
    name: "",
    age: "",
    gender: "",
    phone: ""
  });

  const [message, setMessage] = useState({ text: "", type: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/patients/add", data);
      setMessage({ text: "Patient successfully registered!", type: "success" });
      setTimeout(() => navigate("/patients"), 2000);
    } catch (err) {
      console.log(err);
      setMessage({ text: "Error: Database constraint violated. Please check your inputs.", type: "error" });
    }
  };

  const containerStyle = {
    minHeight: "100vh",
    backgroundImage: "linear-gradient(rgba(244, 247, 246, 0.85), rgba(244, 247, 246, 0.85)), url('https://images.unsplash.com/photo-1512678080530-7760d81faba6?q=80&w=2074&auto=format&fit=crop')",
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
    fontFamily: "'Segoe UI', Roboto, sans-serif"
  };

  const formCardStyle = {
    background: "rgba(255, 255, 255, 0.95)",
    padding: "40px",
    borderRadius: "20px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    maxWidth: "500px",
    width: "100%",
    backdropFilter: "blur(5px)",
    border: "1px solid rgba(0, 74, 153, 0.1)"
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    margin: "8px 0 20px 0",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "1rem",
    boxSizing: "border-box",
    outline: "none"
  };

  const labelStyle = {
    fontWeight: "600",
    color: "#00203f",
    fontSize: "0.85rem",
    textTransform: "uppercase"
  };

  return (
    <div style={containerStyle}>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "50px" }}>
          
          <div style={{ width: "100%", maxWidth: "500px", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h2 style={{ color: "#00203f", margin: 0 }}>Register New Patient</h2>
            <button 
              onClick={() => navigate("/patients")}
              style={{ background: "none", border: "none", color: "#004a99", cursor: "pointer", fontWeight: "600" }}
            >
              ← Back to Records
            </button>
          </div>

          <div style={formCardStyle}>
            {message.text && (
              <div style={{
                padding: "12px",
                marginBottom: "20px",
                borderRadius: "8px",
                textAlign: "center",
                fontWeight: "500",
                backgroundColor: message.type === "success" ? "#d4edda" : "#f8d7da",
                color: message.type === "success" ? "#155724" : "#721c24",
                border: `1px solid ${message.type === "success" ? "#c3e6cb" : "#f5c6cb"}`
              }}>
                {message.type === "success" ? "✓ " : "✕ "} {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <label style={labelStyle}>Patient Name</label>
              <input 
                required
                style={inputStyle}
                placeholder="Full Name" 
                onChange={e => setData({...data, name: e.target.value})} 
              />
              
              <div style={{ display: "flex", gap: "15px" }}>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Age</label>
                  <input 
                    required
                    type="number"
                    style={inputStyle}
                    placeholder="25" 
                    onChange={e => setData({...data, age: e.target.value})} 
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Gender</label>
                  <select 
                    required
                    style={inputStyle}
                    value={data.gender}
                    onChange={e => setData({...data, gender: e.target.value})}
                  >
                    <option value="" disabled>Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <label style={labelStyle}>Phone Number</label>
              <input 
                required
                type="tel"
                style={inputStyle}
                placeholder="+91 XXXXX XXXXX" 
                onChange={e => setData({...data, phone: e.target.value})} 
              />
              
              <button 
                type="submit"
                style={{
                  width: "100%",
                  padding: "14px",
                  background: "#004a99",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  fontWeight: "700",
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(0,74,153,0.3)",
                  transition: "0.3s",
                  marginTop: "10px"
                }}
                onMouseOver={(e) => e.target.style.background = "#003366"}
                onMouseOut={(e) => e.target.style.background = "#004a99"}
              >
                Add Patient to Database
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddPatient;