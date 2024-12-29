import React from "react";
import "../styles/Intro.css";
import Typist from "react-typist";
import "react-typist/dist/Typist.css";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import FadeInSection from "./FadeInSection";
import FractalTree from "./FractalTree";
import ThreeDScene from "./ThreeDScene";

class Intro extends React.Component {
  constructor() {
    super();
    this.state = {
      showArrow: true, // State to toggle arrow visibility
      fadingOut: false, // State for fading effect
    };
    this.scrollToSection = this.scrollToSection.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll() {
    // Trigger fade out when scrolling down
    if (window.scrollY > 50 && !this.state.fadingOut) {
      this.setState({ fadingOut: true });
      setTimeout(() => {
        this.setState({ showArrow: false });
      }, 300); // Match the CSS fade-out duration
    } else if (window.scrollY <= 50 && this.state.fadingOut) {
      this.setState({ fadingOut: false, showArrow: true });
    }
  }

  scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  render() {
    const { showArrow, fadingOut } = this.state;
    return (
      <div id="intro">
        <ThreeDScene />
        <Typist cursor={{ hideWhenDone: true }}>
          <span className="intro-title">
            {"hi, i'm "}
            <span className="intro-name">{"ryan"}</span>
            <Typist.Backspace count={4} delay={1500} />
            <span className="intro-name">{"ryan kaelle"}</span>
          </span>
        </Typist>
        <FadeInSection>
          <div className="intro-subtitle">
            Always learning, both in and out of school
          </div>
          <div className="intro-desc">
            This site serves as a hub to showcase my past and current endeavors,
            including my projects {`(whether it be hardware, software, or both!)`}, background,
            statistics, publications, and more.
          </div>
          <a href="mailto:rkaelle2@gmail.com" className="intro-contact">
            <EmailRoundedIcon />
            {"  Contact me"}
          </a>
        </FadeInSection>
        {showArrow && (
          <div
            className={`scroll-indicator ${fadingOut ? "fade-out" : ""}`}
            onClick={() => this.scrollToSection("about")}
          >
            <div className="arrow"></div>
          </div>
        )}
      </div>
    );
  }
}

export default Intro;