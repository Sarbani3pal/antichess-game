// GameContext.js

import React, { createContext, useState, useContext } from "react";

const GameContext = createContext();

export const useGameContext = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  const [currentPlayer, setCurrentPlayer] = useState(1); // Initial player is 1

  return (
    <GameContext.Provider value={{ currentPlayer, setCurrentPlayer }}>
      {children}
    </GameContext.Provider>
  );
};
