import React from "react";
import { Link } from "react-router-dom";
import "../styles/Global.css";
import "../styles/Socials.css";
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import XIcon from '@mui/icons-material/X';
import TelegramIcon from '@mui/icons-material/Telegram';
import LanguageIcon from '@mui/icons-material/Language'; // Importing an icon for the website

class SocialsPage extends React.Component {
  render() {
    return (
      <div id="socials">
        <div className="top-left-button">
          <Link to="/" className="home-button">&lt;&lt; return home</Link>
        </div>
        <img src="/assets/ryan_headshot.jpg" alt="Ryan Kaelle" className="profile-photo" />
        <h1 className="name">Ryan Kaelle</h1>
        <h2 className="intro-text">Discover my work and see where you can find me</h2>
        <div className="socials-container">
          <a href="https://rkaelle.com" className="social-link">
            <LanguageIcon className="social-icon" />
            <span>Website</span>
          </a>
          <a href="https://www.linkedin.com/in/ryan-kaelle/" className="social-link">
            <LinkedInIcon className="social-icon" />
            <span>LinkedIn</span>
          </a>
          <a href="https://github.com/rkaelle" className="social-link">
            <GitHubIcon className="social-icon" />
            <span>GitHub</span>
          </a>
          <a href="https://twitter.com/kaelleryan" className="social-link">
            <XIcon className="social-icon" />
            <span>Twitter</span>
          </a>
          <a href="mailto:rkaelle2@gmail.com" className="social-link">
            <EmailRoundedIcon className="social-icon" />
            <span>Email</span>
          </a>
          <a href="https://t.me/rkaelle" className="social-link">
            <TelegramIcon className="social-icon" />
            <span>Telegram</span>
          </a>
        </div>
      </div>
    );
  }
}

export default SocialsPage;