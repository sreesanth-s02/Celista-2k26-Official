import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./PillNav.css";

const PillNav = ({
  logo,
  logoAlt = "Logo",
  items,
  className = "",
  ease = "power3.easeOut",
  baseColor = "#fff",
  pillColor = "#060010",
  hoveredPillTextColor = "#060010",
  pillTextColor,
  initialLoadAnimation = true,
}) => {
  const resolvedPillTextColor = pillTextColor ?? baseColor;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const circleRefs = useRef([]);
  const tlRefs = useRef([]);
  const activeTweenRefs = useRef([]);
  const logoImgRef = useRef(null);
  const logoRef = useRef(null);
  const hamburgerRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const navItemsRef = useRef(null);

  /* ================================
     SCROLL LINK DETECTION
  ================================= */

  const isExternalLink = (href) =>
    href?.startsWith("http://") ||
    href?.startsWith("https://") ||
    href?.startsWith("//") ||
    href?.startsWith("mailto:") ||
    href?.startsWith("tel:");

  const isScrollLink = (href) => href?.startsWith("#");

  /* ================================
     SCROLL FUNCTION
  ================================= */

  const handleScrollTo = (href) => {
    if (href === "#home") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      setIsMobileMenuOpen(false);
      return;
    }

    const target = document.querySelector(href);
    if (!target) return;

    const navbarHeight = 80;

    const offset =
      target.getBoundingClientRect().top +
      window.scrollY -
      navbarHeight;

    window.scrollTo({
      top: offset,
      behavior: "smooth",
    });

    setIsMobileMenuOpen(false);
  };

  /* ================================
     GSAP LAYOUT
  ================================= */

  useEffect(() => {
    const layout = () => {
      circleRefs.current.forEach((circle, i) => {
        if (!circle?.parentElement) return;

        const pill = circle.parentElement;
        const rect = pill.getBoundingClientRect();
        const { width: w, height: h } = rect;

        const R = ((w * w) / 4 + h * h) / (2 * h);
        const D = Math.ceil(2 * R) + 2;
        const delta =
          Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
        const originY = D - delta;

        circle.style.width = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.bottom = `-${delta}px`;

        gsap.set(circle, {
          xPercent: -50,
          scale: 0,
          transformOrigin: `50% ${originY}px`,
        });

        const label = pill.querySelector(".pill-label");
        const white = pill.querySelector(".pill-label-hover");

        if (label) gsap.set(label, { y: 0 });
        if (white) gsap.set(white, { y: h + 12, opacity: 0 });

        tlRefs.current[i]?.kill();

        const tl = gsap.timeline({ paused: true });

        tl.to(circle, { scale: 1.2, xPercent: -50, duration: 2, ease }, 0);

        if (label) {
          tl.to(label, { y: -(h + 8), duration: 2, ease }, 0);
        }

        if (white) {
          tl.to(white, { y: 0, opacity: 1, duration: 2, ease }, 0);
        }

        tlRefs.current[i] = tl;
      });
    };

    layout();
    window.addEventListener("resize", layout);

    return () => window.removeEventListener("resize", layout);
  }, [items, ease]);

  /* ================================
     HOVER
  ================================= */

  const handleEnter = (i) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), {
      duration: 0.3,
      ease,
    });
  };

  const handleLeave = (i) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(0, {
      duration: 0.2,
      ease,
    });
  };

  /* ================================
     MOBILE MENU TOGGLE
  ================================= */

  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);

    const menu = mobileMenuRef.current;

    if (menu) {
      if (newState) {
        gsap.set(menu, { visibility: "visible" });
        gsap.fromTo(
          menu,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.3 }
        );
      } else {
        gsap.to(menu, {
          opacity: 0,
          y: 10,
          duration: 0.2,
          onComplete: () => {
            gsap.set(menu, { visibility: "hidden" });
          },
        });
      }
    }
  };

  /* ================================
     CSS VARIABLES
  ================================= */

  const cssVars = {
    "--base": baseColor,
    "--pill-bg": pillColor,
    "--hover-text": hoveredPillTextColor,
    "--pill-text": resolvedPillTextColor,
  };

  return (
    <div className="pill-nav-container">
      <nav className={`pill-nav ${className}`} style={cssVars}>
        {/* LOGO */}
        <a
          href="#home"
          className="pill-logo"
          onClick={(e) => {
            e.preventDefault();
            handleScrollTo("#home");
          }}
          ref={logoRef}
        >
          <img src={logo} alt={logoAlt} ref={logoImgRef} />
        </a>

        {/* DESKTOP NAV */}
        <div
  className={`pill-nav-items desktop-only ${isMobileMenuOpen ? "show-mobile-nav" : ""}`}
  ref={navItemsRef}
>
          <ul className="pill-list">
            {items.map((item, i) => (
              <li key={i}>
                <a
                  href={item.href || "#"}
                  className="pill"
                  onClick={(e) => {
                    if (item.onClick) {
                      e.preventDefault();
                      item.onClick();
                      return;
                    }

                    if (isScrollLink(item.href)) {
                      e.preventDefault();
                      handleScrollTo(item.href);
                    }
                  }}
                  onMouseEnter={() => handleEnter(i)}
                  onMouseLeave={() => handleLeave(i)}
                >
                  <span
                    className="hover-circle"
                    ref={(el) => (circleRefs.current[i] = el)}
                  />
                  <span className="label-stack">
                    <span className="pill-label">{item.label}</span>
                    <span className="pill-label-hover">
                      {item.label}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* MOBILE BUTTON */}
        <button
          className={`mobile-menu-button mobile-only ${isMobileMenuOpen ? "hidden" : ""}`}
          onClick={toggleMobileMenu}
          ref={hamburgerRef}
        >
          <div className="hamburger-icon">
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </div>
          <span className="menu-text">MENU</span>
        </button>
      </nav>

      
    </div>
  );
};

export default PillNav;