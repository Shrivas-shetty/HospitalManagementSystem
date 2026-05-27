

const express = require('express');
const cors = require('cors');
const db=require('./config/db');
const app = express();
const patientRoutes = require('./routes/patientRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const billRoutes = require('./routes/billRoutes');
const authRoutes = require('./routes/authRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const roomRoutes = require('./routes/roomRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const admissionRoutes = require('./routes/admissionRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const prescriptionRoutes = require('./routes/prescriptionRoutes');
const stayHistoryRoutes = require('./routes/stayHistoryRoutes');
const reportsRoutes = require('./routes/reportsRoutes'); 

const billRoutesA = require('./routes/billRoutesA');



app.use(cors());
app.use(express.json());

app.use('/patients', patientRoutes);
app.use('/doctors', doctorRoutes);
app.use('/appointments', appointmentRoutes);
app.use('/bills', billRoutes);
app.use('/auth', authRoutes);
app.use('/dept', departmentRoutes);
app.use('/rooms', roomRoutes);
app.use('/analytics', analyticsRoutes);
app.use('/admissions', admissionRoutes);
app.use('/payments', paymentRoutes);
app.use('/prescriptions', prescriptionRoutes);
app.use('/stay-history', stayHistoryRoutes);
app.use('/reports', reportsRoutes);

app.use('/bills-a', billRoutesA);



app.get('/', (req, res) => {
  res.send('API Running');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('Server running on port 5000');
});