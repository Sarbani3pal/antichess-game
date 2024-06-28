export const pieceSymbols = {
  r: "♜",
  n: "♞",
  b: "♝",
  q: "♛",
  k: "♚",
  p: "♟",
  R: "♖",
  N: "♘",
  B: "♗",
  Q: "♕",
  K: "♔",
  P: "♙",
};

export const initialBoard = [
  ["r", "n", "b", "q", "k", "b", "n", "r"],
  ["p", "p", "p", "p", "p", "p", "p", "p"],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  ["P", "P", "P", "P", "P", "P", "P", "P"],
  ["R", "N", "B", "Q", "K", "B", "N", "R"],
];

export const isCurrentPlayerPiece = (piece, currentPlayer) => {
  return (
    (currentPlayer === 1 && piece === piece.toUpperCase()) ||
    (currentPlayer === 2 && piece === piece.toLowerCase())
  );
};

export const isValidMove = (
  startRow,
  startCol,
  endRow,
  endCol,
  board,
  currentPlayer
) => {
  const piece = board[startRow][startCol].toLowerCase();
  const dx = endCol - startCol;
  const dy = endRow - startRow;

  // Mandatory capture rule
  if (
    board[endRow][endCol] &&
    isCurrentPlayerPiece(board[endRow][endCol], currentPlayer)
  ) {
    return false;
  }

  // Pawn moves
  if (piece === "p") {
    if (currentPlayer === 1) {
      if (dx === 0 && dy === -1 && !board[endRow][endCol]) {
        return true;
      }
      if (
        startRow === 6 &&
        dx === 0 &&
        dy === -2 &&
        !board[endRow][endCol] &&
        !board[endRow + 1][endCol]
      ) {
        return true;
      }
      if (
        Math.abs(dx) === 1 &&
        dy === -1 &&
        board[endRow][endCol] &&
        !isCurrentPlayerPiece(board[endRow][endCol], currentPlayer)
      ) {
        return true;
      }
    } else {
      if (dx === 0 && dy === 1 && !board[endRow][endCol]) {
        return true;
      }
      if (
        startRow === 1 &&
        dx === 0 &&
        dy === 2 &&
        !board[endRow][endCol] &&
        !board[endRow - 1][endCol]
      ) {
        return true;
      }
      if (
        Math.abs(dx) === 1 &&
        dy === 1 &&
        board[endRow][endCol] &&
        !isCurrentPlayerPiece(board[endRow][endCol], currentPlayer)
      ) {
        return true;
      }
    }
  }

  // Other piece moves (excluding king and castling)
  switch (piece) {
    case "r": // Rook
      if (dx === 0 || dy === 0) {
        if (clearPath(startRow, startCol, endRow, endCol, board)) {
          return true;
        }
      }
      break;
    case "n": // Knight
      if (
        (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
        (Math.abs(dx) === 1 && Math.abs(dy) === 2)
      ) {
        return true;
      }
      break;
    case "b": // Bishop
      if (Math.abs(dx) === Math.abs(dy)) {
        if (clearPath(startRow, startCol, endRow, endCol, board)) {
          return true;
        }
      }
      break;
    case "q": // Queen
      if (dx === 0 || dy === 0 || Math.abs(dx) === Math.abs(dy)) {
        if (clearPath(startRow, startCol, endRow, endCol, board)) {
          return true;
        }
      }
      break;
    case "k": // King (excluding castling)
      if (Math.abs(dx) <= 1 && Math.abs(dy) <= 1) {
        return true;
      }
      break;
    default:
      return false;
  }
  return false;
};

const clearPath = (startRow, startCol, endRow, endCol, board) => {
  const dx = Math.sign(endCol - startCol);
  const dy = Math.sign(endRow - startRow);
  let x = startCol + dx;
  let y = startRow + dy;

  while (x !== endCol || y !== endRow) {
    if (board[y][x]) {
      return false;
    }
    x += dx;
    y += dy;
  }
  return true;
};

export const movePiece = (
  startRow,
  startCol,
  endRow,
  endCol,
  board,
  setBoard,
  setSelectedPiece,
  setCurrentPlayer,
  setStatus
) => {
  const newBoard = board.map((row) => row.slice());
  newBoard[endRow][endCol] = newBoard[startRow][startCol];
  newBoard[startRow][startCol] = null;

  // Handle pawn promotion
  if (
    newBoard[endRow][endCol].toLowerCase() === "p" &&
    (endRow === 0 || endRow === 7)
  ) {
    newBoard[endRow][endCol] = newBoard[endRow][endCol] === "p" ? "k" : "K"; // Promote to king
  }

  setBoard(newBoard);
  setSelectedPiece(null);
  setCurrentPlayer((currentPlayer) => (currentPlayer === 1 ? 2 : 1));
};
