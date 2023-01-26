import React from "react";

import "../styles/Header.css";
import { TypeAnimation } from 'react-type-animation';
import "react-typist/dist/Typist.css";

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      expanded: false,
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
      <div id="header">
        <span className="header-blinker">
            {'~ /'}
            <TypeAnimation sequence={['']}/>
        </span>
      </div>
    );
  }
}

export default Header;
