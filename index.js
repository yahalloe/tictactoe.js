import inquirer from "inquirer";
import { checkWinner, switchPlayer, printBoard } from "./utils.js";

export let board = [
  "[ ]",
  "[ ]",
  "[ ]",
  "[ ]",
  "[ ]",
  "[ ]",
  "[ ]",
  "[ ]",
  "[ ]",
];

let isWinner = false;

const player = ["[x]", "[o]"];
let playerIndex = 0;
await printBoard();

while (!isWinner) {
  const answer = await inquirer.prompt([
    {
      type: "input",
      name: "position",
      message: "Pick a number between 1-9:",
      validate: (input) => {
        if (input === "q") {
          return true;
        }
        const pos = parseInt(input) - 1;
        if (isNaN(pos) || pos < 0 || pos > 8 || board[pos] !== "[ ]") {
          return "Invalid input. Choose an empty cell between 1-9.";
        }
        return true;
      },
    },
  ]);

  if (answer.position === "q") {
    console.log("bye bye!");
    break;
  }

  const position = parseInt(answer.position) - 1;
  board[position] = player[playerIndex]; // Update the board

  console.log("\nUpdated Board:");
  await printBoard();
  isWinner = checkWinner(board);

  playerIndex = switchPlayer(playerIndex);

  //check for draws
  if (board.every((cell) => cell !== "[ ]") && !isWinner) {
    console.log("tie!");
    break;
  }

  if (isWinner) {
    if (playerIndex == 1) console.log("\n🎉 X won! 🎉");
    else console.log("\n🎉 O won! 🎉");
    break;
  }
}
