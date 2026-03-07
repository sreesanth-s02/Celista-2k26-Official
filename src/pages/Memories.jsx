import DomeGallery from "../components/DomeGallery";
import { useNavigate } from "react-router-dom";

import M2 from "../assets/M2.webp";
import M3 from "../assets/M3.webp";
import M4 from "../assets/M4.webp";
import M5 from "../assets/M5.webp";
import M6 from "../assets/M6.webp";
import M7 from "../assets/M7.webp";
import M8 from "../assets/M8.webp";
import M9 from "../assets/M9.webp";
import Mi from "../assets/Mi.webp";

export default function Memories() {
  const navigate = useNavigate();

  const images = [
    { src: M2, alt: "Celista Memory 1" },
    { src: M3, alt: "Celista Memory 2" },
    { src: M4, alt: "Celista Memory 3" },
    { src: M5, alt: "Celista Memory 4" },
    { src: M6, alt: "Celista Memory 5" },
    { src: M7, alt: "Celista Memory 6" },
    { src: M8, alt: "Celista Memory 7" },
    { src: M9, alt: "Celista Memory 8" },
    { src: Mi, alt: "Celista Memory 9" }
  ];

  return (
    <div className="w-full min-h-screen bg-transparent overflow-hidden relative">

     {/* TITLE ROW */}
<div className="relative w-full flex items-center justify-center pt-20 pb-6">

  {/* Back Button - Left */}
  <button
    onClick={() => navigate("/")}
    className="absolute left-6 sm:left-10
               w-10 h-10 flex items-center justify-center
               rounded-full
               border border-red-500/60
               bg-black/40 backdrop-blur-md
               transition-all duration-300
               hover:bg-red-600
               hover:border-red-600
               hover:shadow-[0_0_15px_rgba(255,0,0,0.7)]"
  >
    <span className="text-red-500 text-lg transition-all duration-300 hover:text-black">
      ←
    </span>
  </button>

  {/* Gallery Title */}
  <h1
    className="text-4xl sm:text-5xl md:text-6xl
               text-red-600 font-medium
               tracking-[0.15em]"
    style={{
      fontFamily: "'Orbitron', sans-serif",
      textShadow: "0 0 10px rgba(255,0,0,0.7)"
    }}
  >
    GALLERY
  </h1>

</div>

      {/* DOME GALLERY */}
<div className="relative w-screen h-[80vh] overflow-hidden">
  <div className="absolute left-1/2 -translate-x-1/2 w-[120vw] h-full">
    <DomeGallery
  images={images}
  fit={9}              // <-- Increase this
  minRadius={0}
  maxRadius={10000}      // <-- Remove radius restriction
  maxVerticalRotationDeg={5}
  segments={34}
  dragDampening={0.7}
  grayscale={false}
  overlayBlurColor="#000000"
  imageBorderRadius="20px"
  openedImageBorderRadius="25px"
  openedImageWidth="95vw"
  openedImageHeight="95vh"
/>
  </div>
</div>

    </div>
  );
}