const db = require('../config/db');

// Get All Admissions
// Accessed via: GET /admissions

exports.getAdmissions = (req, res) => {
  const sql = `
    SELECT * FROM admissions 
    ORDER BY admission_id DESC
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error fetching admissions");
    }
    res.json(result);
  });
};

// Add New Admission (Requirements Check!)
// Accessed via: POST /admissions/add
exports.addAdmission = (req, res) => {
  const { patient_id, room_id ,admission_date ,doctor_id } = req.body;

  // Make sure these match your MySQL Workbench 'Field' names exactly
  const sql = "INSERT INTO admissions (patient_id, room_id, admission_date, doctor_id) VALUES (?, ?, ? ,?)";

  db.query(sql, [patient_id, room_id, admission_date ,doctor_id ], (err, result) => {
    if (err) {
      console.error("MYSQL ERROR:", err.sqlMessage); // This prints the EXACT reason in your terminal
      return res.status(500).send(err.sqlMessage);
    }
    res.send("Admission added successfully");
  });
};

// Update Admission
// Accessed via: PUT /admissions/update/:id
exports.updateAdmission = (req, res) => {
  const { id } = req.params; // admission_id
  const { patient_id, room_id, admission_date, discharge_date } = req.body;

  const sql = `
    UPDATE admissions 
    SET patient_id = ?, room_id = ?, admission_date = ?, discharge_date = ? 
    WHERE admission_id = ?
  `;

  db.query(sql, [patient_id, room_id, admission_date, discharge_date, id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error updating admission");
    }
    res.send("Updated successfully");
  });
};

// DELETE Admission (Discharge Requirements Check!)
// Accessed via: DELETE /admissions/discharge/:id
exports.dischargeAdmission = (req, res) => {
  const { id } = req.params;

  // save the curdate() and then delete it. Push record into STAY HISTORY before deleting via Trigger

  const sql = "DELETE FROM admissions WHERE admission_id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error during discharge/deletion");
    }
    res.send("Discharged successfully");
  });
};





// New function with Room Availability Check
exports.addAdmissionSecure = (req, res) => {
  const { patient_id, room_id, admission_date } = req.body;

  // Step 1: Check if room exists and is currently 'Available'
  const checkSql = "SELECT status FROM rooms WHERE room_id = ?";
  
  db.query(checkSql, [room_id], (err, roomResult) => {
    if (err) return res.status(500).send("Database error during room check");
    
    if (roomResult.length === 0) {
      return res.status(404).send("Error: Room ID does not exist.");
    }

    if (roomResult[0].status !== 'Available') {
      return res.status(400).send(`Error: Room is currently ${roomResult[0].status}.`);
    }

    // Step 2: If available, proceed with admission
    const insertSql = "INSERT INTO admissions (patient_id, room_id, admission_date) VALUES (?, ?, ?)";
    db.query(insertSql, [patient_id, room_id, admission_date], (err, result) => {
      if (err) {
        console.error("MYSQL ERROR:", err.sqlMessage);
        return res.status(500).send(err.sqlMessage);
      }
      res.send("Admission added successfully. Room status updated to Occupied.");
    });
  });
};



// New function with Doctor ID support (old one didnt insert doctor ID)
exports.addAdmissionV2 = (req, res) => {
  const { patient_id, room_id, doctor_id, admission_date } = req.body;

  // Step 1: Check room availability
  const checkSql = "SELECT status FROM rooms WHERE room_id = ?";
  
  db.query(checkSql, [room_id], (err, roomResult) => {
    if (err) return res.status(500).send("Database error during room check");
    
    if (roomResult.length === 0) return res.status(404).send("Error: Room ID does not exist.");
    if (roomResult[0].status !== 'Available') return res.status(400).send(`Error: Room is ${roomResult[0].status}.`);

    // Step 2: Insert with doctor_id
    const insertSql = "INSERT INTO admissions (patient_id, room_id, doctor_id, admission_date) VALUES (?, ?, ?, ?)";
    db.query(insertSql, [patient_id, room_id, doctor_id, admission_date], (err, result) => {
      if (err) {
        console.error("MYSQL ERROR:", err.sqlMessage);
        return res.status(500).send(err.sqlMessage);
      }
      res.send("Admission added successfully with Doctor assigned.");
    });
  });
};

// Update Admission with Doctor ID support
exports.updateAdmissionV2 = (req, res) => {
  const { id } = req.params;
  const { patient_id, room_id, doctor_id, admission_date, discharge_date } = req.body;

  const sql = `
    UPDATE admissions 
    SET patient_id = ?, room_id = ?, doctor_id = ?, admission_date = ?, discharge_date = ? 
    WHERE admission_id = ?
  `;

  db.query(sql, [patient_id, room_id, doctor_id, admission_date, discharge_date, id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error updating admission");
    }
    res.send("Updated successfully");
  });
};
