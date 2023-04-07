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

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    // ON MOUNT
    window.addEventListener("scroll", onScroll);
    // DISMOUNT
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Router>
      {/* <Navbar expand="md" className={scrolled ? "scrolled" : ""}> */}
      <nav
        className={`navbar navbar-expand-lg navbar-dark fixed-top ${menuOpen ? "menu-open" : ""} ${
          scrolled ? "scrolled" : ""
        }`}
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

          {/* <Navbar.Toggle aria-controls="basic-navbar-nav">
            <span className="navbar-toggler-icon"></span>
          </Navbar.Toggle> */}
          <button className="navbar-toggler" type="button" onClick={() => setMenuOpen(!menuOpen)}>
            <span className="navbar-toggler-icon"></span>
          </button>
          <Navbar.Collapse id="basic-navbar-nav">
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
                {/* <a href="#">
                  <img src={navIcon2} alt="" />
                </a>
                <a href="#">
                  <img src={navIcon3} alt="" />
                </a> */}
              </div>
              <HashLink to="#connect">
                <button className="vvd">
                  <span>Connect</span>
                </button>
              </HashLink>
            </span>
          </Navbar.Collapse>
        </Container>
      </nav>
      {/* </Navbar> */}
    </Router>
  );
};
export default NavBar;
