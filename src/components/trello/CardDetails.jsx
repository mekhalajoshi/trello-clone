/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// import Icon from '@mdi/react';
import SubtitlesIcon from '@material-ui/icons/Subtitles';

function CardDetails(props) {
  const { card, open, handleClose } = props;
  // console.log(card.cardId);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          <SubtitlesIcon />
          {' '}
          {card.cardTitle}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {card.cardId}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

CardDetails.propTypes = {
  card: PropTypes.objectOf(PropTypes.any).isRequired,
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};
export default CardDetails;
