import React, { useState } from "react";
import "./App.css";
import Board from "./components/Board";
import ScoreBoard from "./components/ScoreBoard";
import ResetButton from "./components/ResetButton";

const App = () => {
  const win_cond = [
    [0, 1, 2],
    [0, 3, 6],
    [6, 7, 8],
    [2, 5, 8],
    [1, 4, 7],
    [3, 4, 5],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const [board, setBoard] = useState(Array(9).fill(null));
  const [xPlaying, setXPlaying] = useState(true);
  const [scores, setScores] = useState({ xScore: 0, oScore: 0 });
  const [gameOver, setGameOver] = useState(false);
  //const [count, setCount] = useState(1)

  const handleBoxClick = (boxInd) => {
    //boxInd is the index being clicked

    const updatedBoard = board.map((val, ind) => {
      if (ind === boxInd) {
        return xPlaying === true ? "X" : "O";
        //return count%2!==0 ? "X" : "O";
      }
      return val;
    });

    const winner = checkWinner(updatedBoard);

    if (winner) {
      if (winner === "O") {
        let { oScore } = scores;
        oScore += 1;
        setScores({ ...scores, oScore });
      } else {
        let { xScore } = scores;
        xScore += 1;
        setScores({ ...scores, xScore });
      }
    }

    //console.log(scores)

    setBoard(updatedBoard);
    setXPlaying(!xPlaying);
    //setCount(count + 1);
  };

  const checkWinner = (updatedBoard) => {
    for (let i = 0; i < win_cond.length; i++) {
      const [x, y, z] = win_cond[i]; //012

      if (
        updatedBoard[x] &&
        updatedBoard[x] === updatedBoard[y] &&
        updatedBoard[y] === updatedBoard[z]
      ) {
        //three x's or o's

        setGameOver(true);
        return updatedBoard[x];
      }
    }
  };

  //const winningIndices = checkWinner(board) ? win_cond.find(([x, y, z]) => board[x] === board[y] && board[y] === board[z]) : [];

  const resetBoard = () => {
    setGameOver(false);
    setBoard(Array(9).fill(null));
  };

  return (
    <div className="App">
      <ScoreBoard scores={scores} xPlaying={xPlaying} />
      <Board board={board} onClick={gameOver ? resetBoard : handleBoxClick} />
      <ResetButton resetBoard={resetBoard} />
    </div>
  );
};

export default App;
