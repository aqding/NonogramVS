import React, { useState } from "react";
import "./Board.css";
import { Tile } from "./Tile";

export const enum SPACE {
  EMPTY,
  FILLED,
  X,
}

export type boardProps = {
  width: number;
  height: number;
  rowHints: Array<Array<number>>;
  colHints: Array<Array<number>>;
};

/**
 * Functional component for a Board that can play a Nonogram
 *
 * @param props — the props for the Board component
 * @returns a Board component
 */
const Board = (props: boardProps) => {
  const [board, setBoard] = useState(
    new Array(props.height)
      .fill(0)
      .map(() => new Array(props.width).fill(SPACE.EMPTY))
  );
  const [mouseDown, setMouseDown] = useState(false);
  const [currentFill, setCurrentFill] = useState(SPACE.FILLED);
  const [deleteFill, setDeleteFill] = useState(false);

  /**
   * Update a spot on the Board at row row and column col
   * to a given value.
   *
   * @param row — the row of the board
   * @param col — the column of the board
   * @param value  — the value to set on the board
   */
  function handleBoardUpdate(row: number, col: number, value: number) {
    const boardCopy: Array<Array<SPACE>> = board.map((row) => [...row]);
    boardCopy[row][col] = value;
    setBoard(boardCopy);
  }

  /**
   * Handle a mouse down on the board by updating a spot on the board
   * to the appropriate value
   *
   * @param row — the row of the board
   * @param col — the column of the board
   */
  function handleMouseDown(row: number, col: number) {
    const value = board[row][col] === currentFill ? SPACE.EMPTY : currentFill;
    setDeleteFill(board[row][col] === currentFill);
    handleBoardUpdate(row, col, value);
  }

  /**
   * Handle a mouse enter on the board (a drag) by updating a spot
   * on the board to the appropriate value
   *
   * @param row — the row of the board
   * @param col — the column of the board
   */
  function handleMouseEnter(row: number, col: number) {
    if (mouseDown) {
      const value = deleteFill ? SPACE.EMPTY : currentFill;
      handleBoardUpdate(row, col, value);
    }
  }

  /**
   * Changes the currentFill between SPACE.FILLED and SPACE.X
   */
  function handleFillChange() {
    if (currentFill === SPACE.FILLED) setCurrentFill(SPACE.X);
    else setCurrentFill(SPACE.FILLED);
  }

  return (
    <div>
      <div
        className="board"
        onMouseDown={() => setMouseDown(true)}
        onMouseUp={() => setMouseDown(false)}
        style={{
          gridTemplateColumns: `100px repeat(${props.width}, 30px)`,
          gridTemplateRows: `100px repeat(${props.height}, 30px)`,
          width: `${props.width * 30 + 100}px`,
          height: `${props.height * 30 + 100}px`,
        }}
      >
        {board.map((row, rowNumber) => {
          return row.map((value, colNumber) => (
            <div
              className={
                `box` +
                (colNumber % 5 === 4 ? " borderRight" : "") +
                (colNumber % 5 === 0 ? " borderLeft" : "") +
                (rowNumber % 5 === 4 ? " borderBottom" : "") +
                (rowNumber % 5 === 0 ? " borderTop" : "")
              }
              style={{
                gridArea: `${2 + rowNumber} / ${2 + colNumber}`,
              }}
              key={`${rowNumber}` + `${colNumber}`}
              onMouseEnter={() => handleMouseEnter(rowNumber, colNumber)}
              onMouseDown={() => {
                handleMouseDown(rowNumber, colNumber);
              }}
            >
              <Tile value={value} />
            </div>
          ));
        })}
        {props.rowHints.map((values, rowNumber) => {
          return (
            <div
              className="valueBoxLeft"
              style={{
                gridArea: `${2 + rowNumber}`,
                borderTopWidth: `${rowNumber % 5 === 0 ? "2px" : "1px"}`,
              }}
            >
              {values.map((value) => (
                <div>{value}</div>
              ))}
            </div>
          );
        })}
        {props.colHints.map((values, colNumber) => {
          return (
            <div
              className="valueBoxTop"
              style={{
                gridArea: `1 / ${2 + colNumber}`,
                borderLeftWidth: `${colNumber % 5 === 0 ? "2px" : "1px"}`,
              }}
            >
              {values.map((value) => (
                <div>{value}</div>
              ))}
            </div>
          );
        })}
      </div>
      <button onClick={handleFillChange}>
        {currentFill === SPACE.FILLED ? "X Tool" : "Fill Tool"}
      </button>
    </div>
  );
};

export { Board };
