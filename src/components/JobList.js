import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FadeInSection from "./FadeInSection";

const JobList = () => {
  const [value, setValue] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const experienceItems = {
    "Power Engineering Company": {
      jobTitle: "Intern",
      duration: "May 2021 - August 2021",
      desc: [
        "Collaborated with executives; Ordered $25k of site materials; Attained boating license; Learned from fellow engineers by collaborating on project concepts; ",
        "Assessed structural integrity of projects; Observed client meetings; Learned industry intricacies; Labored on job sites; Learned Computer Aided Design (CAR).",
        "Power Engineering Construction Company builds marine construction and civil engineering projects in the Bay Area. The corporation conducts industrial construction projects such as the San Francisco Exploratorium Museum, SF Ferry Terminal and Pier 15."
      ],
    },
    "Community Emergency Response Team (CERT)": {
      jobTitle: "Radio Specialized Volunteer",
      duration: "MAY 2021 - Present",
      desc: [
        "CERT was my Eagle Scout project sponsor; When possible, assist as radio manager; ",
        "Combine amateur radio & computer science skills to program 20 emergency radios; ",
        "Perform monthly system updates; Ran nets - on-the-air gatherings of amateur radio operators; Maintain records of station; Assisted operations of the federally-licensed repeater and sub-unit."
      ],
    },
    "Miramonte Robotics Team": {
      jobTitle: "Lead Systems Engineer",
      duration: "Jan 2022 - April 2022",
      desc: [
        "As the Lead Systems Engineer I managed a team of 6 beginning/advanced Club members. Organized Club meetings; Co-managed $10k budget.",
        "I taught peers Java, Python, and electrical engineering skills; Top 30 at FIRST Robotics regionals; Built the robot's hardware components (circuits/sensors/motors); Collaborated with other team leaders; ",
        "Relevant technologies/tools used: Java, Servos, Infrared, RF",
        "Trained a team of two inexperienced peers to manage the 3D printing setup; Manage the eight 3D printers & CNC for all students to use for free; "
      ],
    },
    "StockX": {
      jobTitle: "Special Project Intern",
      duration: "June 2022 - JULY 2022",
      desc: [
        "4-week paid internship. I worked on a special finance project; Created Sarbanes-Oxley flowcharts; ",
        "Experienced finance work environment; Collaborated with executives; Learned about supply chain management, product development, and warehouse organization; Experienced the finance and management side of a company.",
      ],
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const rootStyle = {
    flexGrow: 1,
    backgroundColor: "theme.palette.background.paper",
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    height: isMobile ? 'auto' : 300,
  };

  const tabsStyle = {
    borderRight: isMobile ? "none" : `1px solid theme.palette.divider`,
    textAlign: 'left',
    alignItems: 'flex-start',
  };

  return (
    <div style={rootStyle}>
      <Tabs
        orientation={isMobile ? "horizontal" : "vertical"}
        variant={isMobile ? "fullWidth" : "scrollable"}
        value={value}
        onChange={handleChange}
        sx={{
          ...tabsStyle,
          '& .MuiTabs-indicator': {
            backgroundColor: 'var(--pink-bright)', 
            height: '4px',
            borderRadius: '2px',
          }
        }}
      >
        {Object.keys(experienceItems).map((key, i) => (
          <Tab key={i} label={isMobile ? `0${i + 1}.` : key} {...a11yProps(i)} />
        ))}
      </Tabs>
      {Object.keys(experienceItems).map((key, i) => (
        <TabPanel key={i} value={value} index={i}>
          <span className="joblist-job-title" style={{ textAlign: 'left', display: 'block', width: '100%' }}>
            {experienceItems[key]["jobTitle"] + " "}
          </span>
          <span className="joblist-job-company" style={{ textAlign: 'left', display: 'block', width: '100%' }}>
            {key}
          </span>
          <div className="joblist-duration">
            {experienceItems[key]["duration"]}
          </div>
          <ul className="job-description">
            {experienceItems[key]["desc"].map((descItem, j) => (
              <FadeInSection key={j} delay={`${j + 1}00ms`}>
                <li>{descItem}</li>
              </FadeInSection>
            ))}
          </ul>
        </TabPanel>
      ))}
    </div>
  );
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
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

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
}

export default JobList;