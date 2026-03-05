import { motion } from "framer-motion";

function Location() {
  return (
    <section
      id="location"
      className="location-section min-h-screen bg-black py-20 px-4"
    >
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-orbitron text-4xl md:text-5xl text-white tracking-widest text-center mb-20"
        >
          LOCATION
        </motion.h2>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-orbitron text-2xl text-white mb-6 tracking-widest">
              VENUE
            </h3>

            <p className="text-gray-300 mb-4 text-lg">
              Meenakshi Sundararajan Engineering College
            </p>

            <p className="text-gray-400 leading-relaxed mb-6">
              Kodambakkam High Road,<br />
              Chennai – 600078,<br />
              Tamil Nadu, India
            </p>

            <p className="text-gray-500 text-sm">
              Easily accessible by public transport and well connected
              across the city.
            </p>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="border border-white/10 overflow-hidden"
          >
            <iframe
              title="Find Us on Google Maps"
              src="https://maps.google.com/maps?q=Meenakshi%20Sundararajan%20Engineering%20College&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="360"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className=" opacity-90"
              background="transparent"
          
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export default Location;
