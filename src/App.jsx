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

function Board({ step, squares, onPlay }) {
  const winner = calculateWinner(squares);
  let status;

  if (winner) {
    status = `Winner is: ${winner}`;
  } else {
    status = `Next Player is: ${step ? "X" : "O"}`;
  }

  function handleClick(i) {
    const nextSquares = squares.slice();
    if (squares[i] || winner) {
      return;
    }
    if (step) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }
  return (
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
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [step, setStep] = useState(true);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setStep(!step);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(move) {
    setCurrentMove(move);
    setStep(move % 2 === 0);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = `Go to the move #${move}`;
    } else {
      description = `Start the Game`;
    }
    return (
      <li key={move}>
        <button
        className="bg-amber-500 p-1 rounded-2xl text-white font-bold cursor-pointer" 
        onClick={() => jumpTo(move)}>
          {description}
          </button>
      </li>
    );
  });
  return (
    <div className="w-2xl mx-auto flex  items-center gap-12 my-32">
      <div>
        <Board step={step} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div>
        <ol className="space-y-1.5">{moves}</ol>
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
