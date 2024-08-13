import React from "react";
import "../styles/projectsPage.css";
import FolderOpenRoundedIcon from '@mui/icons-material/FolderOpenRounded';
import FadeInSection from "../components/FadeInSection";
import Carousel from "react-bootstrap/Carousel";
import ExternalLinks from "../components/ExternalLinks";
import { Link } from "react-router-dom";

class ProjectsPage extends React.Component {
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
        image: "/assets/drones.jpg"
      },
      "Rocket Sensor": {
        title: "Rocket Sensor Development",
        desc: "Developed a sophisticated sensor system for a model rocket to investigate atmospheric conditions and flight dynamics.",
        techStack: "PCB, Sensors, Data Analysis",
        link: "",
        open: "",
        image: "/assets/rocket.jpeg"
      },
      "Algorithmic Trading": {
        title: "Algorithmic Trading Portfolio",
        desc: "A series of programs built from YFinance Data, Quantconnect Lean Engine, and Pandas.",
        techStack: "Python, QuantConnect, Pandas, Numpy, Matplotlib",
        link: "https://github.com/rkaelle/algo-trading-strategies",
        open: "https://www.udemy.com/course/python-for-finance-and-algorithmic-trading-with-quantconnect/",
        image: "/assets/trading.jpg"
      },
      "AI Chessboard": {
        title: "AI Magnetic Chessboard",
        desc: "The automated chess board is composed of an XY table with an electromagnet on the moving trolley.",
        techStack: "C#, Arduino, 3D Printing, Micro Max chess",
        link: "https://github.com/slakh96/no-mans-land",
        open: "",
        image: "/assets/chessboard.png"
      },
      "Sentiment Analysis Bot": {
        title: "Sentiment Analysis Bot",
        desc: "Performs sentiment analysis on Reddit posts and comments to gauge public opinion on various stocks.",
        techStack: "Python, NLP, Plotly",
        link: "https://github.com/rkaelle/sentiment-analysis-bot",
        open: "",
        image: "/assets/gauges.png"
      },
      "FPV Drone": {
        title: "FPV Drone(s)",
        desc: "Two FPV racing drones capable of speeds up to 85mph. Built piece by piece.",
        techStack: "Soldering, wiring, Linux CLI",
        link: "",
        open: "",
        image: "/assets/drones.jpg"
      },
      "Ham Radio Station": {
        title: "Amateur Radio Station",
        desc: "G90 High Frequency Radio setup + Yaesu FT70 handheld. Able to reach 2500mi+ using dipole antenna.",
        techStack: "RF, soldering, wiring",
        link: "",
        open: "",
        image: "/assets/radio.jpg"
      }
    };

    const projects = {
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
      "RyansDailyNews": {
        desc: "A Python script that fetches the latest events, reflections, skills, and science facts to send personalized daily emails to subscribers.",
        techStack: "Python, API, SMTP, Firebase",
        link: "https:/github.com/rkaelle/ryansdailynews",
        open: "https:/rkaelle.com/manage"
      },
      "Algorithmic Trading": {
        desc: "A series of programs built from YFinance Data, Quantconnect Lean Engine, and Pandas.",
        techStack: "Python, QuantConnect, Pandas, Numpy, Matplotlib",
        link: "https://github.com/rkaelle/algo-trading-strategies",
        open: "https://www.udemy.com/course/python-for-finance-and-algorithmic-trading-with-quantconnect/"
      },
      "Raspberry Pi Flight Tracker": {
        desc: "Using intercepted Software Defined Radio waves, tracks planes up to 200 miles away.",
        techStack: "RTL-SDR, Python",
        link: "",
        open: ""
      },
      "Skills Tracker": {
        desc: "React web application with Firebase firestore data hosting that allows users to log their skills and accomplishments.",
        techStack: "React, Firebase, Firestore",
        link: "https://github.com/rkaelle/skills-tracker",
        open: "https://stats-tracker-tau.vercel.app/"
      },
      "This site! (My Portfolio)": {
        desc: "Built using ReactJS. This site serves as a place to show off my current updates.",
        techStack: "ReactJS, MaterualUI, ThreeJs, Firebase",
        link: "https://github.com/rkaelle/portfolio",
        open: "https://rkaelle.com"
      },
      "RK chat": {
        desc: "A Python (Flask) based web app intended to be hosted on a laptop.",
        techStack: "Python, JavaScript, CSS, HTML, ",
        link: "https://github.com/rkaelle/rk-chatroom",
        open: ""
      },
      "Chatroom": {
        desc: "Flask-based real-time secure messaging app.",
        techStack: "Flask, Socket-IO, Ngrok",
        link: "https://github.com/rkaelle/rk-chatroom",
        open: ""
      },
      "Ham radio station": {
        desc: "G90 High Frequency Radio setup + Yaesu FT70 handheld. Able to reach 2500mi+ using dipole antenna.",
        techStack: "RF, soldering, wiring",
        link: "",
        open: ""
      },
      "Built an autonomous quadcopter with ArduPilot control software": {
        desc: "Able to respond accordingly given GPS input. Uses camera, gyroscope, and accelerometer to determine best route.",
        techStack: "ArduPilot, Drones, CLI",
        link: "",
        open: ""
      }
    };

    return (
      <div id="projects-page">
        <div className="top-left-button">
                <Link to="/" className="home-button">&lt;&lt; return home</Link>
            </div>
        <Carousel className="carousel-page">
          {Object.keys(spotlightProjects).map((key, i) => (
            <Carousel.Item key={i}>
              <img
                className="d-block w-100 carousel-img-page"
                src={spotlightProjects[key]["image"]}
                alt={key}
              />
              <div className="caption-bg-page">
                <Carousel.Caption className="carousel-caption-page">
                  <h3>{spotlightProjects[key]["title"]}</h3>
                  <p>
                    {spotlightProjects[key]["desc"]}
                    <p className="techStack-page">
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
        <div className="project-container-page">
          <ul className="projects-grid-page">
            {Object.keys(projects).map((key, i) => (
              <FadeInSection delay={`${i + 1}00ms`} key={i}>
                <li className="projects-card-page">
                  <div className="card-header-page">
                    <div className="folder-icon-page">
                      <FolderOpenRoundedIcon
                        style={{ fontSize: 35 }}
                      ></FolderOpenRoundedIcon>
                    </div>
                    <ExternalLinks
                      githubLink={projects[key]["link"]}
                      openLink={projects[key]["open"]}
                    ></ExternalLinks>
                  </div>

                  <div className="card-title-page">{key}</div>
                  <div className="card-desc-page">{projects[key]["desc"]}</div>
                  <div className="card-tech-page">{projects[key]["techStack"]}</div>
                </li>
              </FadeInSection>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default ProjectsPage;