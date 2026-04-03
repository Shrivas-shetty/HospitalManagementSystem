const db = require('../config/db');

exports.getStayHistory = (req, res) => {
  const sql = `
    SELECT
      sh.patient_id,       
      sh.admit_date,
      sh.discharge_date,
      p.name AS patient_name,
      r.room_number,
      r.type
    FROM stay_history sh
    JOIN patients p ON sh.patient_id = p.patient_id
    JOIN rooms r ON sh.room_id = r.room_id
    ORDER BY sh.discharge_date DESC
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error fetching stay history");
    }
    res.json(result);
  });
};