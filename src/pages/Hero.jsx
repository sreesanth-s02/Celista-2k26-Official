import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ThreeCanvas from "../components/ThreeCanvas";


gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.normalizeScroll(true);

export default function Hero({ setRadius }) {
  const heroRef = useRef(null);
  const leftDoorRef = useRef(null);
  const rightDoorRef = useRef(null);

  useLayoutEffect(() => {
    const hero = heroRef.current;
    const leftDoor = leftDoorRef.current;
    const rightDoor = rightDoorRef.current;

    const ctx = gsap.context(() => {
      // Initial OPEN state
      gsap.set(leftDoor, { xPercent: -100 });
      gsap.set(rightDoor, { xPercent: 100 });

      gsap.timeline({
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "+=60%",
          scrub: true,
          pin: true,
          anticipatePin: 1,
         onLeave: () => {
gsap.to({ r: 0 }, {
  r: 150,
  duration: 0.6,
  ease: "power2.out",
  onUpdate: function () {
    setRadius(this.targets()[0].r);
  },
  onComplete: () => setRadius(0)
});
    },
    onEnterBack : () => {
      document.querySelector(".about-bg")?.classList.remove("active");
    }
  }
        
      })
      .to(leftDoor, { xPercent: 0, ease: "none" }, 0)
      .to(rightDoor, { xPercent: 0, ease: "none" }, 0)

      // 🔥 Border turns black when shutters meet
      .to(leftDoor, {
        borderRightColor: "#000",
        ease: "none"
      }, 0.9)

      .to(rightDoor, {
        borderLeftColor: "#000",
        ease: "none"
      }, 0.9);

    }, hero);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section id="hero" ref={heroRef} className="hero">
  <ThreeCanvas />

  <div className="hero-content">
    <h1 className="hero-text video-mask">CELISTA'26</h1>
    <p className="hero-sub">From Department of AI & DS</p>
  </div>

  <div ref={leftDoorRef} className="shutter left" />
  <div ref={rightDoorRef} className="shutter right" />
</section>
    </>
  );
}