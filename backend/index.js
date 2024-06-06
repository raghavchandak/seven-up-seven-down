const express = require("express");

const app = express();
app.use(express.json());

app.get("/", (req, res) => res.send("Hello World!"));

//Helper function to generate random numbers
const getRandomNumber = (min, max) => {
  return Math.random() * (max - min) + min;
};

//Generate numbers for the dice
app.get("/generate-numbers", (req, res) => {
  let num1 = Math.floor(getRandomNumber(1, 6)),
    num2 = Math.floor(getRandomNumber(1, 6));

  res.send({ num1, num2 });
});

//1, 7, 13

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
  }
});

//Calculate new amount
app.post("/calculate-amount", (req, res) => {
  const { amount, result, bet, stake } = req.body;

  let newAmount = amount - stake;

  console.log(newAmount, stake);

  if (result == "lose") res.status(200).send(newAmount.toString());
  else {
    if (bet == 7) res.status(200).send((newAmount + stake * 5).toString());
    else res.status(200).send((newAmount + stake * 2).toString());
  }
});

app.listen(3000, () => console.log("Listening on port 3000"));
