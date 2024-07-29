import React from "react";
import "../styles/projectsPage.css";
import FolderOpenRoundedIcon from '@mui/icons-material/FolderOpenRounded';
import FadeInSection from "../components/FadeInSection";
import Carousel from "react-bootstrap/Carousel";
import ExternalLinks from "../components/ExternalLinks";



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
      "Autonomous Quadcopter": {
        title: "Built an Autonomous Quadcopter",
        desc: "Able to respond accordingly given GPS input. Uses camera, gyroscope, and accelerometer to determine best route.",
        techStack: "ArduPilot, Drones, CLI",
        link: "",
        open: "",
        image: "/assets/quadcopter.jpg"
      },
      "Algorithmic Trading": {
        title: "Algorithmic Trading Portfolio",
        desc: "A series of programs built from YFinance Data, Quantconnect Lean Engine, and Pandas.",
        techStack: "Python, QuantConnect, Pandas, Numpy, Matplotlib",
        link: "https://github.com/rkaelle/algo-trading-strategies",
        open: "https://www.udemy.com/course/python-for-finance-and-algorithmic-trading-with-quantconnect/",
        image: "/assets/trading.jpg"
      },
      "FPV Drone": {
        title: "FPV Drone(s)",
        desc: "Two FPV racing drones capable of speeds up to 85mph. Built piece by piece.",
        techStack: "Soldering, wiring, Linux CLI",
        link: "",
        open: "",
        image: "/assets/drones.jpg"
      },
      "Rocket Sensor": {
        title: "Rocket Sensor Development",
        desc: "Developed a sophisticated sensor system for a model rocket to investigate atmospheric conditions and flight dynamics.",
        techStack: "PCB, Sensors, Data Analysis",
        link: "",
        open: "",
        image: "/assets/rocket.jpg"
      }
    };

    const projects = {
      "RyansDailyNews": {
        desc: "A Python script that fetches the latest events, reflections, skills, and science facts to send personalized daily emails to subscribers.",
        techStack: "Python, API, Email",
        link: "",
        open: ""
      },
      "Raspberry Pi Flight Tracker": {
        desc: "Using intercepted Software Defined Radio waves, tracks planes up to 200 miles away.",
        techStack: "RTL-SDR, Python",
        link: "",
        open: ""
      },
      "Clustered Raspberry Pi": {
        desc: "Includes NAS file storage, personal homelab, and micro supercomputer.",
        techStack: "Raspian, Clustering, Microcomputers",
        link: "",
        open: ""
      },
      "RK Coin": {
        desc: "A cryptocurrency under my name, derived from Bitcoin and Litecoin.",
        techStack: "C++, Python, Solidity, Blockchain",
        link: "https://github.com/rkaelle/rk-coin",
        open: ""
      },
      "RK Chat": {
        desc: "A Python (Flask) based web app for a chatroom.",
        techStack: "Python, JavaScript, CSS, HTML",
        link: "https://github.com/rkaelle/rk-chatroom",
        open: ""
      },
      "Sentiment Analysis Bot": {
        desc: "Performs sentiment analysis on Reddit posts and comments to gauge public opinion on various stocks.",
        techStack: "Python, NLP, Plotly",
        link: "",
        open: ""
      },
      "This Site! (My Portfolio)": {
        desc: "Built using ReactJS. This site serves as a place to showcase my current updates.",
        techStack: "ReactJS, MaterialUI",
        link: "https://github.com/rkaelle/portfolio",
        open: "https://ryankaelle.dev"
      }
    };

    return (
      <div id="projects">
        <div className="section-header ">
          <span className="section-title">/ creations</span>
        </div>
        <Carousel>
          {Object.keys(spotlightProjects).map((key, i) => (
            <Carousel.Item key={i}>
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
              <FadeInSection delay={`${i + 1}00ms`} key={i}>
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