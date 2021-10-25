import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import SwitchLabels from './basic-elements/switch';
import ContinuousSlider from './basic-elements/slider';
import SimpleSelect from './basic-elements/select';
import CheckboxLabels from './basic-elements/checkbox';

import './app-settings.css';

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
          <Typography component={'span'}>{children}</Typography>
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
    height: 270,
    width: 410,
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
  xIsFirst,
  changeFirstPlayerState,
  iconView,
  xSelects,
  oSelects,
  changeXIconView,
  changeOIconView,
  changeStepsBlockIsShowingState,
  stepsBlockIsShowing,
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
          <Tab label='Customizations' {...a11yProps(2)} />
          <Tab label='Hotkeys' {...a11yProps(3)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <SwitchLabels
            changeState={changeSoundsState}
            value={sounds.isPlay}
            labelText='off/on'
          />
          <ContinuousSlider
            volume={sounds.volume}
            changeVolumeMusic={changeVolumeSounds}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <SwitchLabels
            changeState={changeMusicState}
            value={music.isPlay}
            labelText='off/on'
          />
          <ContinuousSlider
            volume={music.volume}
            changeVolumeMusic={changeVolumeMusic}
          />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Typography gutterBottom>Who is first?</Typography>
          <SwitchLabels
            changeState={changeFirstPlayerState}
            value={xIsFirst}
            labelText='y/x'
          />
          <SimpleSelect
            items={xSelects}
            value={xSelects.find((item) => item.key === iconView.x.key)}
            changeXIconView={changeXIconView}
            title='X player'
          ></SimpleSelect>
          <SimpleSelect
            items={oSelects}
            value={oSelects.find((item) => item.key === iconView.o.key)}
            changeXIconView={changeOIconView}
            title='Y player'
          ></SimpleSelect>
          <CheckboxLabels
            title='Show steps'
            isChecked={stepsBlockIsShowing}
            changeState={changeStepsBlockIsShowingState}
          />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <p>You can use keyboard keys: </p>
          <p>1-9 as a playing board </p>
          <p>Enter - start of a new game</p>
        </TabPanel>
      </div>
    </div>
  );
}
