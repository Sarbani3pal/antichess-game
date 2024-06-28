import React, { useState, useEffect } from "react";
import Board from "./components/Board";
import StatusDisplay from "./components/StatusDisplay";
import QuitButton from "./components/QuitButton";
import Sound from "react-sound";
import applauseSound from "./sounds/applause.mp3";
import bloopersSound from "./sounds/bloopers.mp3";
import moveSound from "./sounds/moveSound.mp3"; // Import move sound
import { initialBoard } from "./utils/boardUtils";
import "./App.css";

const App = () => {
  const [board, setBoard] = useState(initialBoard);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [status, setStatus] = useState("Player 1's Turn");
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [playMoveSound, setPlayMoveSound] = useState(false);

  useEffect(() => {
    if (playMoveSound) {
      const sound = new Audio(moveSound);
      sound.play();
      setPlayMoveSound(false); // Reset the play sound flag
    }
  }, [playMoveSound]);

  const resetGame = () => {
    setBoard(initialBoard);
    setSelectedPiece(null);
    setCurrentPlayer(1);
    setStatus("Player 1's Turn");
    setGameOver(false);
    setWinner(null);
  };

  const handleQuit = () => {
    const winner = currentPlayer === 1 ? 2 : 1;
    setStatus(`Player ${winner} Wins!`);
    setGameOver(true);
    setWinner(winner);
  };

  return (
    <div className="app">
      <h1>AntiChess Game</h1>
      <Board
        board={board}
        setBoard={setBoard}
        selectedPiece={selectedPiece}
        setSelectedPiece={setSelectedPiece}
        currentPlayer={currentPlayer}
        setCurrentPlayer={setCurrentPlayer}
        setStatus={setStatus}
        gameOver={gameOver}
        setPlayMoveSound={setPlayMoveSound} // Pass the play sound function to Board
      />
      <StatusDisplay status={status} />
      <QuitButton
        currentPlayer={currentPlayer}
        setStatus={setStatus}
        setGameOver={setGameOver}
        handleQuit={handleQuit}
      />
      {gameOver && (
        <div className="popup">
          <div className="popup-content">
            <h2>{status}</h2>
            <button onClick={resetGame}>Reset Game</button>
          </div>
        </div>
      )}
      {winner && (
        <Sound url={applauseSound} playStatus={Sound.status.PLAYING} />
      )}
      {gameOver && !winner && (
        <Sound url={applauseSound} playStatus={Sound.status.PLAYING} />
      )}
    </div>
  );
};

export default App;
