const db = require('../config/db');

exports.getAnalytics = (req, res) => {

  const queries = {
    patients: "SELECT COUNT(*) AS count FROM patients",
    doctors: "SELECT COUNT(*) AS count FROM doctors",
    departments: "SELECT COUNT(*) AS count FROM departments",
    appointments: "SELECT COUNT(*) AS count FROM appointments"
  };

  let result = {};

  db.query(queries.patients, (err, r1) => {
    if (err) return res.status(500).send("Error");

    result.patients = r1[0].count;

    db.query(queries.doctors, (err, r2) => {
      if (err) return res.status(500).send("Error");

      result.doctors = r2[0].count;

      db.query(queries.departments, (err, r3) => {
        if (err) return res.status(500).send("Error");

        result.departments = r3[0].count;

        db.query(queries.appointments, (err, r4) => {
          if (err) return res.status(500).send("Error");

          result.appointments = r4[0].count;

          res.json(result);
        });
      });
    });
  });
};