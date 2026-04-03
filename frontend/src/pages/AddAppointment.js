import { useState } from "react";
import API from "../api/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

function AddAppointment() {
  const [data, setData] = useState({
    patient_id: "",
    doctor_id: "",
    appointment_date: "",
    status: "Scheduled"
  });

  const [message, setMessage] = useState({ text: "", type: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const rawDateTime = data.appointment_date.replace('T', ' ');
    
    const finalData = {
      ...data,
      appointment_date: rawDateTime 
    };

    try {
      await API.post("/appointments/book", finalData);
      setMessage({ text: `Appointment booked for: ${rawDateTime}`, type: "success" });
      setTimeout(() => navigate("/appointments"), 2000);
    } catch (err) {
      console.error(err);
      setMessage({ text: "Database constraints viloated. Check IDs.", type: "error" });
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
    borderRadius: "15px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    maxWidth: "500px",
    width: "100%",
    backdropFilter: "blur(5px)",
    border: "1px solid rgba(0, 74, 153, 0.1)"
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    margin: "10px 0 20px 0",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "1rem",
    boxSizing: "border-box",
    outline: "none"
  };

  const labelStyle = {
    fontWeight: "600",
    color: "#00203f",
    fontSize: "0.9rem"
  };

  return (
    <div style={containerStyle}>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "50px" }}>
          
          <div style={{ width: "100%", maxWidth: "500px", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h2 style={{ color: "#00203f", margin: 0 }}>Book Appointment</h2>
            <button 
              onClick={() => navigate("/appointments")}
              style={{ background: "none", border: "none", color: "#004a99", cursor: "pointer", fontWeight: "600" }}
            >
              ← View All
            </button>
          </div>

          <div style={formCardStyle}>
            {message.text && (
              <div style={{
                padding: "12px",
                marginBottom: "20px",
                borderRadius: "8px",
                textAlign: "center",
                backgroundColor: message.type === "success" ? "#d4edda" : "#f8d7da",
                color: message.type === "success" ? "#155724" : "#721c24",
                border: `1px solid ${message.type === "success" ? "#c3e6cb" : "#f5c6cb"}`
              }}>
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <label style={labelStyle}>Patient ID</label>
              <input 
                required
                style={inputStyle}
                placeholder="Enter Patient ID" 
                onChange={e => setData({...data, patient_id: e.target.value})} 
              />
              
              <label style={labelStyle}>Doctor ID</label>
              <input 
                required
                style={inputStyle}
                placeholder="Enter Doctor ID" 
                onChange={e => setData({...data, doctor_id: e.target.value})} 
              />

              <label style={labelStyle}>Date & Time</label>
              <input 
                required
                type="datetime-local" 
                style={inputStyle}
                value={data.appointment_date}
                onChange={e => setData({...data, appointment_date: e.target.value})} 
              />
              
              <label style={labelStyle}>Status</label>
              <select 
                style={inputStyle}
                value={data.status} 
                onChange={e => setData({...data, status: e.target.value})}
              >
                <option value="Scheduled">Scheduled</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
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
                  boxShadow: "0 4px 10px rgba(0,74,153,0.3)",
                  transition: "0.3s"
                }}
                onMouseOver={(e) => e.target.style.background = "#003366"}
                onMouseOut={(e) => e.target.style.background = "#004a99"}
              >
                Confirm Booking
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddAppointment;