import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Preloader from "./components/Preloader";
import { lazy,Suspense } from "react";


const Hero = lazy(() => import("./pages/Hero"));
const About = lazy(() => import("./pages/About"));
const EventModeSelection = lazy(() => import("./pages/EventModeSelection"));
const EventsList = lazy(() => import("./pages/EventsList"));
const EventDetail = lazy(() => import("./pages/EventDetail"));
const Footer = lazy(() => import("./pages/Footer"));
const Location = lazy(() => import("./pages/Location"));
const Sponsors = lazy(() => import("./components/Sponsors"));
const Credits = lazy(() => import("./components/Credits"));
const Timeline = lazy(() => import("./components/Timeline"));
const Memories = lazy(() => import("./pages/Memories"));
const ChatBot = lazy(() => import("./components/Chatbot/Chatbot"));

import Navbar from "./components/Navbar";
import CountdownTimer from "./components/CountdownTimer";
import GlobalSmoke from "./components/GlobalSmoke";
import CustomCursor from "./components/CustomCursor";
import Particles from "./components/Particles";

function App() {

  /* ---------------- PRELOADER ---------------- */
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500); // loader time

    return () => clearTimeout(timer);
  }, []);

  /* ---------------- SCROLL ---------------- */
  const [scrollY, setScrollY] = useState(0);
  const location = useLocation();

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

  /* ---------------- SHOW PRELOADER ---------------- */
  if (loading) {
    return <Preloader />;
  }

  return (
    <>
      {/* Background */}
      <Particles />
      <GlobalSmoke hidden={hideSmoke} />
      <Suspense fallback={null}>
      <ChatBot />
      </Suspense>


      {/* Foreground */}
      <Suspense
        fallback={<Preloader />}
      >
      <div className="main-content">
        {typeof window !== "undefined" && window.innerWidth > 900 && <CustomCursor />}

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

          <Route path="/memories" element={<Memories />} />

          <Route path="/credits" element={<Credits />} />
        </Routes>
        
      </div>
      </Suspense>
    </>
  );
}

export default App;