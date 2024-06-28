// components/QuitButton.js
import React from "react";

const QuitButton = ({ currentPlayer, setStatus, setGameOver }) => {
  const handleQuit = () => {
    const winner = currentPlayer === 1 ? 2 : 1;
    setStatus(`Player ${winner} Wins!`);
    setGameOver(true);
  };

  return <button onClick={handleQuit}>Quit Game</button>;
};

export default QuitButton;
