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
        I am currently a Senior at <a href="https://www.acalanes.k12.ca.us/miramonte"> Miramonte High School</a>, looking to work in electrical engineering, fintech, and data science. At the same time, I am undertaking outside <a href="https://www.udemy.com/user/ryan-kaelle-2/">online courses </a> to expand my skills.
        
      </p>
    );
    const two = (
      <p>
        Outside of work, I'm interested in drones, cars, the outdoors, and sneakers. And I'm always interested in learning more, whether it be through reading, investing, or podcasts.
      </p>
    );

    const tech_stack = [
      "Python",
      "3D Printing",
      "Fintech",
      "RF Devices",
      "Linux",
      "Computer Hardware",
      "Crypto"
    ];

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
