import { board } from "./index.js";

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

export function switchPlayer(n) {
  if (n == 0) {
    return 1;
  } else if (n == 1) {
    return 0;
  } else console.error("the player index is not 1 or 0");
}
