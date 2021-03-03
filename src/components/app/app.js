import React, { useState } from 'react';
import { calculateWinner } from '../../winner';
import Board from '../board/board';
import CustomizedTables from './../history/history';
import Footer from './../footer/footer';
import FloatingBtn from './../floating-btn/floating-btn';
import CustomizedSnackbars from './../snackbar/snackbar';
import VerticalTabs from './../app-settings/app-settings';
import CustomizedDialogs from './../app-settings/settings-dialog';
import {
  stepAudio,
  winAudio,
  backgroundAudio,
  playSound,
  playMusic,
  stopMusic,
  setVolume,
} from '../../helpers/audioHelper';

import {
  Clear,
  ExposureZero,
  Accessibility,
  Adb,
  Apple,
  SportsHandball,
  Tune,
  Equalizer,
} from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';

import './app.css';

const App = () => {
  const ZERO_STEP_NUMBER = 0;

  const WIN_SEVERITY = 'success';
  const START_SEVERITY = 'info';
  const DRAW_SEVERITY = 'warning';

  const WIN_SNACK_BAR_MSG =
    'Small wins are a steady application of a small advantage. Congratulations!';
  const START_SNACK_BAR_MSG = 'The game has started. Welcome!';
  const DRAW_SNACK_BAR_MSG = 'Tie! We are all winners :)';

  const getIconView = (Icon, key) => {
    return <Icon key={key} style={{ fontSize: '100%' }} />;
  };

  const X_VIEWS = [
    getIconView(Clear, 0),
    getIconView(Accessibility, 1),
    getIconView(Adb, 2),
  ];
  const O_VIEWS = [
    getIconView(ExposureZero, 0),
    getIconView(SportsHandball, 1),
    getIconView(Apple, 2),
  ];

  const [iconView, setIconView] = useState({
    x: X_VIEWS[0],
    o: O_VIEWS[0],
  });

  const [severitySnackBar, setSeveritySnackBar] = useState({
    status: false,
    severity: null,
    text: null,
  });

  const [stepsBlockIsShowing, setStepsBlockIsShowing] = useState(true);

  const [settingDialogOpen, setSettingDialogOpen] = useState(false);
  const [recordsDialogOpen, setRecordsDialogOpen] = useState(false);

  const initialHistoryState = [
    { playerName: null, boardState: Array(9).fill(null) },
  ];
  const [history, setHistory] = useState(initialHistoryState);

  const [record, setRecord] = useState([{ playerName: null, time: null }]);

  const [music, setMusic] = useState({
    audio: backgroundAudio,
    volume: 1,
    isPlay: false,
  });

  const [sounds, setSounds] = useState({
    stepAudio: stepAudio,
    winAudio: winAudio,
    volume: 1,
    isPlay: false,
  });

  const [stepNumber, setStepNumber] = useState(ZERO_STEP_NUMBER);
  const [xIsNext, setXisNext] = useState({ value: true, defaultValue: true });
  const winner = calculateWinner(history[stepNumber].boardState);
  const xO = xIsNext.value ? 'X' : 'O';

  const handleClick = (i) => {
    const historyPoint = history.slice(0, stepNumber + 1);
    const current = historyPoint[stepNumber];
    const squares = [...current.boardState];
    if (winner || squares[i]) {
      return;
    }
    squares[i] = xO;
    const historyItem = {
      playerName: xO,
      boardState: squares,
      time: new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1'),
    };
    setHistory([...historyPoint, historyItem]);
    setStepNumber(historyPoint.length);
    setXisNext((prevState) => {
      return { ...prevState, value: !xIsNext.value };
    });
    if (sounds.isPlay) playSound(sounds.stepAudio);
  };

  const startNewGameClick = () => {
    setHistory(initialHistoryState);
    setStepNumber(ZERO_STEP_NUMBER);
    setXisNext((prevState) => {
      return { ...prevState, value: xIsNext.defaultValue };
    });
    checkForUpdateSnackBar(START_SEVERITY);
  };

  const closeSnackBar = () => {
    setSeveritySnackBar({ ...severitySnackBar, status: false });
  };

  const checkForUpdateSnackBar = (status) => {
    switch (status) {
      case WIN_SEVERITY: {
        if (WIN_SEVERITY !== severitySnackBar.severity) {
          if (sounds.isPlay) playSound(sounds.winAudio);
          setSeveritySnackBar({
            severity: WIN_SEVERITY,
            status: true,
            text: WIN_SNACK_BAR_MSG,
          });
          setRecord([
            ...record,
            {
              playerName: history[history.length - 1].playerName,
              time: `${history[1].time} - ${history[history.length - 1].time}`,
            },
          ]);
        }
        break;
      }
      case DRAW_SEVERITY: {
        if (DRAW_SEVERITY !== severitySnackBar.severity) {
          if (sounds.isPlay) playSound(sounds.winAudio);
          setSeveritySnackBar({
            severity: DRAW_SEVERITY,
            status: true,
            text: DRAW_SNACK_BAR_MSG,
          });
          setRecord([
            ...record,
            {
              playerName: 'Tie',
              time: `${history[1].time} - ${history[history.length - 1].time}`,
            },
          ]);
        }
        break;
      }
      case START_SEVERITY: {
        setSeveritySnackBar({
          severity: START_SEVERITY,
          status: true,
          text: START_SNACK_BAR_MSG,
        });
        break;
      }
      default: {
        console.log('Unknown snack bar status: ' + status);
      }
    }
  };

  const getResultMsg = () => {
    let resultMsg;
    if (winner) {
      resultMsg = `Winner: ${history[history.length - 1].playerName}`;
      checkForUpdateSnackBar(WIN_SEVERITY);
    } else if (history.length === 10) {
      resultMsg = `Tie! :)`;
      checkForUpdateSnackBar(DRAW_SEVERITY);
    } else {
      resultMsg = 'Turn ' + xO;
    }
    return resultMsg;
  };

  const changeMusicState = (isPlay) => {
    if (isPlay) {
      playMusic(music.audio);
    } else {
      stopMusic(music.audio);
    }
    setMusic((prevState) => {
      return { ...prevState, isPlay: isPlay };
    });
  };

  const changeSoundsState = (isPlay) => {
    setSounds((prevState) => {
      return { ...prevState, isPlay: isPlay };
    });
  };

  const changeVolumeMusic = (value) => {
    const newVolume = value / 100;
    setVolume(music.audio, newVolume);
    setMusic((prevState) => {
      return { ...prevState, volume: newVolume };
    });
  };

  const changeVolumeSounds = (value) => {
    const newVolume = value / 100;
    setVolume(sounds.stepAudio, newVolume);
    setVolume(sounds.winAudio, newVolume);
    setSounds((prevState) => {
      return { ...prevState, volume: newVolume };
    });
  };

  const changeFirstPlayerState = (value) => {
    const newFirstPlayer = value;
    const currentValue = history.length === 1 ? newFirstPlayer : xIsNext.value;
    setXisNext({ value: currentValue, defaultValue: newFirstPlayer });
  };

  const changeXIconView = (value) => {
    const currentView = value;
    setIconView((prev) => {
      return { ...prev, x: currentView };
    });
  };

  const changeOIconView = (value) => {
    const currentView = value;
    setIconView((prev) => {
      return { ...prev, o: currentView };
    });
  };

  const changeStepsBlockIsShowingState = (value) => {
    setStepsBlockIsShowing(value);
  };

  const handleKeyDown = (event) => {
    switch (event.key) {
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9': {
        handleClick(event.key - 1);
        break;
      }
      case 'Enter': {
        startNewGameClick();
        break;
      }
      default: {
      }
    }
  };

  const handleSettingDialogOpen = () => {
    setSettingDialogOpen(true);
  };
  const handleSettingDialogClose = () => {
    setSettingDialogOpen(false);
  };

  const handleRecordDialogOpen = () => {
    setRecordsDialogOpen(true);
  };
  const handleRecordDialogClose = () => {
    setRecordsDialogOpen(false);
  };

  return (
    <>
      <div className='app-wrapper' onKeyDown={handleKeyDown} tabIndex='0'>
        <div className='app-header'>
          <IconButton
            className='settings-icon'
            color='inherit'
            style={{ marginLeft: '5vw', marginRight: '3vw' }}
            onClick={handleSettingDialogOpen}
          >
            <Tune style={{ width: '8vw', height: 'inherit', padding: '15%' }} />
          </IconButton>
          <IconButton
            className='settings-icon'
            color='inherit'
            style={{ marginLeft: '5vw', marginRight: '20vw' }}
            onClick={handleRecordDialogOpen}
          >
            <Equalizer
              style={{ width: '8vw', height: 'inherit', padding: '15%' }}
            />
          </IconButton>
          <h3 className='current-player-info'>{getResultMsg()}</h3>
        </div>

        <CustomizedDialogs
          handleSettingDialogClose={handleRecordDialogClose}
          settingDialogOpen={recordsDialogOpen}
          title='Records'
          settingsComponent={
            <CustomizedTables
              stepsBlockIsShowing={true}
              history={record}
              cellNames={['№', 'Winner', 'Time period']}
            />
          }
        />

        <CustomizedDialogs
          handleSettingDialogClose={handleSettingDialogClose}
          settingDialogOpen={settingDialogOpen}
          title='Settings'
          settingsComponent={
            <VerticalTabs
              changeMusicState={changeMusicState}
              music={music}
              changeVolumeMusic={changeVolumeMusic}
              changeSoundsState={changeSoundsState}
              sounds={sounds}
              changeVolumeSounds={changeVolumeSounds}
              xIsFirst={xIsNext.defaultValue}
              changeFirstPlayerState={changeFirstPlayerState}
              iconView={iconView}
              changeXIconView={changeXIconView}
              changeOIconView={changeOIconView}
              xSelects={X_VIEWS}
              oSelects={O_VIEWS}
              changeStepsBlockIsShowingState={changeStepsBlockIsShowingState}
              stepsBlockIsShowing={stepsBlockIsShowing}
            />
          }
        />
        <div className='game-wrapper'>
          <Board
            squares={history[stepNumber].boardState}
            icons={iconView}
            onClick={handleClick}
          />
          <CustomizedTables
            stepsBlockIsShowing={stepsBlockIsShowing}
            history={history}
            cellNames={['Step №', 'Player', 'Time']}
          />
        </div>
        <CustomizedSnackbars
          severity={severitySnackBar}
          closeSnackBar={closeSnackBar}
        />
        <FloatingBtn onClick={startNewGameClick} />
        <Footer />
      </div>
    </>
  );
};

export default App;
