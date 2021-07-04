import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import Email from '@material-ui/icons/Email';
import Phone from '@material-ui/icons/Phone';

import logo from '../../images/gestiongeo.svg';
import engineerLogo from '../../images/ing.svg';
import scienceLogo from '../../images/logo_ciencias.svg';
import ucvLogo from '../../images/logo-ucv.svg';
import peopleLogo from '../../images/people.svg';
import pggqLogo from '../../images/pggq.svg';

import Footer from '../Footer';

const styles = (theme) => ({
  container: {
    minHeight: '100vh',
    backgroundColor: '#FBFBFB',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  header: {
    height: 325,
    background: 'linear-gradient(180deg, rgba(3,161,244,1) 50%, rgba(0,123,230,1) 100%)',
  },
  headerTop: {
    height: '25%',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  headerBottom: {
    height: '75%',
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      alignItems: 'center',
      flexDirection: 'column',
    },
  },
  headerLeft: {
    width: '50%',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
    },
  },
  headerRight: {
    width: '50%',
    position: 'relative',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  section: {
    flexGrow: 1,
    paddingLeft: 78,
    paddingRight: 550,
    '& article': {
      textAlign: 'justify',
      color: '#707070',
      height: 350,
      maxWidth: 727,
      fontSize: 14,
      fontFamily: 'Roboto',
      lineHeight: '30px',
    },
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  loginContainer: {
    position: 'absolute',
    height: 434,
    display: 'flex',
    justifyContent: 'center',
    top: -25,
    right: 42,
    zIndex: 1,
    [theme.breakpoints.down('sm')]: {
      position: 'static',
    },
  },
  loginPaper: {
    width: 479,
    padding: '42px 50px',
    boxSizing: 'border-box',
    flexShrink: 0,
    [theme.breakpoints.down('xs')]: {
      flexShrink: 1,
      boxShadow: 'none',
      borderRadius: 0,
      padding: '42px 25px',
    },
  },
  logoContainer: {
    paddingLeft: 78,
    userSelect: 'none',
    '& img': {
      [theme.breakpoints.down('sm')]: {
        height: 150,
      },
    },
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 0,
    },
  },
  partners: {
    padding: '10px 0 0 44px',
    '& a': {
      paddingRight: 27,
      userSelect: 'none',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '10px 0 0 0',
      display: 'flex',
      justifyContent: 'space-evenly',
    },
  },
  peopleContainer: {
    userSelect: 'none',
    position: 'relative',
    bottom: 70,
    left: 2,
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
});

function AuthenticationApp({ children, classes }) {
  return (
    <div className={classes.container}>
      <header className={classes.header}>
        <div className={classes.headerTop}>
          <div className={classes.partners}>
            <a href="http://www.ucv.ve/" target="_blank" rel="noopener noreferrer">
              <img src={ucvLogo} alt="logo ucv" />
            </a>
            <a href="http://fiucv.ing.ucv.ve/" target="_blank" rel="noopener noreferrer">
              <img src={engineerLogo} alt="logo facultad ingenieria" />
            </a>
            <a href="http://www.ciens.ucv.ve/ciens/" target="_blank" rel="noopener noreferrer">
              <img src={scienceLogo} alt="logo facultad ciencias" />
            </a>
            <a
              href="http://gea.ciens.ucv.ve/geopostgrado/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={pggqLogo} alt="logo Postgrado de Geoquímica" />
            </a>
          </div>
        </div>
        <div className={classes.headerBottom}>
          <div className={classes.headerLeft}>
            <div className={classes.logoContainer}>
              <img src={logo} alt="GestionGEO" />
            </div>
          </div>
          <div className={classes.headerRight}>
            <div className={classes.loginContainer}>
              <img src={peopleLogo} className={classes.peopleContainer} alt="Estudiantes" />
              <Paper className={classes.loginPaper}>{children}</Paper>
            </div>
          </div>
        </div>
      </header>
      <section className={classes.section}>
        <article>
          <p>
            GestionGeo es una aplicacion web que hace posible la automatización de los procesos
            presentes en la gestión académica – administrativa del Postgrado de Geoquímica de la
            UCV.
          </p>
          <p>
            La aplicación es dirigida a la comunidad estudiantil, profesoral y administrativa del
            Postgrado de Geoquímica de la UCV, e incluye estudiantes de convenios con la Escuela de
            Geología de la Facultad de Ingeniería y externos de empresas.
          </p>
        </article>
      </section>
      <Footer />
    </div>
  );
}

AuthenticationApp.propTypes = {
  classes: PropTypes.shape({
    form: PropTypes.string,
    container: PropTypes.string,
    header: PropTypes.string,
    section: PropTypes.string,
    formContainer: PropTypes.string,
    partners: PropTypes.string,
    loginContainer: PropTypes.string,
    loginPaper: PropTypes.string,
    logoContainer: PropTypes.string,
    logo: PropTypes.string,
    peopleContainer: PropTypes.string,
    headerTop: PropTypes.string,
    headerBottom: PropTypes.string,
    headerLeft: PropTypes.string,
    headerRight: PropTypes.string,
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
