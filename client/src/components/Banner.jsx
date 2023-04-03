import { Container, Row, Col } from "react-bootstrap";
import { ArrowRightCircle } from "react-bootstrap-icons";
import headerImg from "../assets/img/header-img.svg";
import { useEffect, useState } from "react";

const Banner = () => {
  const toRotate = [
    "I work as a Full-Stack Developer",
    "I'm a Blockchain Enthuziast",
    "I'm a dedicated Prompt Engineering Pupil",
  ];

  const period = 700;

  const [loopNr, setLoopNr] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState("");
  const [delta, setDelta] = useState(150 - Math.random() * 100);

  const tick = () => {
    let i = loopNr % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta((prevDelta) => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setDelta(period);
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false);
      setLoopNr(loopNr + 1);
      // setDelta(500);
      setDelta(150 - Math.random() * 100);
    }
  };

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => {
      clearInterval(ticker);
    };
  }, [text]);

  return (
    <section className="banner" id="home">
      <Container>
        <Row className="align-items-center">
          <Col xs={12} md={6} xl={7}>
            <span className="tagline">Welcome!</span>
            <h1>
              {"Hi, "}
              <span className="wrap">{text}</span>
            </h1>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestiae commodi distinctio quisquam a
              exercitationem quo voluptatum alias porro temporibus eveniet doloribus magnam aliquam aliquid, est
              cupiditate nulla optio natus eligendi.
            </p>
            <button onClick={() => console.log("connect - banner")}>
              Connect <ArrowRightCircle size={25} />{" "}
            </button>
          </Col>
          <Col xs={12} md={6} xl={7}>
            <img src={headerImg} alt="descriptive" />
          </Col>
        </Row>
      </Container>
    </section>
  );
};
export default Banner;
