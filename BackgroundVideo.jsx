import React from "react";
import "./BackgroundVideo.css"; // we'll add CSS here

const BackgroundVideo = () => {
  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      className="background-video"
    >
      <source src="/videos/skin_health_bg.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default BackgroundVideo;