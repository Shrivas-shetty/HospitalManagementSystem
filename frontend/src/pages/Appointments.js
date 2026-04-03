import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [editData, setEditData] = useState(null);
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(null); // New state for delete confirmation
  const [prescriptionData, setPrescriptionData] = useState({
    patient_id: '', doctor_id: '', medication: '', dosage: '', instructions: ''
  });
  const [message, setMessage] = useState({ text: "", type: "" });
  const navigate = useNavigate();

  const fetchAppointments = () => {
  API.get("/appointments")
    .then(res => setAppointments(res.data)) // Corrected
    .catch(err => console.error("Fetch Error:", err));
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const openPrescriptionModal = (appt) => {
    setPrescriptionData({
      patient_id: appt.patient_id,
      doctor_id: appt.doctor_id,
      patient_name: appt.patient_name,
      medication: '',
      dosage: '',
      instructions: ''
    });
    setShowPrescriptionModal(true);
  };

  const handlePrescriptionSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/prescriptions/add", prescriptionData);
      setMessage({ text: "Prescription issued successfully!", type: "success" });
      setShowPrescriptionModal(false);
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    } catch (err) {
      setMessage({ text: "Failed to save prescription.", type: "error" });
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/appointments/delete/${id}`);
      fetchAppointments();
      setMessage({ text: "Appointment removed.", type: "success" });
      setShowConfirmDelete(null);
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    } catch (err) {
      setMessage({ text: "Error deleting appointment.", type: "error" });
      setShowConfirmDelete(null);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        patient_id: editData.patient_id,
        doctor_id: editData.doctor_id,
        appointment_date: editData.appointment_date.replace('T', ' ').substring(0, 19),
        status: editData.status
      };
      await API.put(`/appointments/update/${editData.appointment_id}`, payload);
      setEditData(null);
      fetchAppointments();
      setMessage({ text: "Schedule updated.", type: "success" });
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    } catch (err) {
      setMessage({ text: "Update failed.", type: "error" });
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
              <h1 style={{ color: "#00203f", margin: 0 }}>Appointments</h1>
              <p style={{ color: "#666" }}>Manage patient visits and issue medical prescriptions.</p>
            </div>
            <button 
              onClick={() => navigate("/appointments/add-appointment")}
              style={addBtnStyle}
            >
              + Book Appointment
            </button>
          </div>

          {message.text && (
            <div style={{ ...msgStyle, backgroundColor: message.type === "success" ? "#d4edda" : "#f8d7da", color: message.type === "success" ? "#155724" : "#721c24" }}>
              {message.text}
            </div>
          )}

          {/* New UI Delete Confirmation */}
          {showConfirmDelete && (
            <div style={{ ...msgStyle, backgroundColor: "#fff3cd", color: "#856404", border: "1px solid #ffeeba", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>Are you sure you want to cancel appointment #{showConfirmDelete}?</span>
              <div>
                <button onClick={() => handleDelete(showConfirmDelete)} style={{ ...saveBtnStyle, background: "#e74c3c", padding: "5px 15px", marginRight: "10px" }}>Yes, Cancel</button>
                <button onClick={() => setShowConfirmDelete(null)} style={{ ...cancelBtnStyle, padding: "5px 15px" }}>Dismiss</button>
              </div>
            </div>
          )}

          {/* EDIT FORM */}
          {editData && (
            <div style={{ ...cardStyle, marginBottom: "30px", borderLeft: "5px solid #3498db" }}>
              <h3 style={{ marginTop: 0 }}>Modify Appointment #{editData.appointment_id}</h3>
              <form onSubmit={handleUpdate} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "15px" }}>
                <div>
                  <label style={labelStyle}>Patient ID</label>
                  <input style={inputStyle} value={editData.patient_id} onChange={(e) => setEditData({ ...editData, patient_id: e.target.value })} />
                </div>
                <div>
                  <label style={labelStyle}>Doctor ID</label>
                  <input style={inputStyle} value={editData.doctor_id} onChange={(e) => setEditData({ ...editData, doctor_id: e.target.value })} />
                </div>
                <div>
                  <label style={labelStyle}>Date & Time</label>
                  <input type="datetime-local" style={inputStyle} value={editData.appointment_date.replace(' ', 'T')} onChange={(e) => setEditData({ ...editData, appointment_date: e.target.value })} />
                </div>
                <div>
                  <label style={labelStyle}>Status</label>
                  <select style={inputStyle} value={editData.status} onChange={(e) => setEditData({ ...editData, status: e.target.value })}>
                    <option value="Scheduled">Scheduled</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
                <div style={{ gridColumn: "1 / -1", display: "flex", gap: "10px" }}>
                  <button type="submit" style={saveBtnStyle}>Update Visit</button>
                  <button type="button" onClick={() => setEditData(null)} style={cancelBtnStyle}>Dismiss</button>
                </div>
              </form>
            </div>
          )}

          {/* DATA TABLE */}
          <div style={cardStyle}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ textAlign: "left", borderBottom: "2px solid #004a99" }}>
                  <th style={thStyle}>ID</th>
                  <th style={thStyle}>Patient Details</th>
                  <th style={thStyle}>Consultant</th>
                  <th style={thStyle}>Time Slot</th>
                  <th style={thStyle}>Status</th>
                  <th style={thStyle}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map(a => (
                  <tr key={a.appointment_id} style={trStyle}>
                    <td style={tdStyle}><b>#{a.appointment_id}</b></td>
                    <td style={tdStyle}>
                      <div style={{ fontWeight: "600", color: "#00203f" }}>{a.patient_name}</div>
                      <div style={{ fontSize: "0.75rem", color: "#7f8c8d" }}>ID : {a.patient_id}</div>
                    </td>
                    <td style={tdStyle}>
                      <div style={{ color: "#004a99", fontWeight: "500" }}>Dr. {a.doctor_name}</div>
                      <div style={{ fontSize: "0.75rem", color: "#3498db" }}>{a.specialization}</div>
                    </td>
                    <td style={tdStyle}>{a.appointment_date.substring(0, 16)}</td>
                    <td style={tdStyle}>
                      <span style={{ ...badgeBase, ...getStatusColors(a.status) }}>{a.status}</span>
                    </td>
                    <td style={tdStyle}>
                      <button onClick={() => openPrescriptionModal(a)} style={prescribeBtn}>Prescribe</button>
                      <button onClick={() => setEditData(a)} style={editActionBtn}>Update</button>
                      <button onClick={() => setShowConfirmDelete(a.appointment_id)} style={deleteActionBtn}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>

      {/* PRESCRIPTION MODAL */}
      {showPrescriptionModal && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <div style={{ borderBottom: "2px solid #6f42c1", marginBottom: "20px", paddingBottom: "10px" }}>
              <h3 style={{ margin: 0, color: "#6f42c1" }}>Clinical Prescription</h3>
              <p style={{ margin: 0, fontSize: "0.85rem", color: "#666" }}>Issuing for: <b>{prescriptionData.patient_name}</b></p>
            </div>
            
            <form onSubmit={handlePrescriptionSubmit}>
              <label style={labelStyle}>Medication Name</label>
              <input style={inputStyle} required placeholder="e.g. Paracetamol" value={prescriptionData.medication}
                onChange={(e) => setPrescriptionData({...prescriptionData, medication: e.target.value})} />
              
              <label style={labelStyle}>Dosage Plan</label>
              <input style={inputStyle} required placeholder="e.g. 500mg, 1-0-1" value={prescriptionData.dosage}
                onChange={(e) => setPrescriptionData({...prescriptionData, dosage: e.target.value})} />

              <label style={labelStyle}>Physician's Instructions</label>
              <textarea style={{ ...inputStyle, height: "80px", resize: "none" }} placeholder="Take after meals..." value={prescriptionData.instructions}
                onChange={(e) => setPrescriptionData({...prescriptionData, instructions: e.target.value})} />

              <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                <button type="submit" style={rxSaveBtn}>Confirm & Issue</button>
                <button type="button" onClick={() => setShowPrescriptionModal(false)} style={cancelBtnStyle}>Discard</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper for Status colors
const getStatusColors = (status) => {
  if (status === 'Scheduled') return { backgroundColor: '#e3f2fd', color: '#0d47a1' };
  if (status === 'Completed') return { backgroundColor: '#e8f5e9', color: '#1b5e20' };
  if (status === 'Cancelled') return { backgroundColor: '#ffebee', color: '#b71c1c' };
  return { backgroundColor: '#eee', color: '#333' };
};

// Internal CSS
const addBtnStyle = { padding: "12px 24px", background: "#00203f", color: "white", border: "none", borderRadius: "8px", fontWeight: "600", cursor: "pointer" };
const saveBtnStyle = { padding: "10px 20px", background: "#27ae60", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600" };
const rxSaveBtn = { flex: 1, padding: "12px", background: "#6f42c1", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600" };
const cancelBtnStyle = { padding: "10px 20px", background: "#95a5a6", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600" };
const inputStyle = { width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ddd", marginTop: "5px", marginBottom: "15px" };
const labelStyle = { fontSize: "0.7rem", fontWeight: "bold", color: "#555", textTransform: "uppercase" };
const thStyle = { padding: "15px", color: "#004a99", fontWeight: "600" };
const tdStyle = { padding: "15px", borderBottom: "1px solid #eee" };
const trStyle = { transition: "0.2s" };
const badgeBase = { padding: "4px 10px", borderRadius: "20px", fontSize: "0.7rem", fontWeight: "bold" };
const prescribeBtn = { background: "none", border: "1px solid #6f42c1", color: "#6f42c1", padding: "5px 10px", borderRadius: "6px", fontWeight: "bold", cursor: "pointer", marginRight: "10px" };
const editActionBtn = { background: "none", border: "none", color: "#3498db", fontWeight: "bold", cursor: "pointer", marginRight: "10px" };
const deleteActionBtn = { background: "none", border: "none", color: "#e74c3c", fontWeight: "bold", cursor: "pointer" };
const modalOverlayStyle = { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, backdropFilter: "blur(4px)" };
const modalContentStyle = { backgroundColor: '#fff', padding: '30px', borderRadius: '15px', width: '450px', boxShadow: "0 20px 40px rgba(0,0,0,0.2)" };
const msgStyle = { padding: "15px", borderRadius: "10px", marginBottom: "20px", textAlign: "center", fontWeight: "600" };

export default Appointments;