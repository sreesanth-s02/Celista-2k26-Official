import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import logoImg from "../assets/logo.webp";

gsap.registerPlugin(ScrollTrigger);

export default function ThreeCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      100
    );
    camera.position.z = window.innerWidth < 768 ? 4 : 3;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setClearColor(0x000000, 0); // IMPORTANT (transparent background)

    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    );
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    mountRef.current.appendChild(renderer.domElement);

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));

    const light = new THREE.PointLight(0xffffff, 1.5);
    light.position.set(2, 2, 3);
    scene.add(light);

    const loader = new THREE.TextureLoader();
    let frameId;

    loader.load(logoImg, (texture) => {
      const material = new THREE.MeshStandardMaterial({
        map: texture,
        transparent: true,
        opacity: 0.5, // 🔥 slightly transparent behind text
        side: THREE.DoubleSide,
      });

     const isMobile = window.innerWidth < 768;

    const size = isMobile ? 1.6 : 2.5;

    const geometry = new THREE.PlaneGeometry(1.5, 1.5);
      const logo = new THREE.Mesh(geometry, material);

      scene.add(logo);

      // Render loop
      const animate = () => {
        renderer.render(scene, camera);
        frameId = requestAnimationFrame(animate);
      };

      animate();

      // 🔥 SCROLL BASED ROTATION ONLY
      gsap.to(logo.rotation, {
        y: Math.PI * 4, // 2 full spins
        ease: "none",
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    });

    const handleResize = () => {
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(frameId);

      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }

      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 1, // 🔥 behind text
        pointerEvents: "none",
      }}
    />
  );
}