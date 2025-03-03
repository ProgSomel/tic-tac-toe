import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button
      onClick={onSquareClick}
      className="bg-white border border-gray-400 h-12 w-12 m-1 leading-9 text-lg"
    >
      {value}
    </button>
  );
}
export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [step, setStep] = useState(true);

  function handleClick(i) {
    const nextSquares = squares.slice();
    if (squares[i]) {
      return false;
    }
    if (step) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setSquares(nextSquares);
    setStep(!step);
  }
  return (
    <>
      <div>
        <p>Turn for: {step ? "X" : "O"}</p>
      </div>
      <div className="flex">
        <Square onSquareClick={() => handleClick(0)} value={squares[0]} />
        <Square onSquareClick={() => handleClick(1)} value={squares[1]} />
        <Square onSquareClick={() => handleClick(2)} value={squares[2]} />
      </div>

      <div className="flex">
        <Square onSquareClick={() => handleClick(3)} value={squares[3]} />
        <Square onSquareClick={() => handleClick(4)} value={squares[4]} />
        <Square onSquareClick={() => handleClick(5)} value={squares[5]} />
      </div>
      <div className="flex">
        <Square onSquareClick={() => handleClick(6)} value={squares[6]} />
        <Square onSquareClick={() => handleClick(7)} value={squares[7]} />
        <Square onSquareClick={() => handleClick(8)} value={squares[8]} />
      </div>
    </>
  );
}
