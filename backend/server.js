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



app.use(cors());
app.use(express.json());

app.use('/patients', patientRoutes);
app.use('/doctors', doctorRoutes);
app.use('/appointments', appointmentRoutes);
app.use('/bills', billRoutes);
app.use('/auth', authRoutes);
app.use('/dept', departmentRoutes);

app.get('/', (req, res) => {
  res.send('API Running');
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});