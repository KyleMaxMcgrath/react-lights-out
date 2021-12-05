import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    for(let i = 0; i < nrows; i++) {
      let row = Array.from({length: 3});
      if(chanceLightStartsOn)
        row = row.map((c) => (Math.random()>0.5 ? true : false));
      initialBoard.push(row);
    }
    // TODO: create array-of-arrays of true/false values
    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    let won = true;
    for(let y = 0; y < board.length; y++)
      for(let x = 0; x < board[y].length; x++)
        won = won && !board[y][x]
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      let newBoard = [...oldBoard];

      // TODO: in the copy, flip this cell and the cells around it
      if(x-1 >= 0)
        flipCell(y, x-1, newBoard);
      if(x+1 < ncols)
        flipCell(y, x+1, newBoard);
      if(y-1 >= 0)
        flipCell(y-1, x, newBoard);
      if(y+1 < nrows)
        flipCell(y+1, x, newBoard);

      // TODO: return the copy

      return newBoard;
    });
    if(hasWon())
      setBoard([]);
  }

  // if the game is won, just show a winning msg & render nothing else

  // TODO

  // make table board
  if(hasWon())
    alert("You Won!");
  return (
    <table className="Board">
      {board.map( (row, i) => {
        return (
        <tr>
          {row.map(
            (cell, j) => {
              return (
                <Cell data-testid={`${i}-${j}`} flipCellsAroundMe={() => {flipCellsAround(i+"-"+j)}} isLit={cell}/>
              );
            }
          )}
        </tr>)
      })}
    </table>
  )

  // TODO
}

export default Board;
