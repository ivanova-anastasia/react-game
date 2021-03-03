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

export default function CustomizedTables({ history, stepsBlockIsShowing }) {
  const rows = history.map((_step, move) => {
    return move ? createData(move, _step.playerName, _step.time) : null;
  });
  rows.shift();

  const tableBody = rows
    ? rows.map((row, i) => (
        <StyledTableRow key={i}>
          <StyledTableCell component='th' scope='row'>
            {row.step}
          </StyledTableCell>
          <StyledTableCell align='right'>{row.player}</StyledTableCell>
          <StyledTableCell align='right'>{row.time}</StyledTableCell>
        </StyledTableRow>
      ))
    : null;

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
              <StyledTableCell>Step №</StyledTableCell>
              <StyledTableCell align='right'>Player</StyledTableCell>
              <StyledTableCell align='right'>Time</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>{tableBody}</TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
