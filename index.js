import inquirer from "inquirer";

let board = ["[ ]", "[ ]", "[ ]", "[ ]", "[ ]", "[ ]", "[ ]", "[ ]", "[ ]"];

export async function printBoard() {
  for (let i = 0; i < 9; i++) {
    if (i % 3 === 0 && i !== 0) {
      console.log(); // Move to the next line after every 3 cells
    }
    process.stdout.write(`${board[i]} `); // Print the cell value without a new line
  }
  console.log(); // Add a final new line after the board is printed
}

/**
 * Checks if there's a winner.
 * @returns {boolean} true if there's a winner, otherwise false.
 */
export function checkWinner(board) {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // columns
    [0, 4, 8],
    [2, 4, 6], // diagonals
  ];
  return winningCombinations.some(
    ([a, b, c]) =>
      board[a] === board[b] && board[b] === board[c] && board[a] !== "[ ]",
  );
}

function switchPlayer(n) {
  if (n == 0) {
    return 1;
  } else if (n == 1) {
    return 0;
  } else console.error("the player index is not 1 or 0");
}

async function gameLoop() {
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
}

if (import.meta.url === new URL(process.argv[1], import.meta.url).href) {
  gameLoop();
}
