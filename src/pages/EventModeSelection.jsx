import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import robotImage from "../assets/events.png";

export default function EventModeSelection() {
  const navigate = useNavigate();

  const handleSelection = (category) => {
    navigate(`/events/${category}`);
  };

  return (<div id="events" className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 overflow-hidden z-10">

      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-7xl mx-auto">

        {/* Heading */}
        <motion.h1
          className="text-3xl md:text-5xl font-orbitron font-light tracking-widest text-red-500 mb-16 text-center uppercase"
          // using Orbitron light for title
          style={{
            fontFamily: "'Orbitron', sans-serif",
          }}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          CHOOSE YOUR EVENTS
        </motion.h1>

        {/* Robot Image */}
        <motion.div
          className="w-full max-w-7xl mx-auto flex justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        >
            <img
              src={robotImage}
              alt="Robot"
              className="w-full h-auto object-contain max-h-[50vh] md:max-h-[70vh]"
            />
        </motion.div>

        {/* Buttons */}
        <motion.div 
          className="flex flex-row w-full max-w-7xl mt-4 md:mt-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="w-1/2 flex justify-center md:justify-end md:pr-28 px-1">
              <button
                onClick={() => handleSelection("technical")}
                className="px-2 sm:px-8 py-2 sm:py-3 rounded-lg border border-blue-500 text-blue-400 font-orbitron font-light text-[10px] sm:text-sm md:text-base tracking-wider hover:scale-105 hover:bg-blue-500/10 transition-all duration-300"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                TECHNICAL EVENTS
              </button>
          </div>
          <div className="w-1/2 flex justify-center md:justify-start md:pl-28 px-1">
              <button
                onClick={() => handleSelection("non-technical")}
                className="px-2 sm:px-8 py-2 sm:py-3 rounded-lg border border-red-500 text-red-400 font-orbitron font-light text-[10px] sm:text-sm md:text-base tracking-wider hover:scale-105 hover:bg-red-500/10 transition-all duration-300"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                NON-TECHNICAL EVENTS
              </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}