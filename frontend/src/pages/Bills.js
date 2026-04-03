import { useEffect, useState } from "react";
import API from "../api/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Bills() {
  const [bills, setBills] = useState([]);
  const [payData, setPayData] = useState(null); 
  const [method, setMethod] = useState("Cash");
  const [message, setMessage] = useState({ text: "", type: "" });

  const fetchBills = () => {
    API.get("/bills")
      .then(res => setBills(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => { fetchBills(); }, []);

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        bill_id: payData.bill_id,
        amount: payData.total_amount,
        method: method
      };
      
      await API.post("/payments/process", payload);
      generateReceipt(payData, method);

      setMessage({ text: "Payment Successful! Receipt generated.", type: "success" });
      setPayData(null);
      fetchBills();
      setTimeout(() => setMessage({ text: "", type: "" }), 4000);
    } catch (err) {
      console.error(err);
      setMessage({ text: "Payment Error: Could not process transaction.", type: "error" });
      setTimeout(() => setMessage({ text: "", type: "" }), 4000);
    }
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
    border: "1px solid rgba(0, 74, 153, 0.1)"
  };

  return (
    <div style={containerStyle}>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        
        <div style={{ flex: 1, padding: "40px" }}>
          <div style={{ marginBottom: "30px" }}>
            <h1 style={{ color: "#00203f", margin: 0 }}>Revenue & Billing</h1>
            <p style={{ color: "#666" }}>Process patient settlements and generate official payment receipts.</p>
          </div>

          {message.text && (
            <div style={{ 
              ...msgStyle, 
              backgroundColor: message.type === "success" ? "#d4edda" : "#f8d7da", 
              color: message.type === "success" ? "#155724" : "#721c24",
              border: `1px solid ${message.type === "success" ? "#c3e6cb" : "#f5c6cb"}`
            }}>
              {message.text}
            </div>
          )}

          {/* PAYMENT MODAL */}
          {payData && (
            <div style={modalOverlayStyle}>
              <div style={modalContentStyle}>
                <h3 style={{ marginTop: 0, color: "#28a745" }}>Process Payment</h3>
                <p style={{ fontSize: "14px", color: "#555" }}>
                  Settling Bill <b>#{payData.bill_id}</b> for:<br/>
                  <span style={{ fontSize: "1.1rem", fontWeight: "bold", color: "#00203f" }}>{payData.patient_name}</span>
                </p>
                
                <form onSubmit={handlePaymentSubmit}>
                  <label style={labelStyle}>Payment Method</label>
                  <select 
                    style={selectStyle} 
                    value={method} 
                    onChange={(e) => setMethod(e.target.value)}
                  >
                    <option value="Cash">Physical Cash</option>
                    <option value="UPI">UPI / Digital Wallet</option>
                    <option value="Card">Credit/Debit Card</option>
                  </select>

                  <div style={{ marginTop: "25px", display: "flex", gap: "10px" }}>
                    <button type="submit" style={payConfirmBtn}>Pay ₹{parseFloat(payData.total_amount).toLocaleString()}</button>
                    <button type="button" onClick={() => setPayData(null)} style={cancelBtnStyle}>Back</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* BILLS TABLE */}
          <div style={glassCard}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ textAlign: "left", borderBottom: "2px solid #dee2e6" }}>
                  <th style={thStyle}>Bill ID</th>
                  <th style={thStyle}>Patient Name</th>
                  <th style={thStyle}>Total Amount</th>
                  <th style={thStyle}>Payment Status</th>
                  <th style={{ ...thStyle, textAlign: "center" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bills.map(b => (
                  <tr key={b.bill_id} style={trStyle}>
                    <td style={tdStyle}><b>#BIL-{b.bill_id}</b></td>
                    <td style={{ ...tdStyle, fontWeight: "600", color: "#2c3e50" }}>{b.patient_name}</td>
                    <td style={tdStyle}>₹{parseFloat(b.total_amount).toLocaleString()}</td>
                    <td style={tdStyle}>
                      <span style={{ 
                        ...statusBadge, 
                        backgroundColor: b.payment_status === 'Paid' ? '#e8f5e9' : '#fff3cd',
                        color: b.payment_status === 'Paid' ? '#2e7d32' : '#856404'
                      }}>
                        {b.payment_status}
                      </span>
                    </td>
                    <td style={{ ...tdStyle, textAlign: "center" }}>
                      {b.payment_status !== 'Paid' ? (
                        <button onClick={() => setPayData(b)} style={payActionBtn}>Process Payment</button>
                      ) : (
                        <span style={{ color: "#28a745", fontWeight: "bold", fontSize: "14px" }}>
                          <span style={{ marginRight: "5px" }}>✓</span> Settlement Complete
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {bills.length === 0 && (
              <div style={{ padding: "40px", textAlign: "center", color: "#95a5a6" }}>
                No billing records found in the system.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const generateReceipt = (data, method) => {
  const date = new Date().toLocaleString();
  const receiptContent = `
========================================
       HEALTHSYNC MEDICAL CENTER
            PAYMENT RECEIPT
========================================
Date/Time:    ${date}
Receipt No:    REC-${Math.floor(Math.random() * 10000)}
Bill ID:       #${data.bill_id}
Patient:       ${data.patient_name}
----------------------------------------
TOTAL PAID:    ₹${parseFloat(data.total_amount).toLocaleString()}
METHOD:        ${method}
STATUS:        OFFICIALLY PAID
----------------------------------------
Generated by: HealthSync Billing System
Thank you for choosing HealthSync.
========================================
  `;

  const blob = new Blob([receiptContent], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `Receipt_Bill_${data.bill_id}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Styles
const thStyle = { padding: "18px 15px", fontSize: "13px", fontWeight: "700", color: "#495057", textTransform: "uppercase" };
const tdStyle = { padding: "18px 15px", fontSize: "14px" };
const trStyle = { borderBottom: "1px solid #f0f0f0", transition: "0.2s" };
const statusBadge = { padding: "5px 12px", borderRadius: "20px", fontSize: "11px", fontWeight: "bold", textTransform: "uppercase" };
const payActionBtn = { backgroundColor: "#004a99", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", fontWeight: "600", fontSize: "12px" };
const selectStyle = { width: "100%", padding: "12px", marginTop: "8px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "14px" };
const labelStyle = { fontSize: "12px", color: "#7f8c8d", fontWeight: "bold", textTransform: "uppercase" };
const modalOverlayStyle = { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, backdropFilter: "blur(4px)" };
const modalContentStyle = { backgroundColor: '#fff', padding: '30px', borderRadius: '15px', width: '380px', boxShadow: "0 20px 40px rgba(0,0,0,0.2)" };
const payConfirmBtn = { flex: 2, backgroundColor: '#28a745', color: '#fff', padding: '12px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: "bold" };
const cancelBtnStyle = { flex: 1, backgroundColor: '#95a5a6', color: '#fff', padding: '12px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: "600" };
const msgStyle = { padding: "15px", borderRadius: "10px", marginBottom: "20px", textAlign: "center", fontWeight: "600" };

export default Bills;