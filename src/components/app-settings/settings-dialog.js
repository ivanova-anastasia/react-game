import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
  root: {
    background: '#d9b08c',
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant='h6'>{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label='close'
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    background: '#d1e8e2',
    padding: theme.spacing(2),
    width: 'fit-content',
  },
}))(MuiDialogContent);

export default function CustomizedDialogs({
  settingsComponent,
  settingDialogOpen,
  handleSettingDialogClose,
  title,
}) {
  return (
    <div>
      <Dialog
        aria-labelledby='customized-dialog-title'
        open={settingDialogOpen}
      >
        <DialogTitle
          id='customized-dialog-title'
          onClose={handleSettingDialogClose}
        >
          {title}
        </DialogTitle>
        <DialogContent dividers>{settingsComponent}</DialogContent>
      </Dialog>
    </div>
  );
}
