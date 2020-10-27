import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { hide } from '../../actions/dialog';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class AlertDialogSlide extends React.Component {
  handleClose = () => {
    const { hideDispatch, handleAgree, entity } = this.props;
    handleAgree(entity);
    hideDispatch();
  };

  handleExit = () => {
    const { hideDispatch } = this.props;
    hideDispatch();
  };

  render() {
    const { entity, action, open } = this.props;
    const capitalize = (s) => {
      if (typeof s !== 'string') return '';
      return s.charAt(0).toUpperCase() + s.slice(1);
    };
    return (
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={this.handleExit}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{`${capitalize(action)} ${entity}`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            ¿Estas seguro que quieres {action} {entity}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleExit} color="primary">
            No
          </Button>
          <Button onClick={this.handleClose} type="submit" color="primary">
            Si
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
AlertDialogSlide.propTypes = {
  entity: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  handleAgree: PropTypes.func,
  hideDispatch: PropTypes.func.isRequired,
};

AlertDialogSlide.defaultProps = {
  handleAgree: () => null,
};
const mS = (state) => ({
  action: state.dialogReducer.action,
  entity: state.dialogReducer.entity,
  open: state.dialogReducer.open,
});

const mD = {
  hideDispatch: hide,
};

export default connect(mS, mD)(AlertDialogSlide);
