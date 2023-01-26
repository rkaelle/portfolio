import React from "react";
import GitHubIcon from "@material-ui/icons/GitHub";
import OpenInBrowserIcon from "@material-ui/icons/OpenInBrowser";

class ExternalStats extends React.Component {
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
    return (
      <span className="external-stats">
        {this.props.openLink && (
          <a className="open-icon" href={this.props.openLink}>
            <OpenInBrowserIcon
              style={{
                fontSize: 25,
                color: "var(--lightest-slate)"
              }}
            ></OpenInBrowserIcon>
          </a>
        )}
      </span>
    );
  }
}

export default ExternalStats;
