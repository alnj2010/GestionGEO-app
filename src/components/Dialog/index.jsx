import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { hide, show } from '../../actions/dialog';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class AlertDialogSlide extends React.Component {
  handleClose = () => {
    const { hide, handleAgree, entity } = this.props;
    handleAgree(entity);
    hide();
  };

  handleExit = () => {
    const { hide } = this.props;
    hide();
  };

  render() {
    const { entity, action, open } = this.props;
    return (
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={this.handleExit}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {`${entity} ${action}`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to {action} the {entity}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleExit} color="primary">
            No
          </Button>
          <Button onClick={this.handleClose} type="submit" color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
const mS = state => ({
  action: state.dialogReducer.action,
  entity: state.dialogReducer.entity,
  open: state.dialogReducer.open,
});

const mD = {
  hide,
  show,
};

AlertDialogSlide = connect(
  mS,
  mD,
)(AlertDialogSlide);
export default AlertDialogSlide;
