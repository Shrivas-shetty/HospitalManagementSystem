const db = require('../config/db');

// Get all bills directly from the admissionbills table
exports.getBills = (req, res) => {
    // No JOINs here, so data persists even after admission is deleted
    const sql = "SELECT id, admission_id, amount, status FROM admissionbills ORDER BY id DESC";
    
    db.query(sql, (err, result) => {
        if (err) {
            console.error("Fetch Error:", err);
            return res.status(500).send("Error fetching billing records");
        }
        res.json(result);
    });
};

// Update status (Paid/Unpaid)
exports.updateBillStatus = (req, res) => {
    const { id } = req.params; 
    const { status } = req.body;

    const sql = "UPDATE admissionbills SET status = ? WHERE id = ?";
    db.query(sql, [status, id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send("Status updated successfully");
    });
};