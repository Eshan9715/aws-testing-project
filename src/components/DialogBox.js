import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export  const DialogBox = ({open,close,send}) => {

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button> */}
      <Dialog
        open={open}
        onClose={close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm the status of B/L Instructions "}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Can we consider added B/L Instructions through this form are the finalized B/L Instructions as per your mentioned details?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={close} >Disagree</Button>
          <Button onclick={send} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
