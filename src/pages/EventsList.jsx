import { useState, useEffect, useLayoutEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { events } from "../data/events";
import Footblue from "../components/Footblue";
import Footered from "../components/Footered";

export default function EventsList() {
  const navigate = useNavigate();
  const { category } = useParams();
  const location = useLocation();

  useLayoutEffect(() => {
    // Scroll to top when the component mounts or category changes
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const filteredEvents = events.filter(
    (event) =>
      event.category &&
      category &&
      event.category.toLowerCase() === category.toLowerCase()
  );

  const isTechnical = category?.toLowerCase() === "technical";
  
  // Theme constants
  const theme = {
    text: isTechnical ? "text-blue-500" : "text-red-500",
    headingShadow: isTechnical 
      ? "drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" 
      : "drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]",
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  // Separate AI Arena for Technical
  let displayEvents = filteredEvents;
  if (isTechnical) {
    const aiArena = filteredEvents.find((e) => e.name === "AI Arena");
    const others = filteredEvents.filter((e) => e.name !== "AI Arena");
    if (aiArena) displayEvents = [aiArena, ...others];
  }

  return (
    <div className="min-h-screen px-4 sm:px-8 lg:px-12 pt-24 pb-16 overflow-x-hidden font-inter">
      <div className="max-w-7xl mx-auto">

        {/* BACK BUTTON */}
        <motion.button
          onClick={() => navigate("/#events")}
          className={`flex items-center gap-2 mb-12 ${theme.text} hover:opacity-80 transition-opacity group`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="text-base font-semibold tracking-wide">BACK TO HOME</span>
        </motion.button>

        {/* TITLE */}
        <h1 className={`text-3xl md:text-5xl font-orbitron font-light mb-16 text-center uppercase tracking-widest ${theme.text} ${theme.headingShadow}`}>
          {category} Events
        </h1>

        {/* GRID */}
        <motion.div 
          className="flex flex-wrap justify-center gap-8 sm:gap-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >

          {displayEvents.map((event) => (
              <motion.div
                key={event.id}
                variants={itemVariants}
                className="flex justify-center w-full sm:w-[calc(50%-1.25rem)] lg:w-[calc(33.333%-1.67rem)]"
              >
                <FlipCard
                  event={event}
                  navigate={navigate}
                  category={category}
                />
              </motion.div>
          ))}

        </motion.div>

        {/* EMPTY STATE */}
        {displayEvents.length === 0 && (
          <p className="text-gray-400 text-center mt-20 text-lg">
            No events found in this category.
          </p>
        )}
      </div>

      {/* SPACE BEFORE FOOTER */}
      <div className="mt-24">
        {isTechnical ? <Footblue /> : <Footered />}
      </div>
    </div>
  );
}

/* ===========================
   FLIP CARD
=========================== */

function FlipCard({ event, navigate, category }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const isTechnical = category?.toLowerCase() === "technical";

  // Theme Configuration
  const theme = {
    text: isTechnical ? "text-blue-500" : "text-red-500",
    border: isTechnical ? "border-blue-500/40" : "border-red-500/40",
    shadow: isTechnical ? "shadow-[0_0_12px_rgba(59,130,246,0.35)]" : "shadow-[0_0_12px_rgba(255,0,0,0.35)]",
    buttonBg: isTechnical ? "bg-blue-600 hover:bg-blue-500" : "bg-red-600 hover:bg-red-500",
    buttonShadow: isTechnical ? "hover:shadow-[0_0_15px_rgba(59,130,246,0.6)]" : "hover:shadow-[0_0_15px_rgba(220,38,38,0.6)]",
    badge: isTechnical ? "bg-blue-500/10 text-blue-400 border-blue-500/20" : "bg-red-500/10 text-red-400 border-red-500/20",
    divider: isTechnical ? "bg-blue-500/20" : "bg-red-500/20"
  };

  function handleMouseLeave() {
    if (window.innerWidth >= 1024) setIsFlipped(false);
  }

  return (
    <motion.div
      className="w-full max-w-[340px] h-[420px] perspective cursor-pointer group"
      onMouseEnter={() => window.innerWidth >= 1024 && setIsFlipped(true)}
      onMouseLeave={handleMouseLeave}
      onClick={() => window.innerWidth < 1024 && setIsFlipped(!isFlipped)}
      whileHover={{ scale: 1.02, translateY: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className="relative w-full h-full rounded-2xl transition-transform duration-700 preserve-3d"
        style={{
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* FRONT FACE */}
        <div 
          className={`absolute inset-0 backface-hidden rounded-2xl overflow-hidden border ${theme.border} ${theme.shadow} bg-black/80 backdrop-blur-sm`}
        >
          <img
            src={event.poster}
            alt={event.name}
            
            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
        </div>

        {/* BACK FACE */}
        <div
          className={`absolute inset-0 backface-hidden rounded-2xl border ${theme.border} ${theme.shadow} bg-black/95 backdrop-blur-md p-6 flex flex-col justify-between`}
          style={{ transform: "rotateY(180deg)" }}
        >
          <div className="space-y-4">
            {/* Title */}
            <h2 className={`text-lg font-orbitron font-light tracking-wide uppercase ${theme.text}`}>
              {event.name}
            </h2>

            {/* Divider */}
            <div className={`h-px w-full ${theme.divider}`} />

            {/* Description */}
            <p className="text-sm text-gray-300 leading-relaxed text-justify">
              {event.description}
            </p>
          </div>

          {/* Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/events/${category}/${event.id}`);
            }}
            className={`w-full py-3 rounded-lg text-white font-medium tracking-wide transition-all duration-300 shadow-lg ${theme.buttonBg} ${theme.buttonShadow}`}
          >
            View Details
          </button>
        </div>
      </div>
    </motion.div>
  );
}