import React from "react";
import Button from "@mui/material/Button";
import "../App.css";

function BetAmount(props) {
  const { betAmount, handleBetAmount } = props;

  return (
    <div className="bet-amount">
      <p>PLACE YOUR BET</p>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          marginTop: 0,
          gap: "0.75rem",
          flexWrap: "wrap",
          transform: "translateY(-30%)",
        }}
      >
        <Button
          variant={betAmount === 100 ? "contained" : "outlined"}
          onClick={() => handleBetAmount(100)}
          className="betButton"
          color="gold"
        >
          100
        </Button>
        <Button
          variant={betAmount === 200 ? "contained" : "outlined"}
          onClick={() => handleBetAmount(200)}
          className="betButton"
          color="gold"
        >
          200
        </Button>
        <Button
          variant={betAmount === 500 ? "contained" : "outlined"}
          onClick={() => handleBetAmount(500)}
          className="betButton"
          color="gold"
        >
          500
        </Button>
      </div>
    </div>
  );
}

export default BetAmount;
