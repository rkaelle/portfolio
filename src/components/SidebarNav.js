import React from 'react';
import { Sidenav } from 'rsuite';
import { Link } from 'react-router-dom';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import XIcon from '@mui/icons-material/X';

import "../styles/SidebarNav.css";
import "react-typist/dist/Typist.css";
import FadeInSection from "./FadeInSection";

const isMobile = window.innerWidth < 600;

class SidebarNav extends React.Component {
  constructor() {
    super();
    this.state = {
      expanded: true,
      activeKey: "1"
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.scrollToSection = this.scrollToSection.bind(this);
  }

  handleSelect(eventKey) {
    this.setState({
      activeKey: eventKey
    });
  }

  scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  

  render() {
    const isMobile = window.innerWidth < 600;
    const { expanded } = this.state;
    return (
      <div className="sidebar-nav">
        {!isMobile && (
          <Sidenav
            expanded={expanded}
            defaultOpenKeys={["3", "4"]}
            activeKey={this.state.activeKey}
            onSelect={this.handleSelect}
            appearance={"subtle"}
          >
            <Sidenav.Body>
              <div className="sidebar-links">
                <FadeInSection delay="100ms">
                  <div><a href="/" onClick={() => this.scrollToSection('home')}>/home</a></div>
                </FadeInSection>
                <FadeInSection delay="200ms">
                  <div><a href="#" onClick={() => this.scrollToSection('about')}>/about</a></div>
                </FadeInSection>
                <FadeInSection delay="300ms">
                  <div><a href="#" onClick={() => this.scrollToSection('experience')}>/experience</a></div>
                </FadeInSection>
                <FadeInSection delay="400ms">
                <div><a href="#" onClick={() => this.scrollToSection('projects')}>/creations & projects</a></div>
                </FadeInSection>
                <FadeInSection delay="500ms">
                  <div><Link to="/manage">/manage daily news</Link></div>
                </FadeInSection>
              </div>
            </Sidenav.Body>
          </Sidenav>
        )}

        <div className="sidebar-logos">
          <a href="mailto:rkaelle2@gmail.com">
            <EmailRoundedIcon style={{ fontSize: isMobile ? 35 : 20 }} />
          </a>
          <a href="https://github.com/rkaelle">
            <GitHubIcon style={{ fontSize: isMobile ? 34 : 19 }} />
          </a>
          <a href="https://www.linkedin.com/in/ryan-kaelle/">
            <LinkedInIcon style={{ fontSize: isMobile ? 36 : 21 }} />
          </a>
          <a href="https://x.com/KaelleRyan">
            <XIcon style={{ fontSize: isMobile ? 36 : 21 }} />
          </a>
        </div>
      </div>
    );
  }
}

export default SidebarNav;