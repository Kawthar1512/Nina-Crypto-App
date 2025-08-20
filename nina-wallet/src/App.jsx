import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import LandPage from "./pages/Landing_Page";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Header from "./components/header";
import Wallet from "./components/wallet";
import Nav from "./components/Nav"; // Your landing page nav
import { AuthProvider } from "./contexts/authContext";
import PageWrapper from "./components/PageWrapper";
import { AnimatePresence } from "framer-motion";


const AppContent = () => {
  const location = useLocation();

  // this is to  Show  my Nav only on landing pag
  const showNav = location.pathname === "/";

  return (
    <>
      {showNav && <Nav />} {/* my Landing page nav */}
      <AnimatePresence exitBeforeEnter>

        <Routes location={location} key={location.pathname}>
        <Route path="/" element={ <motion.div
                variants={pageTransition}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <LandPage />
              </motion.div>
            }
          />
        <Route path="/login" element={ <motion.div
                variants={pageTransition}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <Login />
              </motion.div>
            }
          />
        <Route path="/register" element={<motion.div
                variants={pageTransition}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <Register />
              </motion.div>
            }
          />
        <Route path="/wallet" element={<motion.div
                variants={pageTransition}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <Wallet />
              </motion.div>
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
