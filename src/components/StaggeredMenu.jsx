import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./StaggeredMenu.css";
import logo from "../assets/logo.webp";

export const StaggeredMenu = ({
  position = "right",
  colors = ["#000000", "#000000"],
  items = [],
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = true,
  className,
  menuButtonColor = "#fff",
  openMenuButtonColor = "#fff",
  accentColor = "#5227FF",
  changeMenuColorOnOpen = true,
  isFixed = false,
  closeOnClickAway = true,
  onMenuOpen,
  onMenuClose,
}) => {
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);

  const panelRef = useRef(null);
  const preLayersRef = useRef(null);
  const preLayerElsRef = useRef([]);

  const plusHRef = useRef(null);
  const plusVRef = useRef(null);
  const iconRef = useRef(null);

  const toggleBtnRef = useRef(null);

  const openTlRef = useRef(null);
  const closeTweenRef = useRef(null);
  const spinTweenRef = useRef(null);
  const colorTweenRef = useRef(null);

  const busyRef = useRef(false);

  // INITIAL SETUP
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const preContainer = preLayersRef.current;
      const plusH = plusHRef.current;
      const plusV = plusVRef.current;
      const icon = iconRef.current;

      if (!panel || !plusH || !plusV || !icon) return;

      let preLayers = [];
      if (preContainer) {
        preLayers = Array.from(
          preContainer.querySelectorAll(".sm-prelayer")
        );
      }

      preLayerElsRef.current = preLayers;

      const offscreen = position === "left" ? -100 : 100;

      gsap.set([panel, ...preLayers], { xPercent: offscreen });
      gsap.set(icon, { rotate: 0 });
      gsap.set(plusH, { rotate: 0 });
      gsap.set(plusV, { rotate: 90 });

      gsap.set(toggleBtnRef.current, { color: menuButtonColor });
    });

    return () => ctx.revert();
  }, [menuButtonColor, position]);

  // OPEN ANIMATION
  const playOpen = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;

    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    const offscreen = position === "left" ? -100 : 100;

    const tl = gsap.timeline({
      onComplete: () => (busyRef.current = false),
    });

    layers.forEach((layer, i) => {
      tl.to(
        layer,
        {
          xPercent: 0,
          duration: 0.5,
          ease: "power4.out",
        },
        i * 0.07
      );
    });

    tl.to(
      panel,
      {
        xPercent: 0,
        duration: 0.6,
        ease: "power4.out",
      },
      0.1
    );

    openTlRef.current = tl;
  }, [position]);

  // CLOSE ANIMATION
  const playClose = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    const offscreen = position === "left" ? -100 : 100;

    closeTweenRef.current = gsap.to([panel, ...layers], {
      xPercent: offscreen,
      duration: 0.3,
      ease: "power3.in",
      onComplete: () => {
        busyRef.current = false;
      },
    });
  }, [position]);

  // ICON ROTATION
  const animateIcon = useCallback((opening) => {
    const icon = iconRef.current;
    if (!icon) return;

    spinTweenRef.current?.kill();

    spinTweenRef.current = gsap.to(icon, {
      rotate: opening ? 225 : 0,
      duration: 0.5,
      ease: "power4.out",
    });
  }, []);

  // COLOR ANIMATION
  const animateColor = useCallback(
    (opening) => {
      if (!changeMenuColorOnOpen) return;

      colorTweenRef.current?.kill();

      colorTweenRef.current = gsap.to(toggleBtnRef.current, {
        color: opening ? openMenuButtonColor : menuButtonColor,
        duration: 0.3,
        ease: "power2.out",
      });
    },
    [openMenuButtonColor, menuButtonColor, changeMenuColorOnOpen]
  );

  // TOGGLE MENU
  const toggleMenu = useCallback(() => {
    const target = !openRef.current;

    openRef.current = target;
    setOpen(target);

    if (target) {
      onMenuOpen?.();
      playOpen();
    } else {
      onMenuClose?.();
      playClose();
    }

    animateIcon(target);
    animateColor(target);
  }, [playOpen, playClose, animateIcon, animateColor, onMenuOpen, onMenuClose]);

  // CLICK OUTSIDE CLOSE
  React.useEffect(() => {
    if (!closeOnClickAway || !open) return;

    const handleClickOutside = (event) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target) &&
        toggleBtnRef.current &&
        !toggleBtnRef.current.contains(event.target)
      ) {
        toggleMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [open, closeOnClickAway, toggleMenu]);

  return (
    <div
      className={
        (className ? className + " " : "") +
        "staggered-menu-wrapper" +
        (isFixed ? " fixed-wrapper" : "")
      }
      data-position={position}
      data-open={open || undefined}
      style={accentColor ? { ["--sm-accent"]: accentColor } : undefined}
    >
      {/* Background layers */}
      <div ref={preLayersRef} className="sm-prelayers">
        {colors.map((c, i) => (
          <div
            key={i}
            className="sm-prelayer"
            style={{ background: c }}
          />
        ))}
      </div>

      {/* HEADER */}
      <header className="staggered-menu-header">
        <div className="sm-logo">
          <img
            src={logo}
            alt="Logo"
            className="sm-logo-img"
            draggable={false}
          />
        </div>

        <button
          ref={toggleBtnRef}
          className="sm-toggle"
          onClick={toggleMenu}
          type="button"
        >
          <span className="sm-toggle-textWrap">
            <span className="sm-toggle-textInner">
              <span className="sm-toggle-line">Menu</span>
            </span>
          </span>

          <span ref={iconRef} className="sm-icon">
            <span ref={plusHRef} className="sm-icon-line" />
            <span ref={plusVRef} className="sm-icon-line" />
          </span>
        </button>
      </header>

      {/* PANEL */}
      <aside ref={panelRef} className="staggered-menu-panel">
        <div className="sm-panel-inner">
          <ul
            className="sm-panel-list"
            data-numbering={displayItemNumbering || undefined}
          >
            {items.map((it, idx) => (
              <li key={idx} className="sm-panel-itemWrap">
                <a href={it.link} className="sm-panel-item">
                  <span className="sm-panel-itemLabel">
                    {it.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default StaggeredMenu;