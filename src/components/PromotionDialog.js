import React from "react";

const PromotionDialog = ({ promotionPosition, handlePromotionChoice }) => {
  const handlePromotion = (piece) => {
    handlePromotionChoice(piece);
  };

  return (
    <div className="promotion-dialog">
      <h2>Choose a piece to promote to:</h2>
      <div className="promotion-options">
        <button onClick={() => handlePromotion("Q")}>Queen (Q)</button>
        <button onClick={() => handlePromotion("K")}>King (K)</button>
        <button onClick={() => handlePromotion("R")}>Rook (R)</button>
        <button onClick={() => handlePromotion("B")}>Bishop (B)</button>
        <button onClick={() => handlePromotion("N")}>Knight (N)</button>
      </div>
    </div>
  );
};

export default PromotionDialog;
