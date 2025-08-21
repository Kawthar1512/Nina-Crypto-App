import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import LandPage from "./pages/Landing_Page";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Header from "./components/header";
import Wallet from "./components/wallet";
import Nav from "./components/Nav"; // Your landing page nav
import { AuthProvider } from "./contexts/authContext";
import PageWrapper from "./components/PageWrapper";
import { AnimatePresence, motion } from "framer-motion";

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const animations = {
  landing: {
    initial: { opacity: 0, y: 50, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -50, scale: 0.95 },
  },
  login: {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 50 },
  },
  register: {
    initial: { opacity: 0, rotateY: 120 },
    animate: { opacity: 1, rotateY: 0 },
    exit: { opacity: 0, rotateY: -90 },
  },
  wallet: {
    initial: { opacity: 0, y: 100 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -100 },
  },
};

const AnimatedPage = ({ children, animation }) => (
  <motion.div
    variants={animation}
    initial="initial"
    animate="animate"
    exit="exit"
    style={{ height: "100%" }}
  >
    {children}
  </motion.div>
);

const AppContent = () => {
  const location = useLocation();

  // this is to  Show  my Nav only on landing pag
  const showNav = location.pathname === "/";

  return (
    <>
      {showNav && <Nav />} {/* my Landing page nav */}
      <AnimatePresence mode="wait">
        {/* key must be location.pathname */}
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <AnimatedPage animation={animations.landing}>
                <LandPage />
              </AnimatedPage>
            }
          />
          <Route
            path="/login"
            element={
              <AnimatedPage animation={animations.login}>
                <Login />
              </AnimatedPage>
            }
          />
          <Route
            path="/register"
            element={
              <AnimatedPage animation={animations.register}>
                <Register />
              </AnimatedPage>
            }
          />
          <Route
            path="/wallet"
            element={
              <AnimatedPage animation={animations.wallet}>
                <Wallet />
              </AnimatedPage>
            }
          />
        </Routes>
      </AnimatePresence>
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
