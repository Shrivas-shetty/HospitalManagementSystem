const db = require('../config/db');

// Add a New Prescription
exports.addPrescription = (req, res) => {
  const { patient_id, doctor_id, medication, dosage, instructions } = req.body;
  
  // Automatically generate current date for the 'date' column
  const date = new Date().toISOString().split('T')[0]; 

  const sql = `
    INSERT INTO prescriptions (patient_id, doctor_id, medication, dosage, instructions, date)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [patient_id, doctor_id, medication, dosage, instructions, date], (err, result) => {
    if (err) {
      console.error("Database Error:", err);
      return res.status(500).send("Error saving prescription to database");
    }
    res.status(201).send({ message: "Prescription recorded successfully", id: result.insertId });
  });
};

// Fetch all prescriptions for a specific patient (for the History view)
exports.getPatientPrescriptions = (req, res) => {
  const { patientId } = req.params;
  
  const sql = `
    SELECT pr.*, d.name as doctor_name 
    FROM prescriptions pr
    JOIN doctors d ON pr.doctor_id = d.doctor_id
    WHERE pr.patient_id = ?
    ORDER BY pr.date DESC
  `;

  db.query(sql, [patientId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error fetching medical history");
    }
    res.json(result);
  });
};




exports.getFullPrescriptions = (req, res) => {
  // This query joins 4 tables to give you a complete medical picture
  const sql = `
    SELECT 
      pr.prescription_id,
      pr.medication,
      pr.dosage,
      pr.instructions,
      pr.date AS prescription_date,
      p.name AS patient_name,
      d.name AS doctor_name,
      a.appointment_id
    FROM prescriptions pr
    JOIN patients p ON pr.patient_id = p.patient_id
    JOIN doctors d ON pr.doctor_id = d.doctor_id
    LEFT JOIN appointments a ON (
      pr.patient_id = a.patient_id 
      AND pr.doctor_id = a.doctor_id 
      AND pr.date = DATE(a.appointment_date)
    )
    ORDER BY pr.date DESC;
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error fetching full prescription view");
    }
    res.json(result);
  });
};