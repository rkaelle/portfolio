import React, { useEffect, useState} from "react";
import { DefaultSeo, SocialProfileJsonLd } from 'next-seo';
import seo from './components/seo.config.json';
import SidebarNav from "./components/SidebarNav";
import Main from "./components/Main";
import "./App.css";
import ScrollIndicator from './components/ScrollIndicator';
import "./styles/Global.css";
import "rsuite/dist/styles/rsuite-default.css";
import { Analytics } from "@vercel/analytics/react"

function App() {
  return (
    <div className="App">
      <DefaultSeo {...seo.defaultSeo} />
      <SocialProfileJsonLd {...seo.socialProfileJsonLd} />
      <Analytics />
      <Main />
    </div>
  );
}

export default App;
