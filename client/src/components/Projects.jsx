import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import ProjectCard from "./ProjectCard";
import projImg1 from "../assets/img/project-img1.png";
import projImg2 from "../assets/img/project-img2.png";
import projImg3 from "../assets/img/project-img3.png";
import colorSharp2 from "../assets/img/color-sharp2.png";
import "animate.css";
import TrackVisibility from "react-on-screen";

const Projects = () => {
  const projects = [
    {
      title: "Real-Estate API",
      description: "Search & Filter & List & Buy Properties",
      imgUrl: projImg2,
    },
    {
      title: "Crypto API",
      description: "Currencies & Markets & Exchanges ",
      imgUrl: projImg3,
    },
    {
      title: "Travel & Geolocation API",
      description: "Google Maps API, Google Location API",
      imgUrl: projImg1,
    },
  ];

  return (
    <section className="project" id="projects">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <h2>Projects</h2>
                  <blockquote className="blockquote">
                    <p>It takes half your life before you discover life is a do-it-yourself project.</p>
                    <footer className="blockquote-footer">Napoleon Hill</footer>
                  </blockquote>
                  <Tab.Container id="projects-tabs" defaultActiveKey="first">
                    <Nav
                      variant="pills"
                      className="nav-pills mb-5 justify-content-center align-items-center"
                      id="pills-tab"
                    >
                      <Nav.Item>
                        <Nav.Link eventKey="first">A P Is</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="second">3D Apps</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="third">Blockchain & AI</Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="first">
                        <Row>
                          {projects.map((project, index) => {
                            return <ProjectCard key={index} {...project} />;
                          })}
                        </Row>
                      </Tab.Pane>
                      <Tab.Pane eventKey="section">
                        <blockquote className="blockquote">
                          <p>n.</p>
                          <footer className="blockquote-footer">Author Name</footer>
                        </blockquote>
                      </Tab.Pane>
                      <Tab.Pane eventKey="second">
                        <p>Coming soon...</p>
                      </Tab.Pane>
                      <Tab.Pane eventKey="third">
                        <p>Coming soon...</p>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      <img className="background-image-right" src={colorSharp2} alt="prop"></img>
    </section>
  );
};
export default Projects;
