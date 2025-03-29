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
  ]
  return winningCombinations.some(
    ([a, b, c]) =>
      board[a] === board[b] && board[b] === board[c] && board[a] !== '[ ]',
  )
}
