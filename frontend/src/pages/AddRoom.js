import { useState } from "react";
import API from "../api/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

function AddRoom() {
  const [data, setData] = useState({
    room_number: "",
    type: "General",
    status: "Available"
  });

  const [message, setMessage] = useState({ text: "", type: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/rooms/add", data);
      setMessage({ text: `Room ${data.room_number} added successfully!`, type: "success" });
      setTimeout(() => navigate("/rooms"), 2000);
    } catch (err) {
      console.log(err);
      setMessage({ text: "Error: Could not add room. Check if number exists.", type: "error" });
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
            <h2 style={{ color: "#00203f", margin: 0 }}>Add Facility Room</h2>
            <button 
              onClick={() => navigate("/rooms")}
              style={{ background: "none", border: "none", color: "#004a99", cursor: "pointer", fontWeight: "600" }}
            >
              ← Manage Rooms
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
                {message.type === "success" ? "🏢 " : "⚠️ "} {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <label style={labelStyle}>Room Number</label>
              <input 
                required
                style={inputStyle}
                placeholder="e.g., 402-B" 
                onChange={e => setData({...data, room_number: e.target.value})} 
              />
              
              <label style={labelStyle}>Room Type</label>
              <select 
                required
                style={inputStyle}
                value={data.type}
                onChange={e => setData({...data, type: e.target.value})}
              >
                <option value="General">General Ward</option>
                <option value="Private">Private Room</option>
                <option value="Semi-Private">Semi-Private</option>
                <option value="ICU">ICU (Intensive Care)</option>
              </select>

              <label style={labelStyle}>Initial Status</label>
              <select 
                required
                style={inputStyle}
                value={data.status}
                onChange={e => setData({...data, status: e.target.value})}
              >
                <option value="Available">Available</option>
                <option value="Occupied">Occupied</option>
                <option value="Under Maintenance">Under Maintenance</option>
              </select>
              
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
                Register Room
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddRoom;