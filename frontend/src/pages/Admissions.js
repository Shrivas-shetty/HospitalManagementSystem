import { useEffect, useState } from "react";
import API from "../api/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

function Admissions() {
  const [admissions, setAdmissions] = useState([]);
  const [editData, setEditData] = useState(null);
  const [newData, setNewData] = useState({ patient_id: '', room_id: '' });
  const [message, setMessage] = useState({ text: "", type: "" });
  const [showConfirm, setShowConfirm] = useState(null); // New state for UI confirmation
  const navigate = useNavigate();

  const fetchAdmissions = () => {
    API.get("/admissions")
      .then(res => setAdmissions(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchAdmissions();
  }, []);

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    const today = new Date().toISOString().split('T')[0];
    const payload = { ...newData, admission_date: today };

    try {
      await API.post("/admissions/add-secure", payload);
      setMessage({ text: `Success! Admission logged for ${today}`, type: "success" });
      setNewData({ patient_id: '', room_id: '' });
      fetchAdmissions();
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    } catch (err) {
      setMessage({ text: "Admission failed. Check Patient/Room IDs.", type: "error" });
    }
  };

  const handleDischarge = async (id) => {
    try {
      await API.delete(`/admissions/discharge/${id}`);
      setMessage({ text: "Patient discharged successfully.", type: "success" });
      setShowConfirm(null);
      fetchAdmissions();
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    } catch (err) {
      setMessage({ text: "Error during discharge process.", type: "error" });
      setShowConfirm(null);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...editData,
        admission_date: editData.admission_date?.substring(0, 10),
        discharge_date: editData.discharge_date?.substring(0, 10)
      };
      await API.put(`/admissions/update/${editData.admission_id}`, payload);
      setEditData(null);
      setMessage({ text: "Record updated.", type: "success" });
      fetchAdmissions();
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    } catch (err) {
      setMessage({ text: "Update failed.", type: "error" });
    }
  };

  // Modern Styling Constants
  const containerStyle = {
    minHeight: "100vh",
    backgroundImage: "linear-gradient(rgba(244, 247, 246, 0.85), rgba(244, 247, 246, 0.85)), url('https://images.unsplash.com/photo-1512678080530-7760d81faba6?q=80&w=2074&auto=format&fit=crop')",
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
    fontFamily: "'Segoe UI', Roboto, sans-serif"
  };

  const cardStyle = {
    background: "rgba(255, 255, 255, 0.95)",
    padding: "25px",
    borderRadius: "15px",
    boxShadow: "0 8px 30px rgba(0,0,0,0.05)",
    backdropFilter: "blur(5px)",
    border: "1px solid rgba(0, 74, 153, 0.1)",
    marginBottom: "30px"
  };

  return (
    <div style={containerStyle}>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ flex: 1, padding: "40px" }}>
          
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
            <h1 style={{ color: "#00203f", margin: 0 }}>Admission Management</h1>
            <button onClick={() => navigate("/dashboard")} style={backBtnStyle}>← Dashboard</button>
          </div>

          {/* Success/Error Message */}
          {message.text && (
            <div style={{ ...msgStyle, backgroundColor: message.type === "success" ? "#d4edda" : "#f8d7da", color: message.type === "success" ? "#155724" : "#721c24" }}>
              {message.text}
            </div>
          )}

          {/* UI Confirmation Message for Discharge */}
          {showConfirm && (
            <div style={{ ...msgStyle, backgroundColor: "#fff3cd", color: "#856404", border: "1px solid #ffeeba", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>Are you sure you want to discharge patient #{showConfirm}?</span>
              <div>
                <button onClick={() => handleDischarge(showConfirm)} style={{ ...submitBtnStyle, background: "#e74c3c", padding: "5px 15px", marginRight: "10px" }}>Yes, Discharge</button>
                <button onClick={() => setShowConfirm(null)} style={{ ...submitBtnStyle, background: "#95a5a6", padding: "5px 15px" }}>Cancel</button>
              </div>
            </div>
          )}

          {/* ADD SECTION */}
          <div style={cardStyle}>
            <h3 style={{ marginTop: 0, color: "#004a99" }}>Register New Admission</h3>
            <form onSubmit={handleAddSubmit} style={{ display: "flex", gap: "15px", alignItems: "flex-end" }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Patient ID</label>
                <input type="number" required style={inputStyle} value={newData.patient_id} onChange={(e) => setNewData({ ...newData, patient_id: e.target.value })} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Room ID</label>
                <input type="number" required style={inputStyle} value={newData.room_id} onChange={(e) => setNewData({ ...newData, room_id: e.target.value })} />
              </div>
              <button type="submit" style={submitBtnStyle}>Confirm Admission</button>
            </form>
          </div>

          {/* EDIT MODAL-LIKE SECTION */}
          {editData && (
            <div style={{ ...cardStyle, borderLeft: "5px solid #3498db" }}>
              <h3 style={{ marginTop: 0 }}>Update Admission #{editData.admission_id}</h3>
              <form onSubmit={handleUpdate} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "15px" }}>
                <div>
                  <label style={labelStyle}>Admission Date</label>
                  <input type="date" style={inputStyle} value={editData.admission_date?.substring(0, 10)} onChange={(e) => setEditData({ ...editData, admission_date: e.target.value })} />
                </div>
                <div>
                  <label style={labelStyle}>Discharge Date</label>
                  <input type="date" style={inputStyle} value={editData.discharge_date?.substring(0, 10) || ""} onChange={(e) => setEditData({ ...editData, discharge_date: e.target.value || null })} />
                </div>
                <div style={{ display: "flex", gap: "10px", alignItems: "flex-end" }}>
                  <button type="submit" style={{ ...submitBtnStyle, background: "#3498db" }}>Save</button>
                  <button type="button" onClick={() => setEditData(null)} style={{ ...submitBtnStyle, background: "#95a5a6" }}>Cancel</button>
                </div>
              </form>
            </div>
          )}

          {/* TABLE SECTION */}
          <div style={cardStyle}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ textAlign: "left", borderBottom: "2px solid #004a99" }}>
                  <th style={thStyle}>ID</th>
                  <th style={thStyle}>Patient ID</th>
                  <th style={thStyle}>Room No</th>
                  <th style={thStyle}>Admitted On</th>
                  <th style={thStyle}>Status</th>
                  <th style={thStyle}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {admissions.map(a => (
                  <tr key={a.admission_id} style={trStyle}>
                    <td style={tdStyle}><b>#{a.admission_id}</b></td>
                    <td style={tdStyle}>{a.patient_id}</td>
                    <td style={tdStyle}>{a.room_id}</td>
                    <td style={tdStyle}>{a.admission_date?.substring(0, 10)}</td>
                    <td style={tdStyle}>
                      {a.discharge_date ? (
                        <span style={dischargedTag}>{a.discharge_date.substring(0, 10)}</span>
                      ) : (
                        <span style={activeTag}>Active</span>
                      )}
                    </td>
                    <td style={tdStyle}>
                      <button onClick={() => setEditData(a)} style={editBtn}>Edit</button>
                      <button onClick={() => setShowConfirm(a.admission_id)} style={disBtn}>Discharge</button>
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

// Internal Styles
const inputStyle = { width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ddd", marginTop: "5px" };
const labelStyle = { fontSize: "0.8rem", fontWeight: "bold", color: "#555", textTransform: "uppercase" };
const backBtnStyle = { padding: "8px 16px", background: "#00203f", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" };
const submitBtnStyle = { padding: "11px 20px", background: "#27ae60", color: "white", border: "none", borderRadius: "8px", fontWeight: "600", cursor: "pointer" };
const thStyle = { padding: "15px", color: "#004a99", fontSize: "0.9rem" };
const tdStyle = { padding: "15px", fontSize: "0.95rem", color: "#333" };
const trStyle = { borderBottom: "1px solid #eee" };
const activeTag = { background: "#d4edda", color: "#155724", padding: "4px 10px", borderRadius: "20px", fontSize: "0.75rem", fontWeight: "bold" };
const dischargedTag = { background: "#e9ecef", color: "#495057", padding: "4px 10px", borderRadius: "20px", fontSize: "0.75rem" };
const editBtn = { background: "none", border: "none", color: "#3498db", fontWeight: "bold", cursor: "pointer", marginRight: "10px" };
const disBtn = { background: "none", border: "none", color: "#e74c3c", fontWeight: "bold", cursor: "pointer" };
const msgStyle = { padding: "15px", borderRadius: "10px", marginBottom: "20px", textAlign: "center", fontWeight: "600" };

export default Admissions;
