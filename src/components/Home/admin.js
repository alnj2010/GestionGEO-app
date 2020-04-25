import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import { getSessionUser } from '../../storage/sessionStorage';

import imgMan from '../../images/hombre.png';
import imgWomen from '../../images/mujer.png';

const styles = () => ({
  welcome: {
    backgroundColor: '#FAFAFA',
    height: '150px',
    borderRadius: '5px',
    boxShadow: '-1px 2px 5px 0px rgba(0,0,0,0.2)',
  },
  welcome__pictureContainer: {
    width: '146px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome__picture: {
    width: '100%',
    minWidth: '77px',
    height: 'auto',
  },
  welcome__info: {
    padding: '10px',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
});
class AdminHome extends Component {
  render() {
    const { classes } = this.props;
    const {
      level_instruction,
      first_name,
      second_name,
      first_surname,
      second_surname,
      sex,
      administrator: { rol, principal },
    } = getSessionUser();

    return (
      <Grid container className={classes.welcome}>
        <Grid item container xs={2} justify="center">
          <Grid item className={classes.welcome__pictureContainer}>
            <img
              src={sex === 'M' ? imgMan : imgWomen}
              alt="admin"
              className={classes.welcome__picture}
            />
          </Grid>
        </Grid>
        <Grid item xs={9} className={classes.welcome__info}>
          <Typography variant="h4" gutterBottom>
            {`${level_instruction}. ${first_name} ${second_name || ''} ${first_surname} ${
              second_surname || ''
            }`}
          </Typography>
          <Typography variant="button" display="block" gutterBottom>
            {`${rol} ${principal ? 'Principal' : ''}`}
          </Typography>
        </Grid>
      </Grid>
    );
  }
}

AdminHome.propTypes = {};

export default withStyles(styles)(AdminHome);
