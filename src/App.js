import React, { useEffect, useState } from "react";
import SidebarNav from "./components/SidebarNav";
import Intro from "./components/Intro";
import Header from "./components/Header";
import Experience from "./components/Experience";
import Statistics from "./components/Statistics";
import About from "./components/About";
import Projects from "./components/Projects";
import Credits from "./components/Credits";
import "./App.css";
import "./styles/Global.css";
import "rsuite/dist/styles/rsuite-default.css";

function App() {
  const [scroll, setScroll] = useState(0);
  useEffect(() => {
      let progressBarHandler = () => {
          const totalScroll = document.documentElement.scrollTop;
          const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
          const scroll = `${totalScroll / windowHeight}`;
          setScroll(scroll);
      }
      window.addEventListener("scroll", progressBarHandler);
      return () => window.removeEventListener("scroll", progressBarHandler);
  });
  return (
    <div className="App">
      <div id="content">
        <Header></Header>
        <Intro></Intro>
        <About></About>
        <Experience></Experience>
        <Statistics></Statistics>
        <Projects></Projects>
        <Credits></Credits>
      </div>
      <div id="progressBarContainer">
                <div id="progressBar" style={{transform: `scale(${scroll}, 1)`}} />
      </div>
      <SidebarNav />
    </div>
  );
}

export default App;
