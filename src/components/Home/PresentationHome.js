import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

import imgMan from '../../images/hombre.png';
import imgWomen from '../../images/mujer.png';
import { reverseJson } from '../../helpers/index';
import { USER_ROL, COORDINATOR_ROL } from '../../services/constants';

const styles = (theme) => ({
  welcome: {
    background: 'linear-gradient(45deg, rgba(250,250,250,1) 50%, rgba(63,81,181,0.5) 100%)',
    height: '150px',
    minWidth: '215px',
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
  welcome__role: {
    color: 'white',
    height: '100%',
    paddingRight: '20px',
    fontSize: '62px',
    alignItems: 'center',
    opacity: '0.4',
    display: 'flex',
    justifyContent: 'flex-end',
    userSelect: 'none',
    textTransform: 'capitalize',
    [theme.breakpoints.down('sm')]: {
      fontSize: '38px',
      paddingRight: '0',
      justifyContent: 'center',
    },
    [theme.breakpoints.down('xs')]: {
      color: 'black',
      fontSize: '20px',
      paddingRight: '0',
      opacity: '0.87',
      justifyContent: 'center',
    },
  },
  welcome__infoUsername: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.125rem',
    },
  },
  welcome__infoUserRol: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.6rem',
    },
  },
});
function PresentationHome(props) {
  const {
    classes,
    levelInstruction,
    firstName,
    secondName,
    firstSurname,
    secondSurname,
    sex,
    rol,
    principal,
    userRol,
  } = props;
  const userRoles = reverseJson(USER_ROL);
  return (
    <Grid container className={classes.welcome} justify="center">
      <Grid item container xs={2} justify="center">
        <Grid item className={classes.welcome__pictureContainer}>
          <img
            src={sex === 'M' ? imgMan : imgWomen}
            alt="user"
            className={classes.welcome__picture}
          />
        </Grid>
      </Grid>
      <Grid item xs={3} className={classes.welcome__info}>
        <Typography variant="h4" className={classes.welcome__infoUsername} gutterBottom>
          {`${levelInstruction}. ${firstName} ${secondName || ''} ${firstSurname} ${
            secondSurname || ''
          }`}
        </Typography>
        <Typography
          variant="button"
          className={classes.welcome__infoUserRol}
          display="block"
          gutterBottom
        >
          {`${rol ? reverseJson(COORDINATOR_ROL)[rol] : ''} ${principal ? 'Principal' : ''}`}
        </Typography>
      </Grid>
      <Grid item xs={8} sm={7}>
        <Typography variant="h1" className={classes.welcome__role}>
          {userRoles[userRol].toLowerCase()}
        </Typography>
      </Grid>
    </Grid>
  );
}

PresentationHome.propTypes = {
  classes: PropTypes.shape({
    welcome: PropTypes.string,
    welcome__pictureContainer: PropTypes.string,
    welcome__picture: PropTypes.string,
    welcome__info: PropTypes.string,
    welcome__infoUsername: PropTypes.string,
    welcome__infoUserRol: PropTypes.string,
    welcome__role: PropTypes.string,
  }).isRequired,
  levelInstruction: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  secondName: PropTypes.string,
  firstSurname: PropTypes.string.isRequired,
  secondSurname: PropTypes.string,
  sex: PropTypes.string.isRequired,
  rol: PropTypes.string,
  userRol: PropTypes.string,
  principal: PropTypes.number,
};

PresentationHome.defaultProps = {
  secondName: null,
  secondSurname: null,
  principal: 0,
  rol: '',
  userRol: '',
};

export default React.memo(withStyles(styles)(PresentationHome));
