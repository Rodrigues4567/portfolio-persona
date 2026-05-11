import { useCallback } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import P3Menu from "./P3Menu";
import ResumePage from "./ResumePage";
import PageTransition from "./PageTransition";
import AboutMe from "./AboutMe";
import "./App.css";

const MENU_VIDEO   = "https://res.cloudinary.com/dn4t5fdrg/video/upload/q_auto/v1775790300/Mainn-compact_lptotj.mp4";
const RESUME_VIDEO = "https://res.cloudinary.com/dn4t5fdrg/video/upload/q_auto/v1775790346/main2_psplmb.mp4";
const ABOUT_VIDEO  = "https://res.cloudinary.com/dn4t5fdrg/video/upload/q_auto/v1775931424/main1_vsbgmj.mp4";

function MenuScreen() {
  const navigate = useNavigate();
  const handleNavigate = useCallback((page) => navigate(`/${page}`), [navigate]);
  return (
    <div id="menu-screen">
      <video src={MENU_VIDEO} preload="auto" autoPlay loop muted playsInline />
      <P3Menu onNavigate={handleNavigate} />
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <MenuScreen />
            </PageTransition>
          }
        />
        <Route
          path="/about"
          element={
            <PageTransition variant="about">
              <AboutMe />
            </PageTransition>
          }
        />
        <Route
          path="/resume"
          element={
            <PageTransition>
              <ResumePage src={RESUME_VIDEO} />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <>
      <video src={MENU_VIDEO}   preload="auto" muted playsInline style={{ display: "none" }} />
      <video src={RESUME_VIDEO} preload="auto" muted playsInline style={{ display: "none" }} />
      <video src={ABOUT_VIDEO}  preload="auto" muted playsInline style={{ display: "none" }} />
      <AnimatedRoutes />
    </>
  );
}
