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


exports.getStayHistorySummary = (req, res) => {
  const sql = `
    SELECT 
      sh.patient_id,      
      sh.admit_date,
      sh.discharge_date,
      p.name AS patient_name,
      r.room_number,
      r.type,
      -- Calculate stay duration (DATEDIFF). If 0 days, GREATEST makes it 1 for billing.
      GREATEST(1, DATEDIFF(IFNULL(sh.discharge_date, CURDATE()), sh.admit_date)) AS stay_days,
      -- Calculate total: (Days * Rate) with a ₹1000 minimum floor
      GREATEST(1000, 
        GREATEST(1, DATEDIFF(IFNULL(sh.discharge_date, CURDATE()), sh.admit_date)) * CASE 
          WHEN LOWER(r.type) = 'general' THEN 500
          WHEN LOWER(r.type) = 'semi-private' THEN 1200
          WHEN LOWER(r.type) = 'private' THEN 2500
          WHEN LOWER(r.type) = 'icu' THEN 5000
          ELSE 0
        END
      ) AS total_charges
    FROM stay_history sh
    JOIN patients p ON sh.patient_id = p.patient_id
    JOIN rooms r ON sh.room_id = r.room_id
    ORDER BY sh.discharge_date DESC
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error fetching stay history summary");
    }
    res.json(result);
  });
};