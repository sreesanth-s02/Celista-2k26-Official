import React, { useEffect, useRef } from "react";
import "./Sponsors.css";

import sponsor1 from "../assets/sponsors/sponsor1.png";
import sponsor2 from "../assets/sponsors/sponsor2.png";

const Sponsors = () => {
  const cardsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          } else {
            entry.target.classList.remove("show");
          }
        });
      },
      { threshold: 0.3 }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="sponsors-section" id="sponsors">
      <div className="sponsors-container">
        <h2 className="sponsors-title">
          POWERING <span>CELISTA 2K26</span>
        </h2>

        <div className="sponsors-grid">
          
          {/* Sponsor 1 */}
          <div
            className="sponsor-card"
            ref={(el) => (cardsRef.current[0] = el)}
          >
            <div className="card-inner">
              <div className="card-front">
                <img src={sponsor1} alt="Goutham Jewllery" style={{width: "100%", height: "100%", objectFit: "contain", borderRadius: "20px"}} />
              </div>
              <div className="card-back">
                <h4>Goutham Jewllery</h4>
                <p>
                  Goutham Jewellery, Kodambakkam offers quality gold, silver jewellery with elegant designs for every occasion.
                </p>
              </div>
            </div>
          </div>

          {/* Sponsor 3 */}
          <div
            className="sponsor-card"
            ref={(el) => (cardsRef.current[1] = el)}
          >
            <div className="card-inner">
              <div className="card-front">
                <img src={sponsor2} alt="Core" style={{width: "100%", height: "100%", objectFit: "fill", borderRadius: "20px"}} />
              </div>
              <div className="card-back">
                <h4>R&A Plastics</h4>
                <p>
                  R&A Plastics, established in 2016, specializes in manufacturing industrial moulds, plastic injection moulding products, and customized moulding solutions.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Sponsors;