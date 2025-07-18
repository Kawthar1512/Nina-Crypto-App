import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import LandPage from "./pages/Landing_Page";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Header from "./components/header";
import Wallet from "./components/wallet";
import Nav from "./components/Nav"; // Your landing page nav
import { AuthProvider } from "./contexts/authContext";

const AppContent = () => {
  const location = useLocation();

  // this is to  Show  my Nav only on landing page
  const showNav = location.pathname === "/";

  return (
    <>
      {showNav && <Nav />} {/* my Landing page nav */}

      <Routes>
        <Route path="/" element={<LandPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/wallet" element={<Wallet />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
};

export default App;
