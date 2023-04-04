import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/NavBar";
import Banner from "./components/Banner";
import Skills from "./components/Skills";
import Projects from "./components/Projects";

function App() {
  return (
    <div className="App">
      {/* <div id="page-content"> */}
      <NavBar />
      <Banner />
      <Skills />
      <Projects />
      {/* </div> */}
    </div>
  );
}

export default App;
