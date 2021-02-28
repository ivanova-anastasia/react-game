import React, { useState } from 'react';
import { calculateWinner } from '../../winner';
import Board from '../board/board';
import CustomizedTables from './../history/history';
import './app.css';

const App = () => {
  const [history, setHistory] = useState([
    { layerName: null, boardState: Array(9).fill(null) },
  ]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXisNext] = useState(true);
  const winner = calculateWinner(history[stepNumber].boardState);
  const xO = xIsNext ? 'X' : 'O';

  const handleClick = (i) => {
    const historyPoint = history.slice(0, stepNumber + 1);
    const current = historyPoint[stepNumber];
    const squares = [...current.boardState];
    if (winner || squares[i]) return;
    squares[i] = xO;
    const historyItem = {
      playerName: xO,
      boardState: squares,
      time: new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1'),
    };
    setHistory([...historyPoint, historyItem]);
    setStepNumber(historyPoint.length);
    setXisNext(!xIsNext);
  };

  return (
    <>
      <h3 className='current-player-info'>
        {winner ? 'Winner: ' + winner : 'Turn ' + xO}
      </h3>
      <div className='game-wrapper'>
        <Board squares={history[stepNumber].boardState} onClick={handleClick} />
        <CustomizedTables history={history} />
      </div>
    </>
  );
};

export default App;
