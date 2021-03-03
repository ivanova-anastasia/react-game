import React from 'react';
import './square.css';

const Square = ({ value, icons, onClick }) => {
  let style = `squares`;
  let playerIcon = null;
  if (value) {
    style += ` ${value}`;
    playerIcon = value === 'X' ? icons.x : icons.o;
  }
  return (
    <button className={style} onClick={onClick}>
      {playerIcon}
    </button>
  );
};

export default Square;
