import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { hide } from '../../actions/snackbar';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const styles1 = (theme) => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

function MySnackbarContent(props) {
  const { classes, className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={classNames(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

MySnackbarContent.propTypes = {
  classes: PropTypes.shape({
    message: PropTypes.string,
    icon: PropTypes.string,
    iconVariant: PropTypes.string,
    close: PropTypes.string,
  }).isRequired,
  message: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};
MySnackbarContent.defaultProps = {
  className: null,
};
const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

const styles2 = (theme) => ({
  margin: {
    margin: theme.spacing.unit,
  },
});

function CustomizedSnackbars({ variant, message, showMessage, hideDispatch }) {
  const handleClose = (_, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    hideDispatch();
  };
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={showMessage}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <MySnackbarContentWrapper onClose={handleClose} variant={variant} message={message} />
    </Snackbar>
  );
}

CustomizedSnackbars.propTypes = {
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
  message: PropTypes.string.isRequired,
  showMessage: PropTypes.bool.isRequired,
  hideDispatch: PropTypes.func.isRequired,
};

const mS = (state) => ({
  showMessage: state.snackbarReducer.show,
  message: state.snackbarReducer.message,
  variant: state.snackbarReducer.variant,
});

const mD = {
  hideDispatch: hide,
};
let CustomizedSnackbarsWrapper = withStyles(styles2)(CustomizedSnackbars);
CustomizedSnackbarsWrapper = connect(mS, mD)(CustomizedSnackbarsWrapper);

export default withStyles(styles2)(CustomizedSnackbarsWrapper);
