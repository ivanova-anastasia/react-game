import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function CheckboxLabels({ title, isChecked, changeState }) {
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={isChecked}
          onChange={(event) => changeState(event.target.checked)}
          name='checkedA'
        />
      }
      label={title}
    />
  );
}
