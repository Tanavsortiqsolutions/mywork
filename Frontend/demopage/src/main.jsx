import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppLayout from "./Layout/AppLayout.jsx";



import Home from "./Page/Home/Home";
import About from "./Page/About/About";
import Contact from "./Page/Contact/Contact";
import Login from "./Page/Login/Login";
import Module from "./Page/Module/Module.jsx"

import StudentDash from "./Page/Dashboard/Student/StudentDash.jsx";


import "./index.css";
import AdminPannel from "./Page/Dashboard/ADMIN/AdminPannel.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>

        {/* 🌐 PUBLIC LAYOUT */}
        <Route element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Login />} />
          <Route path="module" element={<Module />} />
        </Route>
     
       
        <Route path="/StudentDash" element={<StudentDash />} />
        <Route path="/adminpannel" element={<AdminPannel />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
