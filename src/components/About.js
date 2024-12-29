import React from "react";
import "../styles/About.css";
import FadeInSection from "./FadeInSection";

class About extends React.Component {
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
    const one = (
      <p>
        I am currently a Sophomore at <a href="https://eecs.engin.umich.edu/"> the University of Michigan</a>, looking to work in hardware engineering, full stack development, and crypto.  I’m fascinated by technical, large scale products that are changing the technological landscape. I’ve been lucky enough to work on some pretty interesting projects and pick up some cool skills along the way :)
        
      </p>
    );
    const two = (
      <p>
        Outside of work, I'm interested in drones, cars, the outdoors, and sneakers. And I'm always interested in learning more, whether it be through reading, podcasts, or hands-on projects.
      </p>
    );

    const tech_stack = [
      "Blockchain",
      "Swarm Robotics",
      "AI/ML", 
      "RF Devices",
      "Algorithmic Trading",
      "3D Printing"
    ];

    const language_stack = [
      "Python",
      "C++",
      "MATLAB",
      "JS",
      "Solidity",
      "Verilog"
    ]

    return (
      <div id="about">
        <FadeInSection>
          <div className="section-header ">
            <span className="section-title">/ about me</span>
          </div>
          <div className="about-content">
            <div className="about-description">
              {[one]}
              {"Here are some technologies I have been working with:"}
              <ul className="tech-stack">
                {tech_stack.map(function (tech_item, i) {
                  return (
                    <FadeInSection delay={`${i + 1}00ms`}>
                      <li>{tech_item}</li>
                    </FadeInSection>
                  );
                })}
              </ul>
              {[two]}
              <ul className="language-stack">
                {language_stack.map(function (language_item, i) {
                  return (
                    <FadeInSection delay={`${i + 1}00ms`}>
                      <li>{language_item}</li>
                    </FadeInSection>
                  );
                })}
              </ul>
            </div>
            <div className="ryan_portrait">
              <img class="image_on" src="/assets/porsche.png" alt="Ryan + Porsche"/>
              <img class="image_off" src="/assets/scouts_headshot.png" alt="Scouts"/>
            </div>
          </div>
        </FadeInSection>
      </div>
    );
  }
}

export default About;
