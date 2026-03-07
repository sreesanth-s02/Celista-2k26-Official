import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import ScrollReveal from "../components/ScrollReveal";
import collegeLogo from "../assets/college.webp";
import deptLogo from "../assets/department.webp";
import celistaLogo from "../assets/logo.webp";


gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const images = gsap.utils.toArray(".about-image");

      images.forEach((img, index) => {
        gsap.fromTo(
          img,
          {
            opacity: 0,
            x: index % 2 === 0 ? -100 : 100, // alternate direction
          },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: img,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    
    <section id="about" ref={sectionRef} className="about-section">
      <div className="about-heading">
        <h1>ABOUT US</h1>
      </div>

      {/* COLLEGE */}
      <div className="about-row">
        <div className="about-image">
          <img src={collegeLogo} alt="College Logo" />
        </div>

        <div className="about-text">
          <ScrollReveal>
            Meenakshi Sundararajan Engineering College, founded in 2001 under
            IIET Society, is part of the esteemed KRS Group. Upholding a legacy
            of excellence, MSEC focuses on quality education, discipline and
            holistic development.
          </ScrollReveal>
        </div>
      </div>

      {/* DEPARTMENT */}
      <div className="about-row reverse">
        <div className="about-image">
          <img src={deptLogo} alt="Department Logo" />
        </div>
        
        <div className="about-text">
          <ScrollReveal>
            The Department of Artificial Intelligence and Data Science, established in 2021 under Mrs. Mathangi Narayanan, is a center for innovation and excellence. With advanced labs, cutting-edge tools, and strong industry collaborations, it equips students with essential skills to drive AI and data science advancements under expert faculty guidance.
          </ScrollReveal>
        </div>
      </div>

      {/* CELISTA */}
      <div className="about-row">
        <div className="about-image">
          <img src={celistaLogo} alt="Celista Logo" />
        </div>

        <div className="about-text">
          <ScrollReveal>
           The name Celista represents the celestial domain that extends beyond our reach just as the sphere of AI.
           Our symposium strives to bring together young minds from various domains to foster collaboration and empowerment. We aim to inspire intellectual growth and community engagement.
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}