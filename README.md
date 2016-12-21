# MONKEYS AND UNICORNS


## DESCRIPTION

Play noughts and crosses but as a monkey and a unicorn!! ^_^ ~~


## HOW TO PLAY

- Two player game. Players choose either to be a monkey or a unicorn. The monkey starts first.
- Click on the 3x3 grid and put your marker down where you want.
- Players alternate in turns.
- To win, get three of your markers in a row, either vertical, horizontal or diagonal.
- Scores will be added onto the score board at the end of each game. To play another game click on the "Play Again" button.
- If you want to reset the scores, click on the "Reset scores" button.
-To turn off music, press the red music logo on the top right hand corner.


## GAME LOGIC

- Structured in a table in a HTML document.
- If a cell is clicked on, a marker is placed into the table cell (by adding an image to the table cell) depending on which player's turn it is.
- The cell will also be given a "clicked" class so that it cannot be clicked on more than once
- To find out who won, arrays of possible win combinations were compared to the boxes that have already been clicked on by the players. If a combination was found, then a winner will be called.
- To reset the board, all classes are removed from the table cells and the values of the global variables were reset.


## CONTACT

Jess: kryx11@gmail.com
[Link to Game](https://jess11.github.io//project0/tictactoe.html)
