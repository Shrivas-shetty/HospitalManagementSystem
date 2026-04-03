import { useState } from "react";
import API from "../api/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function PatientsByRoom() {
  const [roomType, setRoomType] = useState("");
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPatients = (type) => {
    if (!type) {
      setPatients([]);
      setRoomType("");
      return;
    };
    setLoading(true);
    setRoomType(type);
    
    API.get(`/patients/room-type/${type}`)
      .then(res => {
        setPatients(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  const containerStyle = {
    minHeight: "100vh",
    backgroundImage: "linear-gradient(rgba(244, 247, 246, 0.9), rgba(244, 247, 246, 0.9)), url('https://images.unsplash.com/photo-1512678080530-7760d81faba6?q=80&w=2074&auto=format&fit=crop')",
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
    fontFamily: "'Segoe UI', Roboto, sans-serif"
  };

  const glassCard = {
    background: "rgba(255, 255, 255, 0.95)",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0 8px 30px rgba(0,0,0,0.05)",
    backdropFilter: "blur(5px)",
    border: "1px solid rgba(52, 152, 219, 0.1)",
    overflow: "hidden"
  };

  return (
    <div style={containerStyle}>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        
        <div style={{ flex: 1, padding: "40px" }}>
          
          <div style={{ marginBottom: "30px" }}>
            <h1 style={{ color: "#00203f", margin: 0 }}>Room Allocation Search</h1>
            <p style={{ color: "#666" }}>Filter currently admitted patients by their assigned room category.</p>
          </div>

          {/* Filter Bar */}
          <div style={{ ...glassCard, marginBottom: "20px", padding: "20px", display: "flex", alignItems: "center", gap: "20px" }}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Select Classification</label>
              <select 
                onChange={(e) => fetchPatients(e.target.value)} 
                style={selectStyle}
              >
                <option value="">-- Choose Room Type --</option>
                <option value="General">General Ward</option>
                <option value="Private">Private Suite</option>
                <option value="ICU">Intensive Care Unit (ICU)</option>
                <option value="Semi-Private">Semi-Private</option>
              </select>
            </div>
            {patients.length > 0 && (
              <div style={countBadge}>
                {patients.length} {patients.length === 1 ? 'Patient' : 'Patients'} Found
              </div>
            )}
          </div>

          {/* Results Area */}
          <div style={glassCard}>
            {loading ? (
              <div style={{ textAlign: "center", padding: "40px" }}>
                <h3 style={{ color: "#3498db" }}>Querying facility database...</h3>
              </div>
            ) : patients.length > 0 ? (
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ textAlign: "left", borderBottom: "2px solid #3498db" }}>
                    <th style={thStyle}>Patient ID</th>
                    <th style={thStyle}>Full Name</th>
                    <th style={thStyle}>Room Assignment</th>
                    <th style={thStyle}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map((p) => (
                    <tr key={p.patient_id} style={trStyle}>
                      <td style={tdStyle}><b>PID-{p.patient_id}</b></td>
                      <td style={{ ...tdStyle, fontWeight: "600", color: "#2c3e50" }}>{p.name}</td>
                      <td style={tdStyle}>
                        <span style={roomBadge}>Room {p.room_number}</span>
                      </td>
                      <td style={tdStyle}>
                        <span style={typeBadge}>{p.type}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div style={{ padding: "60px", textAlign: "center", color: "#95a5a6" }}>
                <div style={{ fontSize: "3rem", marginBottom: "10px" }}>🔍</div>
                <h3>{roomType ? `No patients currently in ${roomType} rooms.` : "Please select a room type to begin search."}</h3>
              </div>
            )}
          </div>

          <div style={{ marginTop: "20px", fontSize: "0.8rem", color: "#7f8c8d", textAlign: "center" }}>
            Real-time occupancy data as of {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  );
}

// Styling Constants
const selectStyle = { 
  width: "100%", 
  padding: "12px", 
  borderRadius: "8px", 
  border: "1px solid #ddd", 
  backgroundColor: "#fff",
  fontSize: "1rem",
  color: "#2c3e50",
  marginTop: "8px"
};

const labelStyle = { 
  fontSize: "0.75rem", 
  fontWeight: "bold", 
  color: "#555", 
  textTransform: "uppercase", 
  letterSpacing: "1px" 
};

const thStyle = { padding: "18px 15px", fontSize: "14px", fontWeight: "700", color: "#3498db" };
const tdStyle = { padding: "18px 15px", fontSize: "14px" };
const trStyle = { borderBottom: "1px solid #f0f0f0", transition: "0.2s" };

const roomBadge = { 
  background: "#00203f", 
  color: "#fff", 
  padding: "4px 10px", 
  borderRadius: "6px", 
  fontSize: "0.85rem", 
  fontWeight: "600" 
};

const typeBadge = { 
  background: "#e8f4fd", 
  color: "#3498db", 
  padding: "4px 10px", 
  borderRadius: "6px", 
  fontSize: "0.85rem", 
  fontWeight: "600" 
};

const countBadge = {
  background: "#27ae60",
  color: "white",
  padding: "10px 20px",
  borderRadius: "10px",
  fontWeight: "bold",
  boxShadow: "0 4px 10px rgba(39,174,96,0.2)"
};

export default PatientsByRoom;