import inquirer from "inquirer";
import assert from "node:assert/strict";
import { checkWinner } from "./checkWinner.js";

let board = ["[ ]", "[ ]", "[ ]", "[ ]", "[ ]", "[ ]", "[ ]", "[ ]", "[ ]"];

async function printBoard() {
  for (let i = 0; i < 9; i++) {
    if (i % 3 === 0 && i !== 0) {
      console.log(); // Move to the next line after every 3 cells
    }
    process.stdout.write(`${board[i]} `); // Print the cell value without a new line because
    // console.log has a new line at the end.
  }
  console.log(); // Add a final new line after the board is printed
}

function switchPlayer(n) {
  if (n === 0) {
    return 1;
  } else if (n === 1) {
    return 0;
  } else console.error("the player index is not 1 or 0");
}
/**
 * input prompt for inquirer.
 * @returns {string} '1' - '9' || 'q'.
 */
let question = {
  type: "input",
  name: "answer",
  message: "Pick a number between 1-9:",
  validate: (input) => {
    if (input === "q") {
      return true;
    }
    const convertedInput = Number(input);
    if (
      isNaN(convertedInput) ||
      convertedInput < 0 ||
      convertedInput > 8 ||
      board[convertedInput - 1] !== "[ ]"
    ) {
      return "Invalid input. Choose an empty cell between 1-9.";
    }
    return true;
  },
};

let isWinner = false;
const player = ["[x]", "[o]"];
let playerIndex = 0;

await printBoard();

while (!isWinner) {
  const { answer } = await inquirer.prompt([question]);
  if (answer == "q") {
    console.log("bye bye!");
    break;
  }

  let position = answer;
  position--;
  assert.strictEqual(typeof position, "number");

  board[position] = player[playerIndex]; // Update the board

  console.log("\nUpdated Board:");
  await printBoard();
  isWinner = checkWinner(board);
  assert.strictEqual(typeof isWinner, "boolean");

  playerIndex = switchPlayer(playerIndex);
  assert.strictEqual(typeof playerIndex, "number");

  if (board.every((cell) => cell !== "[ ]") && !isWinner) {
    console.log("tie!");
    break;
  }

  if (isWinner) {
    if (playerIndex === 1) console.log("\n🎉 X won! 🎉");
    else console.log("\n🎉 O won! 🎉");
    break;
  }
}
