import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SimpleSelect({ items, value, changeXIconView, title }) {
  const classes = useStyles();

  const menuItems = items.map((value, index) => {
    return (
      <MenuItem key={index} value={value}>
        {value}
      </MenuItem>
    );
  });

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel>{title}</InputLabel>
        <Select
          value={value}
          onChange={(event) => changeXIconView(event.target.value)}
        >
          {menuItems}
          {/* <MenuItem value={value}>{items[0]}</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem> */}
        </Select>
      </FormControl>
    </div>
  );
}
