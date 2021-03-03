import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import GitHubIcon from '@material-ui/icons/GitHub';
import './footer.css';
import { ReactComponent as RsSchool } from './rs_school_js.svg';

const useStyles = makeStyles((theme) => ({
  appBar: {
    top: 'auto',
    bottom: 0,
    backgroundColor: '#d9b08c',
  },
  grow: {
    flexGrow: 1,
  },
}));

export default function Footer() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar>
          <div className={classes.grow} />
          <p className='app-year'>2021</p>
          <IconButton
            color='inherit'
            onClick={() => window.open('https://github.com/ivanova-anastasia')}
          >
            <GitHubIcon />
          </IconButton>
          <a href='https://rs.school/js/'>
            <RsSchool className='rs-icon'></RsSchool>
          </a>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </React.Fragment>
  );
}
