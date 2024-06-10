import React from "react";
import "../styles/loader.css";
import Lottie from "lottie-react";
import coins from "../assets/coins.json";

function Loader() {
  return (
    <div className="main">
      <Lottie animationData={coins}/>
    </div>
  );
}

export default Loader;
