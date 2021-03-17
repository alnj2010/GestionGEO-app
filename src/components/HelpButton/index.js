import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Fab } from '@material-ui/core';
import Help from '@material-ui/icons/Help';
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from 'prop-types';

const styles = () => ({
  root: {
    boxShadow: 'none',
    background: 'white',
    '&:active': {
      boxShadow: 'none',
    },
  },
});

function HelpButton({ classes, children }) {
  return (
    <Tooltip title={<>{children}</>} aria-label="Add" placement="right">
      <Fab
        classes={classes}
        disableRipple
        color="inherit"
        aria-label="help"
        size="small"
        onClick={() => false}
      >
        <Help />
      </Fab>
    </Tooltip>
  );
}

HelpButton.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
  }).isRequired,
  children: PropTypes.node.isRequired,
};
export default withStyles(styles)(HelpButton);
