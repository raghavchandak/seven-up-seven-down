import "./App.css";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { calculateResult, updatePoints } from "./redux/gameSlice";
import { rollDice } from "./api";
import { isFulfilled } from "@reduxjs/toolkit";
import { createTheme, ThemeProvider } from "@mui/material";

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

      setTimeout(() => setResult(""), 4000);
      setBet(0);
      setBetAmount(0);
    }
  };

  // Creating more colours for mui
  const { palette } = createTheme();
  const { augmentColor } = palette;
  const createColor = (mainColor) =>
    augmentColor({ color: { main: mainColor } });
  const theme = createTheme({
    palette: {
      gold: createColor("rgba(230,190,138, 0.8)"),
      blue: createColor("#1A222B"),
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <div className="top-bar">
          <div style={{ display: "flex" }}>
            <FontAwesomeIcon
              icon="fa-solid fa-house"
              style={{ marginRight: "0.5rem" }}
            />
            <FontAwesomeIcon icon="fa-solid fa-gear" />
          </div>
          <div className="points">Points : {store.points}</div>
        </div>
        {result !== "" ? (
          <div
            style={{
              position: "absolute",
              top: "50%",
              zIndex: "99",
              padding: "10 20",
              backgroundColor: "#1E2732",
              borderRadius: "10px",
              boxShadow: "10px 10px 5px rgba(0, 0, 0 , 0.3)",
            }}
          >
            <h2 style={{ marginLeft: "1rem", marginRight: "1rem" }}>
              {" "}
              {result}{" "}
            </h2>
          </div>
        ) : null}
        <div className="table">
          <div className="betsContainer">
            <div className="bet-amount">
              <p>PLACE YOUR BET</p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  marginTop: 0,
                  gap: "1rem",
                  flexWrap: "wrap",
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
            <div className="bets">
              <div
                className="upper-box"
                onClick={() => setBet(13)}
                style={{ border: bet === 13 ? "1px solid #eccc9c" : null }}
              >
                <p>7 Up</p>
              </div>
              <div
                className="circle"
                onClick={() => setBet(7)}
                style={{
                  border: bet === 7 ? "5px solid #eccc9c" : "5px solid #11151f",
                }}
              >
                <p>7</p>
              </div>
              <div
                className="lower-box"
                onClick={() => setBet(1)}
                style={{ border: bet === 1 ? "1px solid #eccc9c" : null }}
              >
                <p>7 Down</p>
              </div>
            </div>
          </div>
          <div
            style={{
              height: "100%",
              // backgroundColor: "red",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              onClick={handleRoll}
              disabled={bet === 0 || betAmount === 0 || error}
              color="blue"
              style={{
                borderRadius: 50,
                width: "10rem",
                fontFamily: "Impact",
                fontSize: "1rem",
                letterSpacing: "2px",
              }}
            >
              Roll Dice
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
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
