import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
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

const styles = (theme) => ({
  container: {
    minHeight: '100vh',
    backgroundColor: '#FBFBFB',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  header: {
    flexShrink: 0,
    position: 'relative',
    height: 325,
    background: 'linear-gradient(180deg, rgba(3,161,244,1) 50%, rgba(0,123,230,1) 100%)',
  },
  section: {
    flexGrow: 1,
    paddingLeft: 78,
    paddingRight: 550,
    '& article': {
      height: 350,
      maxWidth: 727,
      fontSize: 14,
      fontFamily: 'Roboto',
      lineHeight: '30px',
    },
  },
  loginContainer: {
    position: 'absolute',
    height: 434,
    display: 'flex',
    justifyContent: 'center',
    top: 85,
    right: 42,
    zIndex: 1,
  },
  loginPaper: { width: 479, padding: '42px 50px', boxSizing: 'border-box' },
  logoContainer: {
    paddingLeft: 78,
    userSelect: 'none',
  },
  partners: {
    padding: '38px 0 0 44px',
    '& a': {
      paddingRight: 27,
      userSelect: 'none',
    },
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 45,
    borderTop: '1px solid rgba(112, 112, 112, 0.5)',
    margin: '0 32px 0 72px',
  },
  footerItem: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 12,
  },
  contactInfoContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontWeight: 'normal',
    width: 378,
  },
  contactInfo: {
    display: 'flex',
    alignItems: 'center',
  },
  info: {
    marginLeft: 7,
  },
  verticalSeparator: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(112, 112, 112, 0.5)',
  },
  peopleContainer: {
    userSelect: 'none',
    position: 'relative',
    bottom: 100,
    left: 2,
  },
});

function AuthenticationApp({ children, classes }) {
  return (
    <div className={classes.container}>
      <header className={classes.header}>
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
          <a href="http://gea.ciens.ucv.ve/geopostgrado/" target="_blank" rel="noopener noreferrer">
            <img src={pggqLogo} alt="logo postgrado de geoquimica" />
          </a>
        </div>
        <div className={classes.logoContainer}>
          <img src={logo} alt="GestionGEO" />
        </div>
        <div className={classes.loginContainer}>
          <img src={peopleLogo} className={classes.peopleContainer} alt="Estudiantes" />
          <Paper className={classes.loginPaper}>{children}</Paper>
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
      <footer className={classes.footer}>
        <div className={classes.footerItem}>Todos los Derechos Reservados. © GestionGeo 2021</div>
        <div className={classes.footerItem}>
          <div className={classes.contactInfoContainer}>
            <div className={classes.contactInfo}>
              <Email />
              <span className={classes.info}>postgrado.geoquimica@gmail.com</span>
            </div>
            <span className={classes.verticalSeparator} />
            <div className={classes.contactInfo}>
              <Phone />
              <span className={classes.info}>+58 212 6051082</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

AuthenticationApp.propTypes = {
  classes: PropTypes.shape({
    form: PropTypes.string,
    container: PropTypes.string,
    header: PropTypes.string,
    section: PropTypes.string,
    footer: PropTypes.string,
    footerItem: PropTypes.string,
    contactInfoContainer: PropTypes.string,
    contactInfo: PropTypes.string,
    info: PropTypes.string,
    verticalSeparator: PropTypes.string,
    formContainer: PropTypes.string,
    partners: PropTypes.string,
    loginContainer: PropTypes.string,
    logoContainer: PropTypes.string,
    logo: PropTypes.string,
    peopleContainer: PropTypes.string,
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
