import React from "react";
import "../styles/Projects.css";
import FolderOpenRoundedIcon from '@mui/icons-material/FolderOpenRounded';
import FadeInSection from "./FadeInSection";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Carousel from "react-bootstrap/Carousel";
import ExternalLinks from "./ExternalLinks";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


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
          "Smart Eink Photo Display": {
        title: "Smart e-Paper Photo Display",
        desc:
          "A Python-based smart photo frame for managing and displaying images and real-time clocks on an e-Paper display.",
        techStack: "Python, Firebase Firestore, Firebase Storage, 3D Printing, CAD",
        link: "https://github.com/rkaelle/einkphotoalbumn",
        open: "https://www.thingiverse.com/thing:6891829",
        image: "/assets/eink.JPG"
      },
      "Sentiment Analysis Bot": {
        title: "Sentiment Analysis Bot",
        desc:
          "Sentiment analysis on Reddit posts and comments to gauge public opinion on various stocks.",
        techStack: "Chips, Wiring",
        link: "",
        open: "https://github.com/rkaelle/sentiment-analysis-bot",
        image: "/assets/gauges.png"
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
      },
      "Chatroom": {
        title: "Secure Chatroom",
        desc:
          "Flask-based real-time secure messaging app.",
        techStack: "Flask, Socket-IO, Ngrok",
        link: "",
        open: "https://github.com/rkaelle/rk-chatroom",
        image: "/assets/chatroom–screenshot.png"
      },
      "Rocket Sensor": {
        title: "Rocket Sensor Development",
        desc: "Developed a sophisticated sensor system for a model rocket to investigate atmospheric conditions and flight dynamics.",
        techStack: "PCB, Sensors, Data Analysis",
        link: "",
        open: "",
        image: "/assets/rocket.jpeg"
      }
    };

    const projects = {
      "WiBit": {
        desc: "A decentralized Wi-Fi network that rewards users for reducing bandwidth during congestion periods using WiBit tokens. Users can monitor network usage and manage their Solana wallet directly from the platform.",
        techStack: "React.js, Python, Solana, Firestore, Three.js",
        link: "",
        open: "https://wibit.online"
      },
      "GreekLink": {
        desc: "A full-stack web application for enhancing fraternity and sorority news. Features real-time search, secure Firebase Firestore backend, authentication, and scraped forum data with 35,000+ posts.",
        techStack: "Next.js, React, TypeScript, Firebase Firestore, Python",
        link: "https://github.com/rkaelle/greeklink",
        open: "https://greeklink.xyz"
      },
      "Sentiment Analysis Bot": {
        desc: "A Python-based tool that analyzes sentiment from Reddit posts and comments to gauge public opinion on various stocks. It leverages Natural Language Processing (NLP) techniques for sentiment scoring and visualizes insights using interactive gauges created with Plotly.",
        techStack: "Python, NLP, PRAW, NLTK, Matplotlib, Plotly",
        link: "https:/github.com/rkaelle/sentiment-analysis-bot",
        open: ""
      },
      "Pipelined Assembly Datapath Simulator": {
        desc: "A C-based simulator for a 5-stage assembly code pipeline, integrating data forwarding, branch prediction, and hazard resolution. Simulates all pipeline stages and optimizes control and memory operations.",
        techStack: "C, Assembly, Branch Prediction, Pipeline Simulation",
        link: "https://github.com/rkaelle/assembly-pipeline-simulator",
        open: ""
      },
      "RyansDailyNews": {
        desc: "A Python script that fetches the latest events, reflections, skills, and science facts to send personalized daily emails to subscribers.",
        techStack: "Python, API, SMTP, Firebase",
        link: "https:/github.com/rkaelle/ryansdailynews",
        open: "https:/rkaelle.com/manage"
      },
      "View Full Portfolio": {
        desc: "",
        techStack: "",
        link: "",
        open: "/#/projects"
      }
    };

    return (
      <div id="projects">
        <div className="section-header">
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
<Carousel.Caption>
  <div className="carousel-item-content">
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
  </div>
</Carousel.Caption>
          </Carousel.Item>
          ))}
        </Carousel>
        <div className="project-container">
        <ul className="projects-grid">
  {Object.keys(projects).map((key, i) => (
    <FadeInSection delay={`${i + 1}00ms`} key={i}>
      {key === "View Full Portfolio" ? (
        <li className="projects-card portfolio-button">
          <a href={projects[key]["open"]} target="_blank" rel="noopener noreferrer">
            <div className="card-title">
              Click here to see my full portfolio
              <ArrowForwardIcon className="arrow-icon" />
            </div>
          </a>
        </li>
      ) : (
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
      )}
    </FadeInSection>
  ))}
</ul>
        </div>
      </div>
    );
  }
}

export default Projects;