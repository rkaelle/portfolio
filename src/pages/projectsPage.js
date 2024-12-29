import React from "react";
import "../styles/projectsPage.css";
import FolderOpenRoundedIcon from '@mui/icons-material/FolderOpenRounded';
import Carousel from "react-bootstrap/Carousel";
import ExternalLinks from "../components/ExternalLinks";
import { Link } from "react-router-dom";

// Define the spotlightProjects and projects outside the component
const spotlightProjects = {
  "Smart Eink Photo Display": {
    title: "Smart e-Paper Photo Display",
    desc:
      "A Python-based smart photo frame for managing and displaying images and real-time clocks on an e-Paper display.",
    techStack: "Python, Firebase Firestore, Firebase Storage, 3D Printing, CAD",
    link: "https://github.com/rkaelle/einkphotoalbumn",
    open: "https://www.thingiverse.com/thing:6891829",
    image: "/assets/eink.JPG"
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
    image: "/assets/gauges.pngg"

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
  "WiBit": {
    desc: "A decentralized Wi-Fi network that rewards users for reducing bandwidth during congestion periods using WiBit tokens. Users can monitor network usage and manage their Solana wallet directly from the platform.",
    techStack: "React.js, Python, Solana, Firestore, Three.js",
    link: "",
    open: "https://wibit.online"
  },
  "Clustered Raspberry Pi": {
    desc: "Includes NAS file storage, personal homelab, and micro supercomputer.",
    techStack: "Raspian, Clustering, Microcomputers",
    link: "",
    open: ""
  },
  "Smart Eink Photo Display": {
    desc: "A Python-based smart photo frame for managing and displaying images and real-time clocks on an e-Paper display.",
    techStack: "Python, Firebase Firestore, Firebase Storage, 3D Printing, CAD",
    link: "https://github.com/rkaelle/einkphotoalbumn",
    open: "https://www.thingiverse.com/thing:6891829",
  },
  "Stock Trading Simulator": {
    desc: "A C++ simulator for multi-stock trading and order matching, providing real-time statistics and optimized performance using priority queues, hash maps, and binary search trees.",
    techStack: "C++, Priority Queues, Hash Maps, Binary Search Trees, Algorithms",
    link: "https://github.com/rkaelle/stock-trading-simulator",
    open: "",
  },
  "ML Text Classifier": {
    desc: "A C++ program leveraging machine learning and NLP with a Naive Bayes algorithm to classify university forum posts. Includes CSV parsing, tokenization, log-likelihood computation, and scalable data structure optimizations.",
    techStack: "C++, Naive Bayes, Machine Learning, NLP",
    link: "",
    open: "https://github.com/rkaelle/machine-learning-text-classifier"
  },
  "Pipelined Assembly Datapath Simulator": {
    desc: "A C-based simulator for a 5-stage assembly code pipeline, integrating data forwarding, branch prediction, and hazard resolution. Simulates all pipeline stages and optimizes control and memory operations.",
    techStack: "C, Assembly, Branch Prediction, Pipeline Simulation",
    link: "https://github.com/rkaelle/assembly-pipeline-simulator",
    open: ""
  },
  "Verilog Four Function Calculator": {
    desc: "A Verilog-based calculator supporting addition, subtraction, multiplication, and division with a finite state machine and Booth’s algorithm. Optimized with multiplexers and tested using ModelSim simulations.",
    techStack: "Verilog, FSM, Booth’s Algorithm, ModelSim",
    link: "",
    open: "https://github.com/rkaelle/four-function-calculator"
  },
  "GreekLink": {
    desc: "A full-stack web application for enhancing fraternity and sorority news. Features real-time search, secure Firebase Firestore backend, authentication, and scraped forum data with 35,000+ posts.",
    techStack: "Next.js, React, TypeScript, Firebase Firestore, Python",
    link: "https://github.com/rkaelle/greeklink",
    open: "https://greeklink.xyz"
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

// Shuffle function using Fisher-Yates algorithm
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // Swap elements i and j
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

class ProjectsPage extends React.Component {
  constructor(props) {
    super(props);
    // Shuffle the project keys once when the component mounts
    const projectKeys = Object.keys(projects);
    const shuffledProjectKeys = shuffleArray(projectKeys);
    this.state = {
      shuffledProjectKeys,
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
            {this.state.shuffledProjectKeys.map((key, i) => (
              <li className="projects-card-page" key={key}>
                <div className="card-header-page">
                  <div className="folder-icon-page">
                    <FolderOpenRoundedIcon style={{ fontSize: 35 }} />
                  </div>
                  <ExternalLinks
                    githubLink={projects[key]["link"]}
                    openLink={projects[key]["open"]}
                  />
                </div>

                <div className="card-title-page">{key}</div>
                <div className="card-desc-page">{projects[key]["desc"]}</div>
                <div className="card-tech-page">{projects[key]["techStack"]}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default ProjectsPage;