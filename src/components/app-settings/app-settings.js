import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import SwitchLabels from './basic-elements/switch';
import ContinuousSlider from './basic-elements/slider';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#d1e8e2',
    color: '#116466',
    display: 'flex',
    height: 224,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default function VerticalTabs({
  changeMusicState,
  music,
  changeVolumeMusic,
  changeSoundsState,
  sounds,
  changeVolumeSounds,
}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className='settings-wrapper'>
      <div className={classes.root}>
        <Tabs
          orientation='vertical'
          variant='scrollable'
          value={value}
          onChange={handleChange}
          aria-label='Vertical tabs example'
          className={classes.tabs}
        >
          <Tab label='Sounds' {...a11yProps(0)} />
          <Tab label='Music' {...a11yProps(1)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <SwitchLabels
            changeMusicState={changeSoundsState}
            music={sounds.isPlay}
          />
          <ContinuousSlider
            volume={sounds.volume}
            changeVolumeMusic={changeVolumeSounds}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <SwitchLabels
            changeMusicState={changeMusicState}
            music={music.isPlay}
          />
          <ContinuousSlider
            volume={music.volume}
            changeVolumeMusic={changeVolumeMusic}
          />
        </TabPanel>
      </div>
    </div>
  );
}
