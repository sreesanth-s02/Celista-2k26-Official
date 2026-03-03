
import PillNav from "./PillNav";
import logo from "../assets/logo.png"; // change if png

const Navbar = () => {

  return (
    <PillNav
      logo={logo}
      logoAlt="Company Logo"
      items={[
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Events", href: "#events" },
  { label: "Location", href: "#location" },
  { label: "Gallery", href: "/memories" },
  { label: "Sponsors", href: "#sponsors" },
]}
      baseColor="#000000"
      pillColor="#ffffff"
      pillTextColor="#000000"
      hoveredPillTextColor="#ffffff"
      initialLoadAnimation={false}
    />
  );
};

export default Navbar;