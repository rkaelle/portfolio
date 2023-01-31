import React from "react";
import "../styles/Projects.css";
import FolderOpenRoundedIcon from "@material-ui/icons/FolderOpenRounded";
import FadeInSection from "./FadeInSection";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Carousel from "react-bootstrap/Carousel";
import ExternalLinks from "./ExternalLinks";

class Projects extends React.Component {
  constructor() {
    super();
    this.state = {
      expanded: true,
      activeKey: "1"
    };
    this.handleSelect = this.handleSelect.bind(this);
  }
  handleSelect(eventKey) {
    this.setState({
      activeKey: eventKey
    });
  }
  render() {
    const spotlightProjects = {
      "AI chessboard": {
        title: "AI magnetic chessboard",
        desc:
          "The automated chess board is composed of an XY table with an electromagnet on the moving trolley. ",
        techStack: "C#, Arduino, 3D Printing, Micro Max chess",
        link: "https://github.com/slakh96/no-mans-land",
        open: "",
        image: "/assets/chessboard.png"
      },
      "2bit cpu": {
        title: "2-Bit CPU",
        desc:
          "2 bit ALU circuit that uses inverters, AND, OR gate, Ex-or gate and a multiplexer. It takes two input bits.",
        techStack: "Chips, Wiring",
        link: "",
        open: "https://www.cs.uregina.ca/Links/class-info/301/cpu1bit/lectureLS.html",
        image: "/assets/cpu.jpg"
      },
      "Ham radio station": {
        title: "Amateur Radio Station",
        desc:
          "G90 High Frequency Radio setup + Yaesu FT70 handheld. Able to reach 2500mi+ using dipole antenna.",
        techStack: "RF, soldering, wiring",
        link: "",
        open: "",
        image: "/assets/radio.jpg"
      },
      "FPV drone": {
        title: "FPV drone(s)",
        desc:
          "Two fpv racing drones capable of speeds up to 85mph. Built piece by piece.",
        techStack: "Soldering, wiring, Linux CLI",
        link: "",
        open: "",
        image: "/assets/drones.jpg"
      },"Clustered Raspberry ": {
        title: "Clustered Raspberry Pi",
        desc:
          "include NAS file storage, personal homelab, and micro supercomputer",
        techStack: "Raspian, Clustering, Microcomputers",
        link: "",
        open: "",
        image: "/assets/cluster.jpeg"
      }/*,"FPV drone": {
        title: "Software Defined Radio for phones",
        desc:
          "A small JS library that helps with clear and succinct data presentation.",
        techStack: "NODE.JS (EXPRESS.JS)",
        link: "",
        open: "",
        image: "/assets/portfolio.png"
      }*/
    };
    const projects = {
      "RK coin": {
        desc:
          "A derivation of the parent coins Bitcoin and Litecoin but with a twist.",
        techStack: "C++, Python, Solidity, Blockchain",
        link: "https://github.com/rkaelle/rk-coin",
        open: ""
      },
      "RK chat": {
        desc:
          "A Python (Flask) based web app intended to be hosted on a laptop.",
        techStack: "Python, JavaScript, CSS, HTML, ",
        link: "https://github.com/rkaelle/rk-chatroom",
        open: ""
      },
      "Algorithmic Trading": {
        desc:
          "A series of programs built from YFinance Data, Quantconnect Lean Engine, and Pandas",
        techStack: "Python, QuantConnect, Pandas, Numpy, Matplotlib ",
        link:
          "https://github.com/rkaelle/algo-trading-strategies",
          open: "https://www.udemy.com/course/python-for-finance-and-algorithmic-trading-with-quantconnect/"
      },
      "This site! (My Portfolio)": {
        desc:
          "Built using ReactJS. This site serves as a place to show off my current updates",
        techStack: "ReactJS, MaterualUI",
        link: "https://github.com/rkaelle/portfolio",
        open: "https://ryankaelle.dev"
      },
      "Raspberry Pi flight tracker (ADS-B station)": {
        desc:
          "Using intercepted Software Defined Raadio waves, I am able to track planes up to 200 miles away.",
        techStack: " RTL-SDR",
        link: "",
        open: ""
      },"Built an autonomous quadcopter with ArduPilot control software": {
        desc:
          "Able to respond accordingly given GPS input. Uses camera, gyroscope, and accelerometer to determine best route.",
        techStack: "ArduPilot, Drones, CLI",
        link: "",
        open: ""
      }

    };

    return (
      <div id="projects">
        <div className="section-header ">
          <span className="section-title">/ creations</span>
        </div>
        <Carousel>
          {Object.keys(spotlightProjects).map((key, i) => (
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={spotlightProjects[key]["image"]}
                alt={key}
              />
              <div className="caption-bg">
                <Carousel.Caption>
                  <h3>{spotlightProjects[key]["title"]}</h3>
                  <p>
                    {spotlightProjects[key]["desc"]}
                    <p className="techStack">
                      {spotlightProjects[key]["techStack"]}
                    </p>
                  </p>
                  <ExternalLinks
                    githubLink={spotlightProjects[key]["link"]}
                    openLink={spotlightProjects[key]["open"]}
                  ></ExternalLinks>
                </Carousel.Caption>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
        <div className="project-container">
          <ul className="projects-grid">
            {Object.keys(projects).map((key, i) => (
              <FadeInSection delay={`${i + 1}00ms`}>
                <li className="projects-card">
                  <div className="card-header">
                    <div className="folder-icon">
                      <FolderOpenRoundedIcon
                        style={{ fontSize: 35 }}
                      ></FolderOpenRoundedIcon>
                    </div>
                    <ExternalLinks
                      githubLink={projects[key]["link"]}
                      openLink={projects[key]["open"]}
                    ></ExternalLinks>
                  </div>

                  <div className="card-title">{key}</div>
                  <div className="card-desc">{projects[key]["desc"]}</div>
                  <div className="card-tech">{projects[key]["techStack"]}</div>
                </li>
              </FadeInSection>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Projects;
