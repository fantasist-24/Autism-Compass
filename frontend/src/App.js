import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import Landing from "./Landing";
import ChildReg from "./LogInSignUpComponent/RegChild";
import DoctorReg from "./LogInSignUpComponent/RegDoctor";
import LogIn from "./LogInSignUpComponent/Login";
import ParentReg from "./LogInSignUpComponent/RegParent";
import TeacherReg from "./LogInSignUpComponent/RegTeacher";
import ResetPass from "./LogInSignUpComponent/ResetPass";
import ProductDetails from "./productComponent/productDetails";
import Profile from "./LogInSignUpComponent/Profile";
import Therapy from "./TherapyComponent/Therapy";
import TherapyDetails from "./TherapyComponent/TherapyDetails";
import TherapyOrganizations from "./TherapyComponent/TherapyORG";

function App() {

   return (
      <div className="main-app">
         <Router>
            <Routes>
               <Route path="/" element={<Landing/>} />
               <Route path="/login" element={<LogIn />} />
               <Route path="/signup/parent" element={<ParentReg />} />
               <Route path="/signup/child" element={<ChildReg />} />
               <Route path="/signup/doctor" element={<DoctorReg />} />
               <Route path="/signup/teacher" element={<TeacherReg />} />
               <Route path="/dashboard" element={<Dashboard />} />
               <Route path='/reset-password' element={<ResetPass />} />
               <Route path="/product/:id" element={<ProductDetails />} />
               <Route path='/profile' element={<Profile />} />
               <Route path='/therapy' element={<Therapy />} />
               <Route path='/therapy/details' element={<TherapyDetails />} />
               <Route path='/therapy/org' element={<TherapyOrganizations />} />
            </Routes>
         </Router>
      </div>
   );
}

export default App;
