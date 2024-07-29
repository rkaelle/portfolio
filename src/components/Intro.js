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
      expanded: true,
      activeKey: "1",
      visible: true
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
      <div id="intro">
        <ThreeDScene></ThreeDScene>
        <Typist cursor={{ hideWhenDone: true }}>
          <span className="intro-title">
            {"hi, i'm "}
            <span className="intro-name">{"ryan"}</span>
            <Typist.Backspace count={4} delay={1000} />
            <span className="intro-name">{"ryan kaelle"}</span>
          </span>
        </Typist>
        <FadeInSection>
          <div className="intro-subtitle">Always learning, both in and out of school</div>
          <div className="intro-desc">This site serves as a hub to showcase my past and current endeavors, including my projects (whether it be hardware or software), background, statistics, publications, and more.</div>
          <a href="mailto:rkaelle2@gmail.com" className="intro-contact">
            <EmailRoundedIcon></EmailRoundedIcon>
            {"  Contact me"}
          </a>
        </FadeInSection>
      </div>
    );
  }
}

export default Intro;
