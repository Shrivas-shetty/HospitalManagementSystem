import { useEffect, useState } from "react";
import API from "../api/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

function Patients() {
  const [patients, setPatients] = useState([]);
  const [editData, setEditData] = useState(null);
  const [message, setMessage] = useState({ text: "", type: "" });
  const navigate = useNavigate();

  const fetchPatients = () => {
    API.get("/patients")
      .then(res => setPatients(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleDelete = async (id) => {
    try {
      await API.delete(`/patients/delete/${id}`);
      setMessage({ text: "Patient record deleted successfully.", type: "success" });
      fetchPatients();
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    } catch (err) {
      setMessage({ text: "Error deleting record.", type: "error" });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/patients/update/${editData.patient_id}`, editData);
      setMessage({ text: "Patient profile updated!", type: "success" });
      setEditData(null);
      fetchPatients();
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    } catch (err) {
      setMessage({ text: "Update failed. Please check inputs.", type: "error" });
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
              <h1 style={{ color: "#00203f", margin: 0 }}>Patient Directory</h1>
              <p style={{ color: "#666" }}>View and manage all registered hospital patients.</p>
            </div>
            <button 
              onClick={() => navigate("/patients/add-patient")}
              style={addBtnStyle}
            >
              + Register New Patient
            </button>
          </div>

          {message.text && (
            <div style={{ ...msgStyle, backgroundColor: message.type === "success" ? "#d4edda" : "#f8d7da", color: message.type === "success" ? "#155724" : "#721c24" }}>
              {message.text}
            </div>
          )}

          {/* EDIT FORM CARD */}
          {editData && (
            <div style={{ ...cardStyle, marginBottom: "30px", borderLeft: "5px solid #004a99" }}>
              <h3 style={{ marginTop: 0 }}>Update Patient: {editData.name}</h3>
              <form onSubmit={handleUpdate} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "15px", alignItems: "flex-end" }}>
                <div>
                  <label style={labelStyle}>Full Name</label>
                  <input style={inputStyle} value={editData.name} onChange={(e) => setEditData({ ...editData, name: e.target.value })} />
                </div>
                <div>
                  <label style={labelStyle}>Age</label>
                  <input type="number" style={inputStyle} value={editData.age} onChange={(e) => setEditData({ ...editData, age: e.target.value })} />
                </div>
                <div>
                  <label style={labelStyle}>Gender</label>
                  <select style={inputStyle} value={editData.gender} onChange={(e) => setEditData({ ...editData, gender: e.target.value })}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Phone</label>
                  <input style={inputStyle} value={editData.phone} onChange={(e) => setEditData({ ...editData, phone: e.target.value })} />
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button type="submit" style={saveBtnStyle}>Save</button>
                  <button type="button" onClick={() => setEditData(null)} style={cancelBtnStyle}>Cancel</button>
                </div>
              </form>
            </div>
          )}

          {/* PATIENT TABLE */}
          <div style={cardStyle}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ textAlign: "left", borderBottom: "2px solid #004a99" }}>
                  <th style={thStyle}>ID</th>
                  <th style={thStyle}>Patient Name</th>
                  <th style={thStyle}>Age</th>
                  <th style={thStyle}>Gender</th>
                  <th style={thStyle}>Contact</th>
                  <th style={thStyle}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {patients.map(p => (
                  <tr key={p.patient_id} style={trStyle}>
                    <td style={tdStyle}><b>#{p.patient_id}</b></td>
                    <td style={tdStyle}><span style={nameTag}>{p.name}</span></td>
                    <td style={tdStyle}>{p.age} Yrs</td>
                    <td style={tdStyle}>
                      {p.gender === 'Male' ? '♂️' : '♀️'} {p.gender}
                    </td>
                    <td style={tdStyle}>{p.phone}</td>
                    <td style={tdStyle}>
                      <button onClick={() => setEditData(p)} style={editActionBtn}>Edit</button>
                      <button onClick={() => handleDelete(p.patient_id)} style={deleteActionBtn}>Delete</button>
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
const nameTag = { color: "#00203f", fontWeight: "600" };

export default Patients;