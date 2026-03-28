const db = require('../config/db');

// Get All Bills
exports.getBills = (req, res) => {
  
     if (req.user.role !== 'Admin') {
        return res.status(403).send("Only Admin can view bills");
      }

  const sql = `
    SELECT 
      b.bill_id,
      p.name AS patient_name,
      d.name AS doctor_name,
      b.total_amount,
      b.payment_status
    FROM bills b
    JOIN appointments a ON b.appointment_id = a.appointment_id
    JOIN patients p ON a.patient_id = p.patient_id
    JOIN doctors d ON a.doctor_id = d.doctor_id
  `;

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).send("Error fetching bills");
    }
    res.json(result);
  });
};

