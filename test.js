import { checkWinner } from "./index.js";

// Function to display the board
function displayBoard(board) {
  console.log(`
    ${board[0]} ${board[1]} ${board[2]}
    ${board[3]} ${board[4]} ${board[5]}
    ${board[6]} ${board[7]} ${board[8]}
  `);
}

// Function to run tests
function runTests(testCases) {
  testCases.forEach(({ board, expected }, index) => {
    const result = checkWinner(board);
    console.log(`Test Case ${index + 1}:`);
    displayBoard(board); // Display the board
    console.log(`Expected: ${expected}, Got: ${result}`);
    console.log(result === expected ? "✅ Passed" : "❌ Failed");
    console.log();
  });
}
// Example test cases
const testCases = [
  {
    board: ["[x]", "[x]", "[x]", "[ ]", "[ ]", "[ ]", "[ ]", "[ ]", "[ ]"],
    expected: true,
  }, // Row win
  {
    board: ["[o]", "[ ]", "[ ]", "[o]", "[ ]", "[ ]", "[o]", "[ ]", "[ ]"],
    expected: true,
  }, // Column win
  {
    board: ["[x]", "[o]", "[x]", "[o]", "[x]", "[o]", "[o]", "[x]", "[o]"],
    expected: false,
  }, // Draw
  {
    board: ["[x]", "[ ]", "[o]", "[ ]", "[x]", "[ ]", "[o]", "[ ]", "[x]"],
    expected: true,
  }, // Diagonal win
];

// Run the tests once instead of five times
runTests(testCases);

// function generateTestCases(numCases) {
//   const testCases = [];
//
//   for (let i = 0; i < numCases; i++) {
//     const board = Array(9).fill("[ ]");
//     let moves = Math.floor(Math.random() * 9) + 1; // Random number of moves
//     let currentPlayer = Math.random() < 0.5 ? "[x]" : "[o]";
//
//     for (let j = 0; j < moves; j++) {
//       let pos;
//       do {
//         pos = Math.floor(Math.random() * 9);
//       } while (board[pos] !== "[ ]");
//
//       board[pos] = currentPlayer;
//       currentPlayer = currentPlayer === "[x]" ? "[o]" : "[x]";
//     }
//
//     const expected = checkWinner(board);
//     testCases.push({ board, expected });
//   }
//
//   return testCases;
// }
//
// function runTests(testCases) {
//   let passed = 0;
//
//   testCases.forEach(({ board, expected }, index) => {
//     const result = checkWinner(board);
//     const success = result === expected;
//     console.log(
//       `Test Case ${index + 1}: ${success ? "✅ Passed" : "❌ Failed"}`,
//     );
//
//     if (success) passed++;
//   });
//
//   console.log(`\nTotal Passed: ${passed}/${testCases.length}`);
// }
//
// // Generate and run 1000 test cases
// const testCases = generateTestCases(10000000);
//runTests(testCases);
