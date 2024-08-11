import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FadeInSection from "./FadeInSection";

const JobList = () => {
  const [value, setValue] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("Technical");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const experienceItems = {
    "Technical": {
      "JoinMe": {
        jobTitle: "Intern SWE",
        duration: "June 2023 - Present",
        desc: [
          "Interned at social media app intended to facilitate event creation and participation",
          "Brainstormed and prototyped user experience (UX) layouts",
          "Implemented Biking activity into app, Deploying React Native, Go, and SQL",
          "Leveraged enterprise team coding practices (ex. Scrum board), created \"Help Center\", \"Settings\", and \"Messages\" pages"
        ],
      },
      "Z Lab": {
        jobTitle: "Swarm Intelligence Robotics Research",
        duration: "January 2024 - Present",
        desc: [
          "Design and implement location and contact sensors (UWB, proximity, accelerometer, etc.)",
          "Review literature on miniature locomotion mechanisms; Design, manufacture, and test the atombot platform",
          "Designed PCB and circuit design (Altium) and fabrication; developed 3D printing, laser cutter, milling machine, soldering, etc skills; programming with C/C++/Python; 3D CAD design (SolidWorks)"
        ],
      },
      "HELIOS": {
        jobTitle: "Co-Founder",
        duration: "November 2023 - Present",
        desc: [
          "Co-founded the company, securing $15k+ in funding; designed and maintained the company website; filed a provisional patent (63/547158) for aviation technology.",
          "Researched advanced energy storage and propulsion technologies, optimized aircraft performance, and integrated advanced components into prototypes.",
          "Identified target markets (commercial airlines, private jets, cargo airlines), delivered stakeholder presentations, and crafted technical documentation and code."
        ],
      },
      "Ace Hardware": {
        jobTitle: "Sales Associate",
        duration: "May 2024 - August 2024",
        desc: [
          "Assisted customers with problem-solving, product recommendations, and prototyping solutions to meet their needs.",
          "Managed inventory, ensuring accurate stock levels and proficiency in using various specialty tools.",
          "Contributed to a team-oriented environment, achieving store sales targets and high customer satisfaction."
        ],
      },
    },
"Crypto": {
  "Michigan Blockchain": {
    "jobTitle": "Investment Team & Conference Planning Team",
    "duration": "May 2024 - Present",
    "desc": [
  <span>Pitched and scaled a $10k investment to $90k, with a focus on $POKT. Check out one of my pitches <a href="https://firebasestorage.googleapis.com/v0/b/ryansdailynews-7df9d.appspot.com/o/photos%2FTrojan%20Telegram%20Bot%20Pitch.pdf?alt=media&token=1a48a8c3-a1b7-4bd6-ad46-cd0a68256dd2" target="_blank" rel="noopener noreferrer">here</a>.</span>,
  "Orchestrated conference planning, including media outlet engagement, content creation, and speaker outreach.",
  "Led physical setup coordination, collaborating with Michigan Business + Tech on stage design, photography, and budgeting.",
  "Represented UMich Blockchain at MTNDao, fostering industry connections.",
],
  },
  "Renaud Partners": {
    "jobTitle": "Research Analyst",
    "duration": "May 2024 - June 2024",
    "desc": [
      "Engaged in venture capital outreach and project sourcing at a crypto go-to-market firm (G2M).",
      "Developed and maintained a comprehensive resource database.",
      "Communicated with clients and collaborated with industry expert Geoff Renaud."
    ],
  },
}
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleCategoryChange = (event, newCategory) => {
    if (newCategory !== selectedCategory) {
      setSelectedCategory(newCategory);
      setValue(0); // Reset to first job in the new category
    }
  };

  const categoryStyle = {
    backgroundColor: "theme.palette.background.paper",
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    height: isMobile ? 'auto' : 50,
  }

  const rootStyle = {
    flexGrow: 1,
    backgroundColor: "theme.palette.background.paper",
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    height: isMobile ? 'auto' : 350,
  };

  const tabsStyle = {
    borderRight: isMobile ? "none" : `1px solid theme.palette.divider`,
    textAlign: 'left',
    alignItems: 'flex-start',
  };

  const filteredExperienceItems = experienceItems[selectedCategory];

  return (
  <>
    <div style={categoryStyle}>
      <Tabs
        value={selectedCategory}
        onChange={handleCategoryChange} // Use the new handler
        centered
        sx={{
          marginBottom: '10px',
          '& .MuiTabs-indicator': {
            backgroundColor: 'var(--pink-bright)',
            height: '4px',
            borderRadius: '2px',
          },
          '& .MuiTab-root': {
            paddingBottom: '2px',
          }
        }}
      >
        <Tab label="Technical" value="Technical" />
        <Tab label="Crypto" value="Crypto" />
      </Tabs>
    </div>
    
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
        {Object.keys(filteredExperienceItems).map((key, i) => (
          <Tab key={i} label={isMobile ? `0${i + 1}.` : key} {...a11yProps(i)} />
        ))}
      </Tabs>
      {Object.keys(filteredExperienceItems).map((key, i) => (
        <TabPanel key={i} value={value} index={i}>
          <span className="joblist-job-title" style={{ textAlign: 'left', display: 'block', width: '100%' }}>
            {filteredExperienceItems[key]["jobTitle"] + " "}
          </span>
          <span className="joblist-job-company" style={{ textAlign: 'left', display: 'block', width: '100%' }}>
            {key}
          </span>
          <div className="joblist-duration">
            {filteredExperienceItems[key]["duration"]}
          </div>
          <ul className="job-description">
            {filteredExperienceItems[key]["desc"].map((descItem, j) => (
              <FadeInSection key={j} delay={`${j + 1}00ms`}>
                <li>{descItem}</li>
              </FadeInSection>
            ))}
          </ul>
        </TabPanel>
      ))}
    </div>
  </>
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