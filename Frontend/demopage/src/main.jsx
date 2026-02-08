import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import App from "./App";

// Landing flow (ALL part of same layout)
import Home from "./Page/Home/Home";
import Module from "./Page/Module/Module";
import About from "./Page/About/About";
import Contact from "./Page/Contact/Contact";
import Login from "./Page/Login/Login";


// Dashboards
import Student from "./Page/Dashboard/Student/Student";

// // Super Admin
import SuperAdmin from "./Page/Dashboard/SUPERADMIN/SuperAdmin.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,   // ✅ Common landing layout
  
    children: [
      { index: true, element: <Home /> }, // /
      { path: "module", element: <Module /> }, // /module (landing part)
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      {path :"module", element: <Module />},
       { path: "/login", element: <Login /> },
    ],
  },

  // No layout pages
 

  // Dashboards
  { path: "/student", element: <Student /> },
  {path: "/SuperAdmin", element: <SuperAdmin />},
  // { path: "/manager", element: <Manager /> },
  // { path: "/accountant", element: <Accountant /> },

  // Super Admin
  // { path: "/superadmin", element: <SuperAdmin /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
