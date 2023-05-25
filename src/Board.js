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

function Board({ nrows = 3, ncols = 3, chanceLightStartsOn = 0.25 }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  //TODO: update docstring to return board
  function createBoard() {
    let initialBoard = [];
    // TODO: create array-of-arrays of true/false values
    // DONE
    for (let y = 0; y < nrows; y++) {
      let row = [];
      for (let x = 0; x < ncols; x++) {
        //TODO: row.push the forced boolean
        // row.push(Math.random() > chanceLightStartsOn)
        if (Math.random() < chanceLightStartsOn) {
          row.push(true);
        } else {
          row.push(false);
        }
      }
      initialBoard.push(row);
    }

    return initialBoard;
  }

  /** Check if there are any true values in the matrix ; return boolean */
  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    // DONE
    return !board.some(row => row.some(cell => cell === true));
    // return board.every(row => row.every(cell => cell === false));
  }

  /** Make a deep copy of the board and toggle cell and the cells around it */
  function flipCellsAround(evt, coord) {
    console.log("evt", evt);
    setBoard((oldBoard) => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      // DONE
      const boardCopy = oldBoard.map(row => [...row]);

      // TODO: in the copy, flip this cell and the cells around it
      // DONE

      // call flipCell with given coords
      flipCell(y, x, boardCopy);

      // call it again, with neighbor coords
      flipCell((y + 1), x, boardCopy);
      flipCell(y, (x + 1), boardCopy);
      flipCell((y - 1), x, boardCopy);
      flipCell(y, (x - 1), boardCopy);

      // TODO: return the copy
      // DONE
      return boardCopy;
    });
  }

  //TODO: if the game is won, just show a winning msg & render nothing else
  // DONE
  if (hasWon() === true) {
    return (
      <div className="You-won">
        <h3>You won!</h3>
      </div>
    );
  }

  //TODO: make table board
  // DONE
  return (
    <table className="Game-board">
      <tbody>
      {
        board.map((r, y) =>
          <tr key={y}>
            {r.map((c, x) =>
            <Cell
              key={[y, x]}
              flipCellsAroundMe={(evt) => flipCellsAround(evt, `${y}-${x}`)}
              isLit={c} />)}</tr>)
      }
      </tbody>
    </table>
  );

}

export default Board;
