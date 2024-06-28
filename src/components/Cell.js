import React from "react";
import {
  pieceSymbols,
  isCurrentPlayerPiece,
  isValidMove,
  movePiece,
} from "../utils/boardUtils";
import "./Cell.css";

const Cell = ({
  piece,
  row,
  col,
  selectedPiece,
  setSelectedPiece,
  board,
  setBoard,
  currentPlayer,
  setCurrentPlayer,
  setStatus,
  gameOver,
  setPlayMoveSound, // Add setPlayMoveSound prop
}) => {
  const handleClick = () => {
    if (gameOver) return;

    if (selectedPiece) {
      if (
        isValidMove(
          selectedPiece.row,
          selectedPiece.col,
          row,
          col,
          board,
          currentPlayer
        )
      ) {
        movePiece(
          selectedPiece.row,
          selectedPiece.col,
          row,
          col,
          board,
          setBoard,
          setSelectedPiece,
          setCurrentPlayer,
          setStatus
        );
        setStatus(`Player ${currentPlayer === 1 ? 2 : 1}'s Turn`);
        setPlayMoveSound(true); // Play move sound
      } else {
        alert("Invalid move!Enter a valid move");
      }
    } else {
      if (piece && isCurrentPlayerPiece(piece, currentPlayer)) {
        setSelectedPiece({ row, col });
      }
    }
  };

  return (
    <div
      className={`cell ${(row + col) % 2 === 0 ? "light" : "dark"}`}
      onClick={handleClick}
    >
      {pieceSymbols[piece]}
    </div>
  );
};

export default Cell;
