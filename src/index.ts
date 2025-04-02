import inquirer from "inquirer";
import assert from "node:assert/strict";
import chalk from "chalk";

import checkWinner from "./checkWinner.js";

let board: string[] = ["[ ]", "[ ]", "[ ]", "[ ]", "[ ]", "[ ]", "[ ]", "[ ]", "[ ]"];

async function printBoard(currentPlayer: number) {
  for (let i = 0; i < 9; i++) {
    if (i % 3 === 0 && i !== 0) {
      console.log(); // Move to the next line after every 3 cells
    }
    if (currentPlayer === 0) {
      process.stdout.write(`${chalk.blue(board[i])}`); // Print the cell value without a new line because
    } else {
      process.stdout.write(`${chalk.red(board[i])}`); // Print the cell value without a new line because
    }

    // console.log has a new line at the end.
  }
  console.log(); // Add a final new line after the board is printed
}

function switchPlayer(n: number): number{
  if (n === 0) {
    return 1;
  } 
  
  else if (n === 1) {
    return 0;
  } 

  else 
    console.error("the player index is not 1 or 0");

  return NaN;
}
/**
 * input prompt for inquirer.
 * @returns {string} '1' - '9' || 'q'.
 */
let question: object = {
  type: "input",
  name: "answer",
  message: "Pick a number between 1-9:",
  validate: (input :string) => {
    return new Promise((resolve) => {
      if (input === "q") {
        resolve(true);
        return;
      }

      const convertedInput = Number(input);

      setTimeout(() => {
        if (
          isNaN(convertedInput) ||
          convertedInput < 1 || // Fixed: Should be 1-9, not 0-8
          convertedInput > 9 ||
          board[convertedInput - 1] !== "[ ]"
        ) {
          resolve("Invalid input. Choose an empty cell between 1-9.");
        } else {
          resolve(true);
        }
      }, 0); // Delay
    });
  },
};

let isWinner: boolean = false;
const player: string[] = ["[x]", "[o]"];
let playerIndex: number = 0;

console.log("press q to quit.");
await printBoard(playerIndex);

while (!isWinner) {
  const { answer } = await inquirer.prompt([question]);
  if (answer === "q") {
    console.log("bye bye!");
    break;
  }

  let index = Number(answer);
  assert.strictEqual(typeof index, "number");
  index--;

  board[index] = player[playerIndex]; // Update the board's content

  playerIndex = switchPlayer(playerIndex);
  assert.strictEqual(typeof playerIndex, "number");

  console.log("\nUpdated Board:");
  await printBoard(playerIndex);

  isWinner = checkWinner(board);
  assert.strictEqual(typeof isWinner, "boolean");

  // loop the board values and check for draw.
  if (board.every((cell) => cell !== "[ ]") && !isWinner) {
    console.log(`${chalk.gray("tie!")}🥹`);
    break;
  }

  if (isWinner) {
    if (playerIndex === 1) console.log(`\n🎉 ${chalk.green("X won!")} 🎉`);
    else console.log(`\n🎉 ${chalk.green("O won!")} 🎉`);
    break;
  }
}
