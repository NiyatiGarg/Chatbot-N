import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import Main from "./components/Main/Main";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProtectedRoute from "../ProtectedRoute";

function App() {
  return (
    <>
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Default or catch-all route */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>

    </>
  );
}

export default App;
