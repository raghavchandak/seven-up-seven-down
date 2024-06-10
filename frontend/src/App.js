import "./App.css";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { calculateResult, updatePoints } from "./redux/gameSlice";
import { rollDice } from "./api";
import { isFulfilled } from "@reduxjs/toolkit";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { StyledEngineProvider, CssVarsProvider } from "@mui/joy/styles";
import { Link } from "react-router-dom";

//COMPONENTS
import ResultModal from "./components/resultModal";
import BetAmount from "./components/betAmount";
import Bet from "./components/bet";
import Loader from "./components/loader";

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
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // REDUX
  const dispatch = useDispatch();
  const store = useSelector((state) => state.game);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3500);
  }, []);

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

      if (action.payload === "Win!") setResult("win");
      else setResult("lose");

      setOpen(true);
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

  const handleClose = () => setOpen(false);

  return loading ? (
    <Loader />
  ) : (
    <ThemeProvider theme={theme}>
      <div className="App">
        <div className="top-bar">
          <div style={{ display: "flex" }}>
            <Link to="/">
              <FontAwesomeIcon
                icon="fa-solid fa-house"
                style={{
                  marginRight: "1rem",
                  fontSize: "1.5rem",
                  color: "white",
                }}
              />
            </Link>
            <FontAwesomeIcon
              icon="fa-solid fa-gear"
              style={{ fontSize: "1.5rem" }}
            />
          </div>
          <div className="points">Points: {store.points}</div>
        </div>
        <StyledEngineProvider injectFirst>
          <CssVarsProvider>
            <ResultModal
              open={open}
              handleClose={handleClose}
              result={result}
            />
          </CssVarsProvider>
        </StyledEngineProvider>
        <div className="table">
          <div className="betsContainer">
            <BetAmount
              betAmount={betAmount}
              handleBetAmount={handleBetAmount}
            />
            <Bet bet={bet} setBet={setBet} />
          </div>
          <div
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              alignItems: "center",
              marginBottom: "2rem",
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
