const db = require('../config/db');

// Book Appointment
exports.bookAppointment = (req, res) => {
  const { patient_id, doctor_id, appointment_date } = req.body;

  const sql = `
    INSERT INTO appointments (patient_id, doctor_id, appointment_date)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [patient_id, doctor_id, appointment_date], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error booking appointment");
    }
    res.send("Appointment booked successfully");
  });
};

// Get All Appointments (WITH JOIN 🔥)
exports.getAppointments = (req, res) => {
  const sql = `
    SELECT 
      a.appointment_id,
      p.name AS patient_name,
      d.name AS doctor_name,
      d.specialization,
      a.appointment_date,
      a.status
    FROM appointments a
    JOIN patients p ON a.patient_id = p.patient_id
    JOIN doctors d ON a.doctor_id = d.doctor_id
  `;

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).send("Error fetching appointments");
    }
    res.json(result);
  });
};