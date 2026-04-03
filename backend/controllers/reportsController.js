const db = require('../config/db');

// Get Monthly Revenue from the view
exports.getMonthlyRevenue = (req, res) => {
  const sql = "SELECT * FROM monthly_revenue ORDER BY month DESC";
  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error fetching revenue data");
    }
    res.json(result);
  });
};

// Get Doctor Stats from the view
exports.getDoctorStats = (req, res) => {
  const sql = "SELECT * FROM doctor_stats";
  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error fetching doctor stats");
    }
    res.json(result);
  });
};


// A. Department-wise Revenue (JOIN + GROUP BY)
exports.getDeptRevenue = (req, res) => {
  const sql = `
    SELECT dep.name AS department, SUM(p.amount) AS total_revenue
    FROM departments dep
    JOIN doctors doc ON doc.department_id = dep.department_id
    JOIN appointments app ON app.doctor_id=doc.doctor_id
    JOIN bills b on b.appointment_id = app.appointment_id
    JOIN payments p ON b.bill_id = p.bill_id
    GROUP BY department
    order by total_revenue desc
  `;
  db.query(sql, (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
};

// B. Top Paying Patients (SUBQUERY)
exports.getTopPatients = (req, res) => {
  const sql = `
    SELECT pat.name , SUM(p.amount) FROM patients pat
    JOIN appointments app ON pat.patient_id=app.patient_id
    JOIN bills b ON app.appointment_id=b.appointment_id
    JOIN payments p ON b.bill_id=p.bill_id
    Group by pat.patient_id
    order by SUM(p.amount) DESC
  `;
  db.query(sql, (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
};