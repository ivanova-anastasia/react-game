import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import FiberNewIcon from '@material-ui/icons/FiberNew';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      position: 'fixed',
      bottom: '10%',
      width: 'fit-content;',
      height: 'fit-content;',
      color: '#d1e8e2',
      'background-color': '#d9b08c',
      right: '10vw',
    },
  },

  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function FloatingActionButtons({ onClick }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Fab
        position='center-bottom'
        slot='fixed'
        size='medium'
        onClick={onClick}
      >
        <FiberNewIcon
          style={{ width: '10vh', height: 'inherit', padding: '15%' }}
        />
      </Fab>
    </div>
  );
}
