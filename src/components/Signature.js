import React, { useState } from "react";
import styled from "styled-components";
import ReactPlayer from "react-player";
import "../styles/Signature.css";
import Vid from "../assets/Signature.mp4";

export default function Signature() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const onLoadedData = () => {
    setIsVideoLoaded(true);
  };
  return (
    <div className="Signature">
      <h1>react-player-mp4</h1>
        <div style={{ opacity: isVideoLoaded ? 1 : 0 }}>
          <ReactPlayer
            url={Vid}
            playing={true}
            controls={false}
            loop={false}
            muted={true}
            playsinline={true}
            onReady={onLoadedData}
          />
        </div>
    </div>
  );
}


