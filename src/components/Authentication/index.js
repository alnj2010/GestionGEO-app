import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import backImage from '../../images/pif.jpg';
import logo from '../../images/icon-gestionGeo.svg';

const styles = (theme) => ({
  container: {
    height: '100vh',
    background: `url(${backImage})`,
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
    [theme.breakpoints.down('sm')]: {
      padding: '0',
      height: '0',
    },
  },
  form: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    width: '550px',
    padding: '1% 5%',
    margin: ' 0 auto',
    backgroundColor: 'white',
    borderRadius: '10px',
  },
  logo: {
    width: '60%',
    height: 'auto',
  },
});

function AuthenticationApp({ children, classes }) {
  return (
    <Grid container className={classes.container}>
      <Grid className={classes.form} item xs={12}>
        <Grid container spacing={8} className={classes.formContainer} id="loginForm">
          <Grid container item xs={12} justify="center" direction="column" alignItems="center">
            <img src={logo} alt="GestionGEO" className={classes.logo} />
          </Grid>
          {children}
        </Grid>
      </Grid>
    </Grid>
  );
}

AuthenticationApp.propTypes = {
  classes: PropTypes.shape({
    form: PropTypes.string,
    container: PropTypes.string,
    formContainer: PropTypes.string,
    logo: PropTypes.string,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,

  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  children: PropTypes.shape({}).isRequired,
};

const mS = () => ({});
const mD = {};
const AuthenticationAppWrapper = withStyles(styles, { withTheme: true })(
  connect(mS, mD)(AuthenticationApp)
);
export default AuthenticationAppWrapper;
