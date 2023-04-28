import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-scroll";
import logo from "../assets/img/logo.png";
import navIcon1 from "../assets/img/nav-icon1.svg";
// import navIcon2 from "../assets/img/nav-icon2.svg";
// import navIcon3 from "../assets/img/nav-icon3.svg";
import { HashLink } from "react-router-hash-link";
import { BrowserRouter as Router } from "react-router-dom";

const NavBar = () => {
  const [activeLink, setActiveLink] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const onUpdateActiveLink = (value) => setActiveLink(value);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleDocumentClick = (event) => {
    if (menuOpen) {
      const targetElement = event.target;
      const collapseElement = document.getElementById("basic-navbar-nav");
      const togglerElement = document.querySelector(".navbar-toggler");

      if (!collapseElement.contains(targetElement) && !togglerElement.contains(targetElement)) {
        setMenuOpen(false);
      }
    }
  };

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    // Add the event listener
    document.addEventListener("click", handleDocumentClick);
    // ON MOUNT
    window.addEventListener("scroll", onScroll);
    // DISMOUNT
    return () => {
      window.removeEventListener("scroll", onScroll);
      // Remove the event listener
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [menuOpen]);

  // useEffect(() => {
  //   const onScroll = () => {
  //     if (window.scrollY > 50) {
  //       setScrolled(true);
  //     } else {
  //       setScrolled(false);
  //     }
  //   };
  //   // ON MOUNT
  //   window.addEventListener("scroll", onScroll);
  //   // DISMOUNT
  //   return () => window.removeEventListener("scroll", onScroll);
  // }, []);

  return (
    <Router>
      <Navbar
        expand="md"
        className={`navbar navbar-expand-lg navbar-dark fixed-top ${menuOpen ? "menu-open" : ""} ${
          scrolled ? "scrolled" : ""
        }`}
        expanded={menuOpen} // Add this line
      >
        <Container>
          {/* <Navbar.Brand>
            <img src={logo} alt="Logo" /> */}
          <Navbar.Brand
            href="#"
            onClick={(event) => {
              event.preventDefault();
              window.scrollTo(0, 0);
            }}
          >
            <img src={logo} alt="Logo" />
          </Navbar.Brand>

          {/* <Navbar.Toggle aria-controls="basic-navbar-nav"> */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleMenuToggle}>
            <span className="navbar-toggler-icon"></span>
          </Navbar.Toggle>

          <Navbar.Collapse id="basic-navbar-nav" className={menuOpen ? "navbar-collapse-open" : ""}>
            {/* <Navbar.Collapse id="basic-navbar-nav"> */}
            <Nav className="ms-auto">
              <Nav.Link
                href="#home"
                className={activeLink === "home" ? "active navbar-link" : "navbar-link"}
                onClick={() => onUpdateActiveLink("home")}
              >
                Home
              </Nav.Link>
              <Nav.Link
                href="#skills"
                className={activeLink === "skills" ? "active navbar-link" : "navbar-link"}
                onClick={() => onUpdateActiveLink("skills")}
              >
                Skills
              </Nav.Link>
              <Nav.Link
                href="#projects"
                className={activeLink === "projects" ? "active navbar-link" : "navbar-link"}
                onClick={() => onUpdateActiveLink("projects")}
              >
                Projects
              </Nav.Link>
            </Nav>
            <span className="navbar-text">
              <div className="social-icon">
                <a href="https://www.linkedin.com/in/dannicolaiecostea" target="_blank" rel="noreferrer">
                  <img src={navIcon1} alt="linkedIn icon" />
                </a>
              </div>
              <HashLink to="#connect">
                <button className="vvd">
                  <span>Connect</span>
                </button>
              </HashLink>
            </span>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Router>
  );
};
export default NavBar;
