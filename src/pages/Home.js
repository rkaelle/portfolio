import React, { useEffect, useState } from "react";
import { DefaultSeo, SocialProfileJsonLd } from 'next-seo';
import seo from '../components/seo.config.json';
import SidebarNav from "../components/SidebarNav";
import Intro from "../components/Intro";
import Header from "../components/Header";
import Experience from "../components/Experience";
import About from "../components/About";
import Projects from "../components/Projects";
import Credits from "../components/Credits";
import Footer from "../components/Footer";
import "../styles/Home.css";
import "../styles/Global.css";
import "rsuite/dist/styles/rsuite-default.css";

function Home() {
  const [scroll, setScroll] = useState(0);

useEffect(() => {
  const progressBarHandler = () => {
    const totalScroll = document.documentElement.scrollTop;
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scroll = totalScroll / windowHeight;
    console.log('Scroll:', scroll); // Add this line
    setScroll(scroll);
  };

  window.addEventListener("scroll", progressBarHandler);
  return () => window.removeEventListener("scroll", progressBarHandler);
}, []);
  return (
    
    <div className="App">
      <div id="content">
        <DefaultSeo {...seo.defaultSeo} />
        <SocialProfileJsonLd {...seo.socialProfileJsonLd} />
        <Header />
        <Intro />
        <About />
        <Experience />
        <Projects />
        <Footer />
        <Credits />
      </div>
      <div id="progressBarContainer">
        <div id="progressBar" style={{ transform: `scale(${scroll}, 1)` }} />
      </div>
      <SidebarNav />
    </div>
  );
}

export default Home;