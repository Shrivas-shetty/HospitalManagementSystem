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

// Get All Appointments (Changed to LEFT JOIN)
exports.getAppointments = (req, res) => {
  const sql = `
    SELECT 
      a.appointment_id AS appointment_id,
      p.name AS patient_name,
      d.name AS doctor_name,
      d.specialization AS specialization,
      a.appointment_date AS appointment_date,
      a.status AS status,
      a.patient_id,
      a.doctor_id
    FROM appointments a
    LEFT JOIN patients p ON a.patient_id = p.patient_id
    LEFT JOIN doctors d ON a.doctor_id = d.doctor_id
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error fetching appointments");
    }
    res.json(result);
  });
};

// Update Appointment (FIXED WHERE CLAUSE)
exports.updateAppointment = (req, res) => {
  const { id } = req.params; // This is the appointment_id from the URL
  const { patient_id, doctor_id, appointment_date, status } = req.body;

  // CRITICAL FIX: You had WHERE patient_id=?. 
  // It MUST be WHERE appointment_id=? otherwise it updates the wrong rows.
  const sql = `
    UPDATE appointments 
    SET patient_id=?, doctor_id=?, appointment_date=?, status=? 
    WHERE appointment_id=?
  `;

  db.query(sql, [patient_id, doctor_id, appointment_date, status, id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error updating appointment");
    }
    res.send("Appointment updated successfully");
  });
};

// DELETE Appointment
exports.deleteAppointment = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM appointments WHERE appointment_id=?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error deleting appointment");
    }
    res.send("Appointment deleted successfully");
  });
};