import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './history.css';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#d9b08c',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(step, player, time) {
  return { step, player, time };
}

export default function CustomizedTables({
  history,
  stepsBlockIsShowing,
  cellNames,
  rowNumber
}) {
  const rows = history.map((_step, move) => {
    return move ? createData(move, _step.playerName, _step.time) : null;
  });
  rows.shift();

    const tableBody = new Array(rowNumber).fill().map((row, i) => {
     const unavailableStepClass = rows[i] ? null : 'history-row-hidden';
      return (<StyledTableRow key={i} className={unavailableStepClass}>
        <StyledTableCell component='th' scope='row'>
        {i + 1}
      </StyledTableCell>
      <StyledTableCell align='right'>{rows[i] ? rows[i].player : null}</StyledTableCell>
      <StyledTableCell align='right'>{rows[i] ? rows[i].time : null}</StyledTableCell>
        </StyledTableRow>)
    });

  const tableHead = cellNames.map((row, index) => {
    return (
      <StyledTableCell key={index} align='right'>
        {row}
      </StyledTableCell>
    );
  });

  return (
    <div
      className={`history-table-wrapper ${
        stepsBlockIsShowing ? null : 'history-table-hidden'
      }`}
    >
      <TableContainer className='history' component={Paper}>
        <Table aria-label='customized table'>
          <TableHead>
            <TableRow>
              {tableHead}
            </TableRow>
          </TableHead>
          <TableBody>{tableBody}</TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
