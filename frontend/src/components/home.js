import React from "react";
import "../styles/home.css";
import { Outlet, Link } from "react-router-dom";
import updown from "../assets/7updown.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

function Home() {
  return (
    <div className="main-container">
      <div className="box">
        <div className="info-container">
          <img
            src={updown}
            alt="7 Up Down"
            style={{
              maxHeight: "60%",
              maxWidth: "60%",
              marginBottom: "1rem"
            }}
          />
          <div className="dice" id="dice" style={{ marginTop: -10 }}>
            <div className="roll" id="die1">
              <FontAwesomeIcon
                icon={`fa-dice-three`}
                className="icon"
                style={{ height: "4rem", width: "4rem" }}
              />
            </div>
            <div className="roll" id="die2">
              <FontAwesomeIcon
                icon={["fas", `fa-dice-five`]}
                className="icon"
                style={{ height: "4rem", width: "4rem" }}
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              color: "#B2B1B5",
              marginTop: "1rem"
            }}
          >
            <Link to="/game">
              <button className="button">Start</button>
            </Link>
            <h3>How To Play</h3>
          </div>
          <h3
            style={{ textAlign: "center", maxWidth: "70%", color: "#B2B1B5" }}
          >
            WHERE THE NUMBERS DECIDE YOUR FATE!
          </h3>
        </div>
      </div>
    </div>
  );
}

export default Home;
