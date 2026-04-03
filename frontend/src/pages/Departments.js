import { useEffect, useState } from "react";
import API from "../api/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

function Departments() {
  const [departments, setDepartments] = useState([]);
  const [editData, setEditData] = useState(null);
  const [message, setMessage] = useState({ text: "", type: "" });
  const navigate = useNavigate();

  const fetchDepartments = () => {
    API.get("/dept")
      .then(res => setDepartments(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleDelete = async (id) => {
    try {
      await API.delete(`/dept/delete/${id}`);
      setMessage({ text: "Department removed successfully", type: "success" });
      fetchDepartments();
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    } catch (err) {
      setMessage({ text: "Error deleting department", type: "error" });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/dept/update/${editData.department_id}`, editData);
      setMessage({ text: "Department updated!", type: "success" });
      setEditData(null);
      fetchDepartments();
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    } catch (err) {
      setMessage({ text: "Error updating department", type: "error" });
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
              <h1 style={{ color: "#00203f", margin: 0 }}>Hospital Departments</h1>
              <p style={{ color: "#666" }}>Manage organizational units and descriptions.</p>
            </div>
            <button 
              onClick={() => navigate("/departments/add-department")}
              style={addBtnStyle}
            >
              + Add New Department
            </button>
          </div>

          {message.text && (
            <div style={{ ...msgStyle, backgroundColor: message.type === "success" ? "#d4edda" : "#f8d7da", color: message.type === "success" ? "#155724" : "#721c24" }}>
              {message.text}
            </div>
          )}

          {/* EDIT FORM (Conditionally Rendered as a Card) */}
          {editData && (
            <div style={{ ...cardStyle, marginBottom: "30px", borderLeft: "5px solid #004a99" }}>
              <h3 style={{ marginTop: 0, color: "#004a99" }}>Edit Department: {editData.name}</h3>
              <form onSubmit={handleUpdate} style={{ display: "flex", gap: "15px", alignItems: "flex-end" }}>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Department Name</label>
                  <input style={inputStyle} value={editData.name} onChange={(e) => setEditData({ ...editData, name: e.target.value })} />
                </div>
                <div style={{ flex: 2 }}>
                  <label style={labelStyle}>Description</label>
                  <input style={inputStyle} value={editData.description} onChange={(e) => setEditData({ ...editData, description: e.target.value })} />
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button type="submit" style={saveBtnStyle}>Save</button>
                  <button type="button" onClick={() => setEditData(null)} style={cancelBtnStyle}>Cancel</button>
                </div>
              </form>
            </div>
          )}

          {/* DEPARTMENT TABLE */}
          <div style={cardStyle}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ textAlign: "left", borderBottom: "2px solid #004a99" }}>
                  <th style={thStyle}>ID</th>
                  <th style={thStyle}>Department Name</th>
                  <th style={thStyle}>Description</th>
                  <th style={thStyle}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {departments.map(d => (
                  <tr key={d.department_id} style={trStyle}>
                    <td style={tdStyle}><b>#{d.department_id}</b></td>
                    <td style={tdStyle}><span style={nameTag}>{d.name}</span></td>
                    <td style={{ ...tdStyle, color: "#666", fontSize: "0.85rem" }}>{d.description}</td>
                    <td style={tdStyle}>
                      <button onClick={() => setEditData(d)} style={editActionBtn}>Update</button>
                      <button onClick={() => handleDelete(d.department_id)} style={deleteActionBtn}>Delete</button>
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

// Internal CSS Objects
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
const nameTag = { background: "rgba(0, 74, 153, 0.1)", color: "#004a99", padding: "4px 10px", borderRadius: "6px", fontWeight: "600" };

export default Departments;