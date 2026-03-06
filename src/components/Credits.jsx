import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const creditsData = [
  {
    role: "SYMPOSIUM COORDINATORS",
    names: [
      "Adhavsaran R",
      "Harshita P R",
      "Praveen R",
      "Yuvashree A R"
    ]
  },
  {
    role: "WEBSITE DEVELOPMENT",
    names: [
      "Eraianbu D",
      "Sreesanth S",
      "Sudharsann C S",
      "Sanjita R",
      "Sreenidhi V"
    ]
  },
  {
    role: "POSTER DESIGN & MAGAZINE",
    names: ["Aathika Nisha", "Aishwarya", "Anees Fathima","Dhanuza","Darshan","Hema Daarini","Madhumitha","Mridhunitha","Prathiksha","Priyanka","Preethi","Venugopal"]
  },
  {
    role: " VIDEO EDITING",
    names: ["Rohith Devavradhan G", "Samuel R", "Kishore S"]
  },
  {
    role: "EVENT COORDINATORS",
    names: [
      "Dakshineshwar Vel A",
      "Eraianbu D",
      "Harish E",
      "Nikhitha S",
      "Paranthaman P",
      "Swapnika",
      "Sanjita R",
      "Sarika R",
      "Sudharsann C S",
      "Varshaa P S"
    ]
  },
  {
    role: "EVENT CO-COORDINATORS",
    names: [
      "Krithika",
      "Prince",
      "Jayanth",
      "Preethi Y",
      "Dhilothi B",
      "Rithika V",
      "Kanishka R",
      "Rahul",
      "Naaneshwari",
      "Akshaya G"
    ]
  },
  {
    role: "SYMPOSIUM STAFF COORDINATORS",
    names: [
      "Mrs. Pavithra K",
      "Mrs. Swathy K"
    ]
  },
  {
    role: "STAFF COORDINATORS",
    names: [
      "Asst Prof. Mrs. Dhivya T",
      "Asst Prof. Dr. Ramasubramaniyam S",
      "Asst Prof. Mrs. Jayapriya A",
      "Asst Prof. Mrs. Valentina G",
      "Asst Prof. Mrs. Punitha T",
      "Asst Prof. Mrs. Ani Bernish T",
      "Asst Prof. Mrs. Prema",
      "Asst Prof. Mr. Prabhakaran T",
      "Asst Prof. Mrs. Sabhitha C H",
      "Asst Prof. Ms. Yogitha"
    ]
  },
  {
    role: "SPECIAL THANKS TO",
    names: [
      "Dr. Mathangi Narayanan",
      "Dr. S.V Saravanan"
    ]
  }
  
];

const processedCredits = creditsData.flatMap((item) => {
  if (item.names.length > 5) {
    const chunks = [];
    for (let i = 0; i < item.names.length; i += 5) {
      chunks.push({
        role: item.role,
        names: item.names.slice(i, i + 5)
      });
    }
    return chunks;
  }
  return item;
});

export default function Credits() {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % processedCredits.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const active = processedCredits[index];

  return (
    <section className="relative min-h-screen text-white overflow-hidden flex flex-col justify-center px-6 md:px-20 py-16">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(circle_at_1px_1px,#ff0000_1px,transparent_0)] bg-[length:32px_32px]" />

      {/* Back Button */}
      <motion.button
        onClick={() => navigate("/")}
        className="absolute top-8 left-6 md:left-12 flex items-center gap-2 text-red-500 hover:text-red-400 transition-colors z-50 group"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-mono tracking-widest uppercase">Back to Home</span>
      </motion.button>

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        {/* DESKTOP LAYOUT */}
        <div className="hidden md:grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* LEFT SECTION */}
          <div className="flex flex-col justify-center text-left space-y-8">
            <div className="space-y-2">
              <h1 className="text-5xl lg:text-6xl font-orbitron font-light text-white tracking-tight">
                THE FORCE BEHIND
              </h1>
              <h1 className="text-6xl lg:text-7xl font-orbitron font-light text-red-600 tracking-tighter drop-shadow-lg">
                CELISTA 2K26
              </h1>
            </div>

            <p className="text-gray-400 text-lg tracking-wide max-w-md border-l-2 border-red-600/50 pl-6">
              Built by Vision. Powered by Passion.<br />
              Meet the minds engineering the future.
            </p>
          </div>

          {/* RIGHT SECTION (Card) */}
          <div className="flex flex-col items-center justify-center w-full">
            <div className="relative w-full max-w-xl min-h-[450px] border border-red-500/40 bg-black/70 backdrop-blur-md rounded-2xl shadow-[0_0_20px_rgba(255,0,0,0.25)] p-10 flex flex-col justify-center">
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="flex flex-col h-full"
                >
                  {/* Terminal header */}
                  <div className="text-xs text-red-400/70 font-mono tracking-wide space-y-1 mb-8">
                    <p>&gt; Initializing protocol...</p>
                    <p>&gt; Loading profile data...</p>
                    <p>&gt; <span className="text-green-500">Access granted.</span></p>
                  </div>

                  {/* Role */}
                  <h2 className="text-xl uppercase tracking-[0.3em] text-red-500 font-orbitron font-light border-b border-red-500/40 pb-4 mb-8 text-center">
                    {active.role}
                  </h2>

                  {/* Names List */}
                  <div className="flex flex-col items-center space-y-4 flex-grow justify-center">
                    {active.names.map((person, i) => (
                      <p
                        key={i}
                        className="
                          text-lg
                          text-gray-200
                          font-medium
                          tracking-wide
                          text-center
                          transition-colors
                          duration-300
                          hover:text-red-400
                          cursor-default
                        "
                      >
                        {person}
                      </p>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="text-[10px] text-gray-600 tracking-widest uppercase text-center mt-8 font-mono">
                    // System_ID: {index + 1} / {processedCredits.length}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* MOBILE LAYOUT */}
        <div className="md:hidden flex flex-col gap-10 mt-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-orbitron font-light text-white leading-tight">
              THE FORCE BEHIND
            </h1>
            <h1 className="text-5xl font-orbitron font-light text-red-600 leading-none">
              CELISTA 2K26
            </h1>
            <p className="text-gray-400 text-sm tracking-wide mt-2">
              Built by Vision. Powered by Passion.
            </p>
          </div>

          <div className="w-full border border-red-500/40 bg-black/70 backdrop-blur-md rounded-2xl shadow-[0_0_20px_rgba(255,0,0,0.25)] p-6 min-h-[400px] flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col h-full"
              >
                <div className="text-xs text-red-400/70 font-mono tracking-wide space-y-1 mb-6">
                  <p>&gt; System ready.</p>
                </div>

                <h2 className="text-lg uppercase tracking-[0.2em] text-red-500 font-orbitron font-light border-b border-red-500/40 pb-3 mb-6 text-center">
                  {active.role}
                </h2>

                <div className="flex-1 flex flex-col items-center justify-center space-y-3">
                  {active.names.map((person, i) => (
                    <p
                      key={i}
                      className="text-base text-gray-200 font-medium hover:text-red-400 transition-colors"
                    >
                      {person}
                    </p>
                  ))}
                </div>

                 <div className="text-[10px] text-gray-600 tracking-widest uppercase text-center mt-6 font-mono">
                    // {index + 1} / {processedCredits.length}
                  </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}