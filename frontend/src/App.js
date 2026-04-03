import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";

import Dashboard from "./pages/Dashboard";

import Patients from "./pages/Patients";
import AddPatient from "./pages/AddPatient";

import Departments from "./pages/Departments";
import AddDepartment from "./pages/AddDepartment";

import ProtectedRoute from "./components/ProtectedRoute";

import Rooms from "./pages/Rooms";
import AddRoom from "./pages/AddRoom";

import Doctors from "./pages/Doctors";
import AddDoctor from "./pages/AddDoctor";

import Appointments from "./pages/Appointments";
import AddAppointment from "./pages/AddAppointment";

import Bills from "./pages/Bills";

import Home from "./pages/Home";

import Register from "./pages/Register";
import Analytics from "./pages/Analytics";

import Admissions from "./pages/Admissions";
import Payments from "./pages/Payments";

import Prescriptions from "./pages/Prescriptions"; 

import ViewAllPrescriptions from "./pages/ViewAllPrescriptions";
import StayHistory from "./pages/StayHistory";

import Reports from "./pages/Reports";
import PatientsByRoom from "./pages/PatientsByRoom";
import BillingAnalytics from "./pages/BillingAnalytics";
import Clinical from "./pages/Clinical";
import BillingAndFinance from "./pages/BillingAndFinance";
import Infrastructure from "./pages/Infrastructure";
import AnalyticsHome from "./pages/AnalyticsHome";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />


        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={
          <ProtectedRoute><Dashboard /></ProtectedRoute>
        } />

        <Route path="/patients" element={
          <ProtectedRoute><Patients /></ProtectedRoute>
        } />

        <Route path="/patients/add-patient" element={
          <ProtectedRoute><AddPatient /></ProtectedRoute>
        } />

        <Route path="/departments" element={
          <ProtectedRoute><Departments /></ProtectedRoute>
        } />

        <Route path="/prescriptions/:patientId" element={<Prescriptions />} />


        <Route path="/departments/add-department" element={
          <ProtectedRoute><AddDepartment /></ProtectedRoute>
        } />

        <Route path="/rooms" element={
          <ProtectedRoute><Rooms /></ProtectedRoute>
        } />

        <Route path="/rooms/add-room" element={
          <ProtectedRoute><AddRoom /></ProtectedRoute>
        } />

        <Route path="/doctors" element={
          <ProtectedRoute><Doctors /></ProtectedRoute>
        } />

        <Route path="/doctors/add-doctor" element={
          <ProtectedRoute><AddDoctor /></ProtectedRoute>
        } />

        <Route path="/appointments" element={
          <ProtectedRoute><Appointments /></ProtectedRoute>
        } />

        <Route path="/prescriptions" element={
          <ProtectedRoute><ViewAllPrescriptions /></ProtectedRoute>
        } />

        <Route path="/bills" element={
          <ProtectedRoute><Bills /></ProtectedRoute>
        } />

        <Route path="/appointments/add-appointment" element={
          <ProtectedRoute><AddAppointment /></ProtectedRoute>
        } />

        <Route path="/analytics" element={
          <ProtectedRoute><Analytics /></ProtectedRoute>
        } />

        <Route path="/admissions" element={
          <ProtectedRoute><Admissions /></ProtectedRoute>
        } />

        <Route path="/payments" element={
          <ProtectedRoute><Payments /></ProtectedRoute>
        } />

        <Route path="/stayhistory" element={
          <ProtectedRoute><StayHistory /></ProtectedRoute>
        } />

         <Route path="/reports" element={
          <ProtectedRoute><Reports/></ProtectedRoute>
        } />

        <Route path="/patients/patientsbyroom" element={
          <ProtectedRoute><PatientsByRoom/></ProtectedRoute>
        } />

        <Route path="/bills/billingAnalytics" element={
          <ProtectedRoute><BillingAnalytics/></ProtectedRoute>
        } />

        <Route path="/clinical" element={
          <ProtectedRoute><Clinical/></ProtectedRoute>
        } />

        <Route path="/billingAndFinance" element={
          <ProtectedRoute><BillingAndFinance/></ProtectedRoute>
        } />

        <Route path="/infrastructure" element={
          <ProtectedRoute><Infrastructure/></ProtectedRoute>
        } />

        <Route path="/analyticsHome" element={
          <ProtectedRoute><AnalyticsHome/></ProtectedRoute>
        } />


      </Routes>
    </BrowserRouter>
  );
}

export default App;