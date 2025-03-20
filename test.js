import inquirer from "inquirer";
import { checkWinner } from "./index.js";

async function getUserInput(moveFromArgs = null) {
  if (moveFromArgs) return moveFromArgs; // Skip prompt if test argument provided

  const answer = await inquirer.prompt([
    {
      type: "input",
      name: "move",
      message: "Pick a number between 1-9:",
    },
  ]);
  return answer.move;
}

function runTests(testCases) {
  testCases.forEach(({ board, expected }, index) => {
    const result = checkWinner(board);
    console.log(`Test Case ${index + 1}:`);
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

// Handle SIGINT (Ctrl+C) gracefully
process.on("SIGINT", () => {
  console.log("\nProcess interrupted. Exiting gracefully...");
  process.exit(0);
});

// Run tests if executed in CI (GitHub Actions)
if (process.env.CI) {
  console.log("Running tests in GitHub Actions...");
  runTests(testCases);
} else {
  // Otherwise, run tests and allow user interaction
  (async () => {
    runTests(testCases);
    try {
      const move = await getUserInput();
      console.log(`You entered: ${move}`);
    } catch (error) {
      console.log("Input process interrupted. Exiting...");
    }
  })();
}

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
