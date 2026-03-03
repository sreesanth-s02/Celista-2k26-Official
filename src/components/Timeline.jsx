import { motion } from "framer-motion";

import eyes from "../assets/eyes.png";
import circuit from "../assets/circuit.png";
import core from "../assets/core.png";
import preparation from "../assets/preparation.png";
import logo from "../assets/logo.png";

const stages = [
  {
    title: "Official Announcement",
    subtitle: "📢 Symposium Reveal",
    date: "TBA",
    robot: eyes,
    terminal: "Initializing optical system..."
  },
  {
    title: "Website Launch",
    subtitle: "🌐 Public Portal Activated",
    date: "TBA",
    robot: circuit,
    terminal: "Booting circuit framework..."
  },
  {
    title: "Registration Opens",
    subtitle: "📝 Participant Enrollment Begins",
    date: "TBA",
    robot: core,
    terminal: "Core module installed..."
  },
  {
    title: "Early Bird Deadline",
    subtitle: "⏳ Priority Access Closed",
    date: "TBA",
    robot: preparation,
    terminal: "Preparation sequence engaged..."
  },
  {
    title: "Symposium Day",
    subtitle: "🚀 Events Begin",
    date: "2K26",
    robot: logo,
    terminal: "System fully activated."
  }
];

export default function Timeline() {
  return (
    <section className="text-white px-4 md:px-20 py-24 relative font-inter overflow-hidden">
      
      {/* TITLE */}
      <div className="text-center mb-24 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-orbitron text-3xl md:text-5xl font-light tracking-widest uppercase"
        >
          THE ROAD TO <span className="text-red-600">CELista 2K26</span>
        </motion.h2>
        <p className="text-gray-400 mt-4 tracking-wide text-sm md:text-base">
          Where Vision Becomes Experience.
        </p>
      </div>

      {/* TIMELINE CONTAINER */}
      <div className="relative max-w-7xl mx-auto">
        
        {/* CENTER LINE (Desktop Only) */}
        <motion.div 
          initial={{ height: 0 }}
          whileInView={{ height: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 w-[3px] bg-gradient-to-b from-red-500 via-red-400 to-red-500 shadow-[0_0_20px_rgba(255,0,0,0.6)] rounded-full z-0"
        />

        <div className="space-y-12 md:space-y-24">
            {stages.map((stage, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative flex flex-col md:flex-row items-center justify-between w-full group ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  
                  {/* CARD (45%) */}
                  <div className="w-full md:w-[45%] relative z-10">
                    <div className="bg-black/70 backdrop-blur-md border border-red-500/40 rounded-2xl transition-all duration-500 group-hover:shadow-[0_0_35px_rgba(255,0,0,0.7)] relative overflow-hidden min-h-[220px]">
                      
                      {/* Background Image Reveal */}
                      <img 
                          src={stage.robot} 
                          alt="Stage Reveal" 
                          className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-70 transition-all duration-500 z-0"
                      />
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/70 group-hover:bg-black/50 transition-colors duration-500 z-0"></div>

                      {/* Content */}
                      <div className="relative z-10 flex flex-col justify-center h-full p-8">
                        <div className="flex justify-between items-start mb-4 w-full">
                            <h3 className="font-orbitron text-2xl text-red-500 font-light tracking-wide text-left">
                                {stage.title}
                            </h3>
                            <span className="text-xs font-mono text-red-400 border border-red-500/30 px-2 py-1 rounded bg-black/50 flex-shrink-0">
                                {stage.date}
                            </span>
                        </div>
                        
                        <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6 text-left w-full">
                            {stage.subtitle}
                        </p>

                        <div className="text-red-500/70 font-mono text-xs tracking-widest border-t border-red-500/20 pt-4 text-left w-full">
                            &gt; {stage.terminal}
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* CENTER NODE (Desktop Only) */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center z-20">
                    <div className="w-6 h-6 rounded-full bg-red-500 shadow-[0_0_20px_rgba(255,0,0,0.8)] transition-transform duration-500 group-hover:scale-125"></div>
                    {/* Pulse */}
                    <div className="absolute w-full h-full rounded-full bg-red-500 animate-ping opacity-50"></div>
                  </div>

                  {/* SPACER (45%) */}
                  <div className="hidden md:block w-[45%]" />

                </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
}