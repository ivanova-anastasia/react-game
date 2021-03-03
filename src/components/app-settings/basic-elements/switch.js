import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

export default function SwitchLabels({ changeMusicState, music }) {
  return (
    <FormControlLabel
      control={
        <Switch
          checked={music}
          onChange={(event) => changeMusicState(event.target.checked)}
          name='checkedA'
        />
      }
      label='off/on'
    />
  );
}
