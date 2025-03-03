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

  const winner = calculateWinner(squares);
  let status;

  if (winner) {
    status = `Winner is: ${winner}`;
  } else {
    status = `Next Player is: ${step? "X": "O"}`;
  }

  function handleClick(i) {
    const nextSquares = squares.slice();
    if (squares[i]) {
      return;
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
    <div className="flex justify-between">
      <div>
        <div>
          <p>{status}</p>
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
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
