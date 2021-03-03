import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';

const useStyles = makeStyles({
  root: {
    width: 200,
  },
});

export default function ContinuousSlider({ volume, changeVolumeMusic }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography gutterBottom>Volume</Typography>
      <Grid container spacing={2}>
        <Grid item>
          <VolumeDown />
        </Grid>
        <Grid item xs>
          <Slider
            value={volume * 100}
            onChange={(event, newValue) => changeVolumeMusic(newValue)}
            aria-labelledby='continuous-slider'
          />
        </Grid>
        <Grid item>
          <VolumeUp />
        </Grid>
      </Grid>
    </div>
  );
}
