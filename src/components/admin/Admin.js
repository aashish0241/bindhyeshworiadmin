import React from "react";
import {Routes , Route, } from "react-router-dom";

// components

import AdminNavbar from "../AdminNavbar/AdminNavbar.js";
import Sidebar from "../Sidebar/Sidebar.js";
import HeaderStats from "../Header/HeaderStats.js";
// import FooterAdmin from "../Footers/FooterAdmin.js";

// views

import Dashboard from "../admin/Dashboard.js";
import footer from "./footer.js";
// import Maps from "../admin/Maps.js";
// import Settings from "../admin/Settings.js";
// import Tables from "../admin/Tables.js";

export default function Admin() {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Routes>
            <Route path="/dashboard" exact component={Dashboard} />
            {/* <Route path="/admin/maps" exact component={Maps} />
            <Route path="/admin/settings" exact component={Settings} />
            <Route path="/admin/tables" exact component={Tables} />
            <Redirect from="/admin" to="/admin/dashboard" /> */}
          </Routes>
          <footer/>
        </div>
      </div>
    </>
  );
}
