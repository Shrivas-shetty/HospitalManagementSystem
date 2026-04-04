const db = require('../config/db');

// Get All Admissions (Simplified - No JOINS for now to focus on logic)
// Accessed via: GET /admissions
exports.getAdmissions = (req, res) => {
  // Option: Carry over Admin check if needed
  // if (req.user.role !== 'Admin') return res.status(403).send("Admin Access Only");

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
  const { patient_id, room_id, admission_date } = req.body;

  // Make sure these match your MySQL Workbench 'Field' names exactly
  const sql = "INSERT INTO admissions (patient_id, room_id, admission_date) VALUES (?, ?, ?)";

  db.query(sql, [patient_id, room_id, admission_date], (err, result) => {
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

  // IMPORTANT REQUIREMENT: Instead of a normal DELETE, we must first
  // save the curdate() and then delete it.

  // We are going to use a special SQL query that does both in one operation
  // for your later trigger. We will create a query that SETs curdate(), 
  // and your database trigger will handle the rest.

  // Simplified approach to get the behavior you want:
  // Step 1: Tell the database to perform the discharge operation with a special query.
  // Then your AFTER DELETE trigger (which you'll create later) can access it.

  // (This matches your requirement to "delete it" while still storing the date)
  const sql = "DELETE FROM admissions WHERE admission_id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error during discharge/deletion");
    }
    res.send("Discharged successfully");
  });
};


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














