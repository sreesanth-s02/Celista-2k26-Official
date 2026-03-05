function Footer() {
  return (
    <footer className="relative z-10 bg-black border-t border-white/10 px-6 py-20">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-16">

        {/* Brand */}
        <div>
          <h3 className="font-orbitron text-2xl text-white tracking-widest mb-4">
            CELISTA <span className="text-primary">2K26</span>
          </h3>

          <p className="text-gray-400 leading-relaxed">
            A National Level Technical Symposium organized by the
            Department of Artificial Intelligence & Data Science.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-orbitron text-lg text-white tracking-widest mb-6">
            QUICK LINKS
          </h4>

          <ul className="space-y-4 text-gray-400">
            
            <li>
              <a href="#about" className="hover:text-primary transition">
                About
              </a>
            </li>
            <li>
              <a href="#events" className="hover:text-primary transition">
                Events
              </a>
            </li>
            <li>
              <a href="#location" className="hover:text-primary transition">
                Location
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-orbitron text-lg text-white tracking-widest mb-6">
            CONTACT
          </h4>

          <p className="text-gray-400 mb-4">
            Meenakshi Sundararajan Engineering College<br />
            Chennai, Tamil Nadu
          </p>

          <p className="text-gray-400 mb-4">
            Email:{" "}
            <a
              href="mailto:celista2k26@gmail.com"
              className="hover:text-primary transition"
            >
              celista2k26@gmail.com
            </a>
          </p>

          <a
            href="https://www.instagram.com/celista.2k26?igsh=MWQwanBtZ2tmdG93MQ=="
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-gray-400 hover:text-primary transition"
          >
            Instagram → @celista2k26
          </a>
        </div>

      </div>

      {/* Bottom note */}
      <div className="mt-16 text-center text-gray-600 text-sm">
        Designed & Organized by the Department of AI & DS
      </div>
    </footer>
  );
}

export default Footer;
