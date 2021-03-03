import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

export default function SwitchLabels({ changeState, value, labelText }) {
  return (
    <FormControlLabel
      control={
        <Switch
          checked={value}
          onChange={(event) => changeState(event.target.checked)}
          name='checkedA'
        />
      }
      label={labelText}
    />
  );
}
