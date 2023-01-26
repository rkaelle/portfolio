import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import FadeInSection from "./FadeInSection";

const isHorizontal = window.innerWidth < 600;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  if (isHorizontal) {
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  } else {
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  if (isHorizontal) {
    return {
      id: `full-width-tab-${index}`,
      "aria-controls": `full-width-tabpanel-${index}`
    };
  } else {
    return {
      id: `vertical-tab-${index}`
    };
  }
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: "theme.palette.background.paper",
    display: "flex",
    height: 300
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}));

const JobList = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const experienceItems = {
    "Power Engineering Company": {
      jobTitle: "Intern",
      duration: "May 2021 - August 2021",
      desc: [
        "Collaborated with executives; Ordered $25k of site materials; Attained boating license; Learned from fellow engineers by collaborating on project concepts; ",
        "Assessed structural integrity of projects; Observed client meetings; Learned industry intricacies; Labored on job sites; Learned Computer Aided Design (CAD).",
        "Power Engineering Construction Company builds marine construction and civil engineering projects in the Bay Area. The corporation conducts industrial construction projects such as the San Francisco Exploratorium Museum, SF Ferry Terminal and Pier 15."
      ]
    },
    "Community Emergency Response Team (CERT)": {
      jobTitle: "Radio Specialized Volunteer",
      duration: "MAY 2021 - Present",
      desc: [
        "CERT was my Eagle Scout project sponsor; When possible, assist as radio manager; ",
        "Combine amateur radio & computer science skills to program 20 emergency radios; ",
        "Perform monthly system updates; Ran nets - on-the-air gatherings of amateur radio operators; Maintain records of station; Assisted operations of the federally-licensed repeater and sub-unit."
      ]
    },
    "Miramonte Robotics Team": {
      jobTitle: "Lead Systems Engineer",
      duration: "Jan 2022 - April 2022",
      desc: [
        "As the Lead Systems Engineer I managed a team of 6 beginning/advanced Club members. Organized Club meetings; Co-managed $10k budget.",
        "I taught peers Java, Python, and electrical engineering skills; Top 30 at FIRST Robotics regionals; Built the robot's hardware components (circuits/sensors/motors); Collaborated with other team leaders; ",
        "Relevant technologies/tools used: Java, Servos, Infrared, RF",
        "Trained a team of two inexperienced peers to manage the 3D printing setup; Manage the eight 3D printers & CNC for all students to use for free; "
      ]
    },
    "StockX": {
      jobTitle: "Special Project Intern",
      duration: "June 2022 - JULY 2022",
      desc: [
        "4-week paid internship. I worked on a special finance project; Created Sarbanes-Oxley flowcharts; ",
        "Experienced finance work environment; Collaborated with executives; Learned about supply chain management, product development, and warehouse organization; Experienced the finance and management side of a company.",
      ]
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation={!isHorizontal ? "vertical" : null}
        variant={isHorizontal ? "fullWidth" : "scrollable"}
        value={value}
        onChange={handleChange}
        className={classes.tabs}
      >
        {Object.keys(experienceItems).map((key, i) => (
          <Tab label={isHorizontal ? `0${i}.` : key} {...a11yProps(i)} />
        ))}
      </Tabs>
      {Object.keys(experienceItems).map((key, i) => (
        <TabPanel value={value} index={i}>
          <span className="joblist-job-title">
            {experienceItems[key]["jobTitle"] + " "}
          </span>
          <span className="joblist-job-company">{key}</span>
          <div className="joblist-duration">
            {experienceItems[key]["duration"]}
          </div>
          <ul className="job-description">
            {experienceItems[key]["desc"].map(function (descItem, i) {
              return (
                <FadeInSection delay={`${i + 1}00ms`}>
                  <li key={i}>{descItem}</li>
                </FadeInSection>
              );
            })}
          </ul>
        </TabPanel>
      ))}
    </div>
  );
};

export default JobList;
