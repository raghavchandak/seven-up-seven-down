import "./App.css";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { calculateResult, updatePoints } from "./redux/gameSlice";
import { rollDice } from "./api";
import { isFulfilled } from "@reduxjs/toolkit";
import Card from "@mui/joy/Card";

// FOR DICE ICONS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

const faces = ["one", "two", "three", "four", "five", "six"];

function App() {
  // STATES TO MAINTAIN
  const [bet, setBet] = useState(0);
  const [betAmount, setBetAmount] = useState(0);
  const [diceClass, setDiceClass] = useState("die");
  const [face1, setFace1] = useState("three");
  const [face2, setFace2] = useState("five");
  const [result, setResult] = useState("");
  const [error, setError] = useState(false);

  // REDUX
  const dispatch = useDispatch();
  const store = useSelector((state) => state.game);

  const handleBetAmount = (val) => {
    if (val <= store.points) {
      setBetAmount(val);
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleRoll = async () => {
    console.log(error);

    setDiceClass("roll");

    const res = await rollDice();
    const { num1, num2 } = res;

    setFace1(faces[num1 - 1]);
    setFace2(faces[num2 - 1]);

    setTimeout(() => setDiceClass("die"), 800);

    setTimeout(() => checkResult(num1 + num2), 1000);
  };

  const checkResult = async (diceSum) => {
    const body = {
      diceSum: diceSum,
      selectedOption: bet,
    };

    const action = await dispatch(calculateResult(body, bet, betAmount));

    if (isFulfilled(action)) {
      dispatch(
        updatePoints({
          amount: store.points,
          result: action.payload,
          bet: bet,
          stake: betAmount,
        })
      );

      if (action.payload === "Win!") setResult("Wohoo! You Won!");
      else setResult("Better Luck Next Time :(");

      setBet(0);
      setBetAmount(0);
    }
  };

  return (
    <div className="App">
      <Card variant="solid" className="card">
        <h2>Current Points : {store.points}</h2>
      </Card>
      {result !== "" && <h2 style={{position: "absolute", top: "15%"}}> {result} </h2>}
      <div className="betsContainer">
        <div className="bets">
          <div className="upper-box" onClick={() => setBet(13)}>
            <p>7 Up</p>
          </div>
          <div className="circle" onClick={() => setBet(7)}>
            <p>7</p>
          </div>
          <div className="lower-box" onClick={() => setBet(1)}>
            <p>7 Down</p>
          </div>
        </div>
      </div>
      <div
        style={{ display: "flex", flexDirection: "column", marginTop: "2rem" }}
      >
        <p style={{fontWeight: "700", fontSize: "1rem"}}>Choose Your Bet Amount:</p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            height: "10vh",
            marginTop: 0,
            gap: "1rem"
          }}
        >
          <Button
            variant={betAmount === 100 ? "contained" : "outlined"}
            onClick={() => handleBetAmount(100)}
            className="betButton"
          >
            100
          </Button>
          <Button
            variant={betAmount === 200 ? "contained" : "outlined"}
            onClick={() => handleBetAmount(200)}
            className="betButton"
          >
            200
          </Button>
          <Button
            variant={betAmount === 500 ? "contained" : "outlined"}
            onClick={() => handleBetAmount(500)}
            className="betButton"
          >
            500
          </Button>
        </div>
      </div>
      <div className="table">
        <Button
          variant="contained"
          onClick={handleRoll}
          disabled={bet === 0 || betAmount === 0 || error}
          style={{marginTop: "2.5rem"}}
        >
          Roll!
        </Button>
        <div className="dice" id="dice">
          <div className={diceClass} id="die1">
            <FontAwesomeIcon icon={`fa-dice-${face1}`} className="icon" />
          </div>
          <div className={diceClass} id="die2">
            <FontAwesomeIcon
              icon={["fas", `fa-dice-${face2}`]}
              className="icon"
            />
          </div>
        </div>
      </div>
      {/* <h2>Place Your Bet</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "2rem",
        }}
      >
        <Button
          variant={bet === 1 ? "contained" : "outlined"}
          onClick={() => setBet(1)}
        >
          7 Down
        </Button>
        <Button
          variant={bet === 7 ? "contained" : "outlined"}
          onClick={() => setBet(7)}
        >
          7
        </Button>
        <Button
          variant={bet === 13 ? "contained" : "outlined"}
          onClick={() => setBet(13)}
        >
          7 Up
        </Button>
      </div>
      <h2>Choose your Bet Amount:</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Button
          variant={betAmount === 100 ? "contained" : "outlined"}
          onClick={() => handleBetAmount(100)}
        >
          100
        </Button>
        <Button
          variant={betAmount === 200 ? "contained" : "outlined"}
          onClick={() => handleBetAmount(200)}
        >
          200
        </Button>
        <Button
          variant={betAmount === 500 ? "contained" : "outlined"}
          onClick={() => handleBetAmount(500)}
        >
          500
        </Button>
      </div>

      {error && <h2>You don't have enough points!</h2>} */}
    </div>
  );
}

export default App;
