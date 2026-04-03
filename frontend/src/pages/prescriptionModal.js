import { useState } from "react";
import API from "../api/api";

function PrescriptionModal({ appointment, onClose }) {
  const [formData, setFormData] = useState({
    medication: "",
    dosage: "",
    instructions: ""
  });
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        patient_id: appointment.patient_id,
        doctor_id: appointment.doctor_id
      };
      await API.post("/prescriptions/add", payload);
      
      setMessage({ text: "Prescription saved successfully!", type: "success" });
      
      // Close the modal after a brief delay so the user sees the success message
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      setMessage({ text: "Error saving prescription. Please try again.", type: "error" });
    }
  };

  return (
    <div style={modalOverlay}>
      <div style={modalContent}>
        <h3 style={{ marginTop: 0, color: "#00203f" }}>New Prescription</h3>
        
        {message.text && (
          <div style={{ 
            padding: "10px", 
            borderRadius: "6px", 
            marginBottom: "15px", 
            fontSize: "14px",
            textAlign: "center",
            backgroundColor: message.type === "success" ? "#d4edda" : "#f8d7da",
            color: message.type === "success" ? "#155724" : "#721c24",
            border: `1px solid ${message.type === "success" ? "#c3e6cb" : "#f5c6cb"}`
          }}>
            {message.text}
          </div>
        )}

        <div style={infoBox}>
          <p style={{ margin: "5px 0" }}><strong>Patient:</strong> {appointment.patient_name}</p>
          <p style={{ margin: "5px 0" }}><strong>Doctor:</strong> {appointment.doctor_name}</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <label style={labelStyle}>Medication Name</label>
          <input 
            placeholder="e.g. Paracetamol" 
            style={inputStyle} 
            onChange={e => setFormData({...formData, medication: e.target.value})} 
            required 
          />
          
          <label style={labelStyle}>Dosage & Frequency</label>
          <input 
            placeholder="e.g. 500mg - Twice a day" 
            style={inputStyle} 
            onChange={e => setFormData({...formData, dosage: e.target.value})} 
            required 
          />
          
          <label style={labelStyle}>Special Instructions</label>
          <textarea 
            placeholder="e.g. Take after meals" 
            style={{...inputStyle, height: '80px', resize: 'none'}} 
            onChange={e => setFormData({...formData, instructions: e.target.value})}
          />
          
          <div style={{display: 'flex', gap: '10px', marginTop: '15px'}}>
            <button type="submit" style={saveBtn}>Save Prescription</button>
            <button type="button" onClick={onClose} style={cancelBtn}>Close</button>
          </div>
        </form>
      </div>
    </div>
  );
}

const modalOverlay = { 
  position: 'fixed', 
  top: 0, 
  left: 0, 
  width: '100%', 
  height: '100%', 
  backgroundColor: 'rgba(0,0,0,0.6)', 
  display: 'flex', 
  justifyContent: 'center', 
  alignItems: 'center', 
  zIndex: 1000,
  backdropFilter: "blur(4px)"
};

const modalContent = { 
  backgroundColor: '#fff', 
  padding: '30px', 
  borderRadius: '15px', 
  width: '420px',
  boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
  fontFamily: "'Segoe UI', Roboto, sans-serif"
};

const infoBox = {
  backgroundColor: "#f8f9fa",
  padding: "12px",
  borderRadius: "8px",
  marginBottom: "20px",
  fontSize: "14px",
  color: "#444",
  border: "1px solid #eee"
};

const labelStyle = {
  display: "block",
  fontSize: "11px",
  fontWeight: "bold",
  color: "#7f8c8d",
  textTransform: "uppercase",
  marginBottom: "5px",
  marginLeft: "2px"
};

const inputStyle = { 
  width: '100%', 
  padding: '12px', 
  marginBottom: '15px', 
  borderRadius: '8px', 
  border: '1px solid #ddd',
  fontSize: "14px",
  boxSizing: "border-box"
};

const saveBtn = { 
  flex: 2, 
  backgroundColor: '#6f42c1', 
  color: '#fff', 
  border: 'none', 
  padding: '12px', 
  borderRadius: '8px', 
  cursor: 'pointer',
  fontWeight: "600",
  fontSize: "14px"
};

const cancelBtn = { 
  flex: 1, 
  backgroundColor: '#95a5a6', 
  color: '#fff', 
  border: 'none', 
  padding: '12px', 
  borderRadius: '8px', 
  cursor: 'pointer',
  fontWeight: "600",
  fontSize: "14px"
};

export default PrescriptionModal;