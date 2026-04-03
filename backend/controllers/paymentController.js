const db = require('../config/db');

exports.processPayment = (req, res) => {
  const { bill_id, amount, method } = req.body;
  const payment_date = new Date().toISOString().split('T')[0]; // Current Date

  const sql = `
    INSERT INTO payments (bill_id, amount, payment_date, method) 
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [bill_id, amount, payment_date, method], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Payment failed");
    }
    // Note: The Trigger in MySQL automatically updates the Bill status to 'Paid' now
    res.send("Payment processed and Bill marked as Paid");
  });
};

// Get All Payments
exports.getPayments = (req, res) => {
  // Optional: if (req.user.role !== 'Admin') return res.status(403).send("Admin only");

  const sql = `
    SELECT 
      p.payment_id, 
      p.bill_id, 
      p.amount, 
      p.payment_date, 
      p.method, 
      pat.name AS patient_name 
    FROM payments p
    JOIN bills b ON p.bill_id = b.bill_id
    JOIN appointments a ON b.appointment_id = a.appointment_id
    JOIN patients pat ON a.patient_id = pat.patient_id
    ORDER BY p.payment_date DESC
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error fetching payments");
    }
    res.json(result);
  });
};