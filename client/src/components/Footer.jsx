import { Container, Row, Col } from "react-bootstrap";

import logo from "../assets/img/logo.png";
import navIcon1 from "../assets/img/nav-icon1.svg";
import navIcon2 from "../assets/img/nav-icon2.svg";
import navIcon3 from "../assets/img/nav-icon3.svg";
// import MailChimpForm from "./MailChimpForm";

const Footer = () => {
  const currentdate = new Date();
  const currentYear = currentdate.getFullYear();
  const currentMonth = currentdate.getMonth() + 1;
  // Adding 1 because getMonth() returns a zero-based value

  return (
    <footer className="footer">
      <Container>
        <Row className="align-items-center">
          {/* <MailChimpForm /> */}
          <Col size={12} sm={6}>
            <img src={logo} alt="Logo" />
          </Col>
          <Col size={12} sm={6} className="text-center text-sm-end">
            <div className="social-icon">
              <a href="https://www.linkedin.com/in/dannicolaiecostea">
                <img src={navIcon1} alt="linkedIn icon" />
              </a>
              {/* <a href="#">
                <img src={navIcon2} alt="Icon" />
              </a>
              <a href="#">
                <img src={navIcon3} alt="Icon" />
              </a> */}
            </div>
            <p>
              <span id="copyright">
                Copyright {currentMonth}/{currentYear} | Made with ❤️‍🔥
              </span>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
export default Footer;
