import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./pages/Hero";
import About from "./pages/About";
import EventModeSelection from "./pages/EventModeSelection";
import EventsList from "./pages/EventsList";
import EventDetail from "./pages/EventDetail";
import CountdownTimer from "./components/CountdownTimer";
import GlobalSmoke from "./components/GlobalSmoke";
import CustomCursor from "./components/CustomCursor";
import Footer from "./pages/Footer";
import Location from "./pages/Location";
import Particles from "./components/Particles";
import ChatBot from "./components/Chatbot/Chatbot";
import Sponsors from "./components/Sponsors";
import Credits from "./components/Credits";
import Timeline from "./components/Timeline";
import Memories from "./pages/Memories";

function App() {
  const [scrollY, setScrollY] = useState(0);
  const location = useLocation(); // ✅ required for route detection

  const hideRoutes = ["/memories", "/credits"];

const shouldHideNavbar =
  hideRoutes.includes(location.pathname) ||
  location.pathname.startsWith("/events");

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const dockTimer = scrollY > 400;
  const hideSmoke = scrollY < window.innerHeight;

  return (
    <>
      {/* Background */}
      <Particles />
      <GlobalSmoke hidden={hideSmoke} />
      <ChatBot />

      {/* Foreground */}
      <div className="main-content">
        <CustomCursor />

        {/* Hide Navbar only on Memories page */}
        {!shouldHideNavbar && <Navbar />}

        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <CountdownTimer docked={dockTimer} />
                <About />
                <Timeline />
                <EventModeSelection />
                <Location />
                <Sponsors />
        


                {/* PEOPLE BEHIND SECTION */}
                <section className="relative py-24 text-white text-center overflow-hidden">
                  <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-3xl md:text-4xl font-semibold tracking-wide mb-4">
                      The People Behind{" "}
                      <span className="text-red-600">CELISTA 2K26</span>
                    </h2>

                    <p className="text-gray-400 text-lg mb-10">
                      Meet the team powering the symposium.
                    </p>

                    <button
                      onClick={() => window.location.href = "/credits"}
                      className="
                        px-8 py-3
                        border border-red-600
                        text-red-600
                        tracking-widest
                        uppercase
                        transition-all
                        duration-300
                        hover:bg-red-600
                        hover:text-black
                      "
                    >
                      View Credits →
                    </button>
                  </div>
                </section>

                <Footer />
              </>
            }
          />

          <Route path="/events/:category" element={<EventsList />} />
          <Route
            path="/events/:category/:eventId"
            element={<EventDetail />}
          />

          {/* Memories Page */}
          <Route path="/memories" element={<Memories />} />

          {/* Credits Page */}
          <Route path="/credits" element={<Credits />} />
        </Routes>
      </div>
    </>
  );
}

export default App;