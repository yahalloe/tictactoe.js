im trying to code a tic tac toe from scratch and I did the printboard and then needed the help of ai for the js syntax at the end and for the testing and github actions

# documentation 
- 1 dimentional array
  - instead of using a matrix board[][] i used board [] and initalized it with "[ ]"
- the checkWinner function is made via JS syntactic sugar ofcourse. Instead of the traditional looping throught the array and checking, just use the method in JS directly to do that and just declare the winning state prior and let the looping check that.
- we are using inquierer.js for the user input, best library in JS so far. At first I was about to drop the project because how awful to read user input.
- and for the player switching, its easy, just use a array that has [x] or [o] then reveres the index to 1 to 0 or vice versa so you get alternating patterns.
so in the checkWinner function, it just checks if they have the same values to determine the winner.

for the test, it just tests the checkWinner function, it has 4 case tests and it auto runs in push command in github actions too.
we are also using npm and node for this one.
i love the way i type `npm run dev` or `npm test` to run the file. Feels so goood!
