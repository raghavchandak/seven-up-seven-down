import React from "react";
import "../App.css";

function Bet(props) {
  const { bet, setBet } = props;

  return (
    <div className="bets">
      <div
        className="upper-box"
        onClick={() => setBet(13)}
        style={{
          border: bet === 13 ? "3px solid #eccc9c" : "3px solid #977245",
          opacity: bet === 13 ? "0.5" : "1",
        }}
      >
        <p>7 Up</p>
      </div>
      <div
        className="circle"
        onClick={() => setBet(7)}
        style={{
          background:
            bet === 7
              ? "linear-gradient(to right, #4A1C1E, #5E252B)"
              : "linear-gradient(to right, #641d1c, #af2c2c, #641d1c)",
        }}
      >
        <p>7</p>
      </div>
      <div
        className="lower-box"
        onClick={() => setBet(1)}
        style={{
          border: bet === 1 ? "3px solid #eccc9c" : "3px solid #977245",
          opacity: bet === 1 ? "0.5" : "1",
        }}
      >
        <p>7 Down</p>
      </div>
    </div>
  );
}

export default Bet;
