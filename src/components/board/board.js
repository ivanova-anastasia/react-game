import React from 'react';
import Square from '../square/square';
import './board.css';

const Board = ({ squares, icons, onClick }) => (
  <div className='board'>
    {squares.map((square, i) => (
      <Square
        key={i}
        value={square}
        icons={icons}
        onClick={() => onClick(i)}
      ></Square>
    ))}
  </div>
);

export default Board;
