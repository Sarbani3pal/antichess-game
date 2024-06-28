import React from "react";
import Cell from "./Cell";
import "./Board.css";

const Board = ({
  board,
  setBoard,
  selectedPiece,
  setSelectedPiece,
  currentPlayer,
  setCurrentPlayer,
  setStatus,
  gameOver,
  setPlayMoveSound, // Add setPlayMoveSound prop
}) => {
  return (
    <div className="board">
      {board.map((row, rowIndex) =>
        row.map((piece, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            piece={piece}
            row={rowIndex}
            col={colIndex}
            selectedPiece={selectedPiece}
            setSelectedPiece={setSelectedPiece}
            board={board}
            setBoard={setBoard}
            currentPlayer={currentPlayer}
            setCurrentPlayer={setCurrentPlayer}
            setStatus={setStatus}
            gameOver={gameOver}
            setPlayMoveSound={setPlayMoveSound} // Pass setPlayMoveSound to Cell
          />
        ))
      )}
    </div>
  );
};

export default Board;
