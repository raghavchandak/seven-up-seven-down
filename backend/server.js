const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const cors = require("cors");

const jsonParser = bodyParser.json();

app.use(jsonParser);
app.use(cors());

//Helper function to generate random numbers
const getRandomDiceNumber = () => {
  const MIN_DICE_NUMBER = 1;
  const MAX_DICE_NUMBER = 6;

  // Formula to generate number betwee max and min number. By default, Math.random() generates a number between 0 and 1
  return Math.floor(
    Math.random() * (MAX_DICE_NUMBER - MIN_DICE_NUMBER) + MIN_DICE_NUMBER
  );
};

//Generate numbers for the dice
app.get("/generate-numbers", (req, res) => {
  const num1 = getRandomDiceNumber(),
    num2 = getRandomDiceNumber();

  res.send({ num1, num2 });
});

//Check turn result
app.post("/check-result", (req, res) => {
  const { diceSum, selectedOption } = req.body;

  switch (selectedOption) {
    case 1:
      if (diceSum < 7) res.send("Win!");
      else res.send("Lose!");
      break;
    case 7:
      if (diceSum == 7) res.send("Win!");
      else res.send("Lose!");
      break;
    case 13:
      if (diceSum > 7) res.send("Win!");
      else res.send("Lose!");
      break;
    default:
      res.status(400).send("Error!");
  }
});

//Calculate new amount
app.post("/calculate-amount", (req, res) => {
  const { amount, result, bet, stake } = req.body;

  let newAmount = amount - stake;

  if (result == "Lose!") res.status(200).send({ amount: newAmount });
  else {
    if (bet == 7) res.status(200).send({ amount: newAmount + stake * 5 });
    else res.status(200).send({ amount: newAmount + stake * 2 });
  }
});

app.listen(8000, () => console.log("Listening on port 8000"));

// export default app;
