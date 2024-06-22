import React, { useEffect, useState } from "react";
import { DefaultSeo, SocialProfileJsonLd } from 'next-seo';
import seo from './components/seo.config.json';
import SidebarNav from "./components/SidebarNav";
import Main from "./components/Main";
import "./App.css";
import "./styles/Global.css";
import "rsuite/dist/styles/rsuite-default.css";

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (document.documentElement.scrollTop / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="App">
      <DefaultSeo {...seo.defaultSeo} />
      <SocialProfileJsonLd {...seo.socialProfileJsonLd} />
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '5px', backgroundColor: '#ccc' }}>
        <div style={{ height: '5px', width: `${scrollProgress}%`, backgroundColor: 'blue' }}></div>
      </div>
      <SidebarNav />
      <Main />
    </div>
  );
}

export default App;