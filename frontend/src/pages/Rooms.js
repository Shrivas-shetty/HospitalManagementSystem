import { useEffect, useState } from "react";
import API from "../api/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [editData, setEditData] = useState(null);
  const [message, setMessage] = useState({ text: "", type: "" });
  const navigate = useNavigate();

  const fetchRooms = () => {
    API.get("/rooms")
      .then(res => setRooms(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleDelete = async (id) => {
    try {
      await API.delete(`/rooms/delete/${id}`);
      setMessage({ text: "Room record deleted successfully.", type: "success" });
      fetchRooms();
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    } catch (err) {
      setMessage({ text: "Error deleting room.", type: "error" });
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/rooms/update/${editData.room_id}`, editData);
      setMessage({ text: "Room details updated!", type: "success" });
      setEditData(null);
      fetchRooms();
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    } catch (err) {
      setMessage({ text: "Update failed.", type: "error" });
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    }
  };

  const containerStyle = {
    minHeight: "100vh",
    backgroundImage: "linear-gradient(rgba(244, 247, 246, 0.9), rgba(244, 247, 246, 0.9)), url('https://images.unsplash.com/photo-1512678080530-7760d81faba6?q=80&w=2074&auto=format&fit=crop')",
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
    fontFamily: "'Segoe UI', Roboto, sans-serif"
  };

  const cardStyle = {
    background: "rgba(255, 255, 255, 0.95)",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0 8px 30px rgba(0,0,0,0.05)",
    backdropFilter: "blur(5px)",
    border: "1px solid rgba(0, 74, 153, 0.1)"
  };

  return (
    <div style={containerStyle}>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ flex: 1, padding: "40px" }}>
          
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
            <div>
              <h1 style={{ color: "#00203f", margin: 0 }}>Facility Inventory</h1>
              <p style={{ color: "#666" }}>Monitor room availability and infrastructure status.</p>
            </div>
            <button 
              onClick={() => navigate("/rooms/add-room")}
              style={addBtnStyle}
            >
              + Add New Room
            </button>
          </div>

          {message.text && (
            <div style={{ ...msgStyle, backgroundColor: message.type === "success" ? "#d4edda" : "#f8d7da", color: message.type === "success" ? "#155724" : "#721c24" }}>
              {message.text}
            </div>
          )}

          {/* EDIT SECTION CARD */}
          {editData && (
            <div style={{ ...cardStyle, marginBottom: "30px", borderLeft: "5px solid #004a99" }}>
              <h3 style={{ marginTop: 0 }}>Update Room: {editData.room_number}</h3>
              <form onSubmit={handleUpdate} style={{ display: "flex", gap: "15px", alignItems: "flex-end" }}>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Room Number</label>
                  <input style={inputStyle} value={editData.room_number} onChange={(e) => setEditData({ ...editData, room_number: e.target.value })} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Room Type</label>
                  <select style={inputStyle} value={editData.type} onChange={(e) => setEditData({ ...editData, type: e.target.value })}>
                    <option value="General">General</option>
                    <option value="Private">Private</option>
                    <option value="Semi-Private">Semi-Private</option>
                    <option value="ICU">ICU</option>
                  </select>
                </div>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Current Status</label>
                  <select style={inputStyle} value={editData.status} onChange={(e) => setEditData({ ...editData, status: e.target.value })}>
                    <option value="Available">Available</option>
                    <option value="Occupied">Occupied</option>
                    <option value="Maintenance">Maintenance</option>
                  </select>
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button type="submit" style={saveBtnStyle}>Update</button>
                  <button type="button" onClick={() => setEditData(null)} style={cancelBtnStyle}>Cancel</button>
                </div>
              </form>
            </div>
          )}

          {/* ROOMS TABLE */}
          <div style={cardStyle}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ textAlign: "left", borderBottom: "2px solid #004a99" }}>
                  <th style={thStyle}>Database ID</th>
                  <th style={thStyle}>Room Number</th>
                  <th style={thStyle}>Category</th>
                  <th style={thStyle}>Status</th>
                  <th style={thStyle}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {rooms.map(r => (
                  <tr key={r.room_id} style={trStyle}>
                    <td style={tdStyle}><b>#{r.room_id}</b></td>
                    <td style={tdStyle}><span style={roomTagStyle}>{r.room_number}</span></td>
                    <td style={tdStyle}>{r.type}</td>
                    <td style={tdStyle}>
                      <span style={{
                        ...statusPill,
                        backgroundColor: r.status === "Available" ? "#d4edda" : r.status === "Occupied" ? "#fff3cd" : "#f8d7da",
                        color: r.status === "Available" ? "#155724" : r.status === "Occupied" ? "#856404" : "#721c24"
                      }}>
                        {r.status}
                      </span>
                    </td>
                    <td style={tdStyle}>
                      <button onClick={() => setEditData(r)} style={editActionBtn}>Modify</button>
                      <button onClick={() => handleDelete(r.room_id)} style={deleteActionBtn}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
}

// Internal CSS
const addBtnStyle = { padding: "12px 24px", background: "#004a99", color: "white", border: "none", borderRadius: "8px", fontWeight: "600", cursor: "pointer", boxShadow: "0 4px 10px rgba(0,74,153,0.3)" };
const inputStyle = { width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ddd", marginTop: "5px" };
const labelStyle = { fontSize: "0.75rem", fontWeight: "bold", color: "#555", textTransform: "uppercase" };
const saveBtnStyle = { padding: "10px 20px", background: "#27ae60", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600" };
const cancelBtnStyle = { padding: "10px 20px", background: "#95a5a6", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600" };
const thStyle = { padding: "15px", color: "#004a99", fontWeight: "600" };
const tdStyle = { padding: "15px", borderBottom: "1px solid #eee" };
const trStyle = { transition: "0.2s" };
const editActionBtn = { background: "none", border: "none", color: "#3498db", fontWeight: "bold", cursor: "pointer", marginRight: "15px" };
const deleteActionBtn = { background: "none", border: "none", color: "#e74c3c", fontWeight: "bold", cursor: "pointer" };
const msgStyle = { padding: "15px", borderRadius: "10px", marginBottom: "20px", textAlign: "center", fontWeight: "600" };
const roomTagStyle = { background: "rgba(0, 32, 63, 0.05)", padding: "5px 12px", borderRadius: "4px", fontWeight: "700", color: "#00203f" };
const statusPill = { padding: "4px 12px", borderRadius: "20px", fontSize: "0.75rem", fontWeight: "bold" };

export default Rooms;