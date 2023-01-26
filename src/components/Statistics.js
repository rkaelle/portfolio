import React from "react";
import "../styles/Statistics.css";
import FolderOpenRoundedIcon from "@material-ui/icons/FolderOpenRounded";
import GitHubIcon from "@material-ui/icons/GitHub";
import OpenInBrowserIcon from "@material-ui/icons/OpenInBrowser";
import FadeInSection from "./FadeInSection";
import ExternalStats from "./ExternalStats";

class Statistics extends React.Component {
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

    const statistics = {
      "Reddit": {
        desc:
          "14k Karma",
        techStack: "Python (Flask), Vue.js, Bootstrap, SQL",
        link: "",
        open: "https://www.reddit.com/"
      }, "Wikipedia": {
        desc:
          "650+ Edits",
        techStack: "Python",
        link: "",
        open: "https://www.wikipedia.org/"
      },
      "QRZ": {
        desc:
          "Callsign: KN6OJE\nDX Connections",
        techStack: "Javascript, HTML / CSS",
        link: "https://www.qrz.com/db/KN6OJE",
        open: "https://www.qrz.com/db/KN6OJE"
      },
      "Medium": {
        desc:
          "Read my on tech articles, fintech, and crypto",
        techStack: "Node.js (Express.js), React.js, PostgreSQL",
        link: "https://medium.com/",
        open: "https://medium.com/"
      },
      "Github": {
        desc:
          "33 Repositories",
        techStack: "Javascript, Node.js, Natural NLP, Telegram API",
        link: "",
        open: "https://github.com/rkaelle"
      },
      "Book list": {
        desc:
          "look at my favorite books here",
        techStack: "Python",
        link: "",
        open: "https://www.goodreads.com/review/list/162002196?ref=nav_mybooks"
      },
      "TOR Relay": {
        desc:
          "Check the status of my relay here",
        techStack: "Python",
        link: "",
        open: ""
      },
      "Broadcastify": {
        desc:
          "live radio feed broadcast",
        techStack: "Python",
        link: "",
        open: "https://www.broadcastify.com/listen/feed/37939"
      }/*,
      "Replit": {
        desc:
          "both classwor for CSA and indivoidual projects",
        techStack: "Python",
        link: "",
        open: ""
      },"CCNA / OSCP Associate": {
        desc:
          "Associate in Progress",
        techStack: "Python",
        link: "",
        open: ""
      },
      "HAM radio": {
        desc:
          "callsign kn6oje",
        techStack: "Java, Android Studio",
        link: "",
        open: ""
      },
      "leetcode": {
        desc:
          "see my solves on coding interview questions",
        techStack: "Python",
        link: "",
        open: ""
      }, "Kaggle": {
        desc:
          "just started",
        techStack: "Python",
        link: "",
        open: ""
      }*/
    };

    return (
      <div id="statistics">
        <div className="section-header ">
          <span className="section-title">/ statistics</span>
        </div>
        <div className="stats-container">
          <ul className="stats-grid">
            {Object.keys(statistics).map((key, i) => (
              <FadeInSection delay={`${i + 1}00ms`}>
                <li className="stats-card" >
                  <div className="stats-card-header">
                    <ExternalStats
                      githubLink={statistics[key]["link"]}
                      openLink={statistics[key]["open"]}
                    ></ExternalStats>
                  </div>
                  <div className="stats-card-title">{key}</div>
                  <div className="stats-card-desc">{statistics[key]["desc"]}</div>
                </li>
              </FadeInSection>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Statistics;
