import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Home from '@material-ui/icons/Home';
import Inscription from '@material-ui/icons/HowToVote';
import Download from '@material-ui/icons/Archive';
import Cursos from '@material-ui/icons/LibraryBooks';
import Actual from '@material-ui/icons/AlarmAdd';
import ListIcon from '@material-ui/icons/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Teacher from '@material-ui/icons/School';
import SchoolProgram from '@material-ui/icons/Extension';
import Users from '@material-ui/icons/Group';
import Help from '@material-ui/icons/Help';
import AccountBox from '@material-ui/icons/AccountBox';
import Face from '@material-ui/icons/Face';
import Subject from '@material-ui/icons/LocalLibrary';
import InsertInvitation from '@material-ui/icons/InsertInvitation';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Menu from '@material-ui/core/Menu';
import { Collapse } from '@material-ui/core';
import PropTypes from 'prop-types';
import WelcomeModal from '../WelcomeModal';
import CustomizedSnackbar from '../Snackbar';
import { getConstance } from '../../actions/student';
import { findCurrentSchoolPeriod, cleanSelectedSchoolPeriod } from '../../actions/schoolPeriod';
import {
  removeSessionGeoToken,
  getSessionUserRol,
  getSessionUserId,
  getSessionGeoToken,
  getSessionUser,
  setHideWelcomeModal,
  getHideWelcomeModal,
} from '../../storage/sessionStorage';
import adminStep1 from '../../images/adminWelcome.jpg';
import adminStep2 from '../../images/stepUsers.jpg';
import adminStep3 from '../../images/stepSubjects.jpg';
import adminStep4 from '../../images/stepSchoolPrograms.jpg';
import adminStep5 from '../../images/stepSchoolPeriod.jpg';
import adminStep6 from '../../images/stepDowload.jpg';
import { CONSTANCES, USER_INSTANCE } from '../../services/constants';

const drawerWidth = 250;

const styles = (theme) => ({
  root: {
    display: 'flex',
    maxWidth: '100%',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    justifyContent: 'space-between',
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9 + 1,
    },
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  AppBarInside: {
    justifyContent: 'space-between',
    paddingRight: 0,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    maxWidth: '94%',
  },
  itemText: {
    textTransform: 'capitalize',
  },
});

const tutorialSteps = [
  {
    // eslint-disable-next-line react/display-name
    Content: ({ classes }) => {
      const {
        level_instruction: levelInstruction,
        first_name: firstName,
        second_name: secondName,
        first_surname: firstSurname,
        second_surname: secondSurname,
      } = getSessionUser();
      return (
        <>
          <div className={classes.title}>
            Bienvenido{' '}
            {`${levelInstruction}. ${firstName} ${secondName || ''} ${firstSurname} ${
              secondSurname || ''
            }`}
          </div>
          <div className={classes.descriptionContainer}>
            <span className={classes.introduction}>
              Ud ha ingresado como <strong>Administrador</strong> de GestionGeo.
            </span>
            En este modulo podra gestionar cada una de las entidades que conforman el sistema:
            <ul>
              <li>Usuarios (Administradores, Profesores y Estudiantes)</li>
              <li>Programas Academicos</li>
              <li>Asignaturas</li>
              <li>Periodos Semestrales</li>
            </ul>
          </div>
        </>
      );
    },
    image: adminStep1,
  },
  {
    // eslint-disable-next-line react/display-name
    Content: ({ classes }) => {
      return (
        <>
          <div className={classes.title}>
            Usuarios <Users />
          </div>
          <div className={classes.descriptionContainer}>
            <span className={classes.introduction}>
              Actualmente la plataforma maneja 3 tipos de Usuarios:
            </span>
            <ol>
              <li>Administradores</li>
              <li>Profesores </li>
              <li>Estudiantes</li>
            </ol>
            A través del menú lateral izquierdo, haciendo click en el ítem <strong>Usuarios</strong>{' '}
            . Ud. accederá a la lista donde podrá agregar nuevos usuarios, acceder a los detalles de
            cada uno y modificar sus valores si es necesario.
          </div>
        </>
      );
    },
    image: adminStep2,
  },
  {
    // eslint-disable-next-line react/display-name
    Content: ({ classes }) => {
      return (
        <>
          <div className={classes.title}>
            Asignaturas <Subject />
          </div>
          <div className={classes.descriptionContainer}>
            <span className={classes.section}>
              A través del menú lateral izquierdo, haciendo click en el ítem{' '}
              <strong>Asignaturas</strong> . Ud. podrá acceder a la lista de asignaturas, como
              también incorporar nuevas y modificar las existentes si es necesario.
            </span>
            <span className={classes.section}>
              En esta sección podrá incorporar asignaturas con modalidad regular y cursos de
              ampliación.
            </span>
          </div>
        </>
      );
    },
    image: adminStep3,
  },
  {
    // eslint-disable-next-line react/display-name
    Content: ({ classes }) => {
      return (
        <>
          <div className={classes.title}>
            Programas Académicos <SchoolProgram />
          </div>
          <div className={classes.descriptionContainer}>
            <span className={classes.section}>
              Haciendo click en el ítem <strong>Programas Académicos</strong> . Ud. podrá acceder a
              la lista de programas académicos existentes, como también incorporar nuevos y
              modificar los existentes si es necesario.
            </span>
          </div>
        </>
      );
    },
    image: adminStep4,
  },
  {
    // eslint-disable-next-line react/display-name
    Content: ({ classes }) => {
      return (
        <>
          <div className={classes.title}>
            Periodos semestrales <InsertInvitation />
          </div>
          <div className={classes.descriptionContainer}>
            <span className={classes.introduction}>
              Haciendo click en el ítem <strong>Periodos semestrales</strong>, se desplegará 2
              opciones:
            </span>
            <ol>
              <li className={classes.listOrderItem}>
                <strong>
                  <em>
                    Periodo en curso <Actual />:
                  </em>
                </strong>{' '}
                Podrá definir los siguientes valores del periodo semestral en curso:
                <ul>
                  <li> Fecha límite de retiro de asignaturas. </li>
                  <li> Fecha en la que finalizará el periodo semestral. </li>
                  <li>
                    Habilitar la carga de notas donde permitirá que los docentes carguen las notas
                    de sus cursos impartidos.
                  </li>
                  <li>
                    Habilita la posibilidad de inscripción de los estudiantes en el periodo
                    semestral.
                  </li>
                </ul>
                <span className={classes.section}>
                  Además se podrá visualizar el calendario de las asignaturas impartidas en dicho
                  periodo semestral.
                </span>
              </li>
              <li className={classes.listOrderItem}>
                <strong>
                  <em>
                    Periodos <ListIcon />:
                  </em>
                </strong>{' '}
                Ud. podrá acceder a la lista de periodos semestrales existentes, como también
                incorporar nuevos y modificar los existentes si es necesario.
              </li>
            </ol>
          </div>
        </>
      );
    },
    image: adminStep5,
  },
  {
    // eslint-disable-next-line react/display-name
    Content: ({ classes }) => {
      return (
        <>
          <div className={classes.title}>
            Descargas <Download />
          </div>
          <div className={classes.descriptionContainer}>
            <span className={classes.section}>
              Haciendo click en el ítem <strong>Descargas</strong>, se desplegará las constancias
              asociadas a su usuario.
            </span>
          </div>
        </>
      );
    },
    image: adminStep6,
  },
];
class MenuApp extends React.Component {
  constructor() {
    super();
    this.state = {
      openDownload: false,
      open: true,
      openWelcomeModal: !getHideWelcomeModal(),
      anchorEl: null,
      options: [
        {
          link: 'inicio',
          name: 'Inicio',
          component: Home,
          clicked: false,
          roles: ['A', 'S', 'T'],
          open: false,
          options: false,
        },
        {
          link: 'inscripcion',
          name: 'Inscripcion',
          component: Inscription,
          clicked: false,
          roles: ['S'],
          open: false,
          options: false,
        },
        {
          link: 'mis-cursos',
          name: 'Mis Cursos',
          component: Cursos,
          clicked: false,
          roles: ['T'],
          open: false,
          options: false,
        },
        {
          link: 'programas-academicos',
          name: 'Programas Academicos',
          component: SchoolProgram,
          clicked: false,
          roles: ['A'],
          open: false,
          options: false,
        },
        {
          link: 'usuarios',
          name: 'Usuarios',
          component: Users,
          clicked: false,
          roles: ['A'],
          open: false,
          options: [
            {
              link: 'administradores',
              name: 'Administradores',
              component: AccountBox,
              clicked: false,
            },

            {
              link: 'profesores',
              name: 'Profesores',
              component: Teacher,
              clicked: false,
            },
            {
              link: 'estudiantes',
              name: 'Estudiantes',
              component: Face,
              clicked: false,
            },
          ],
        },

        {
          link: 'asignaturas',
          name: 'Asignaturas',
          component: Subject,
          clicked: false,
          roles: ['A'],
          open: false,
          options: false,
        },
        {
          link: 'periodo-semestral',
          name: 'Periodo Semestral',
          component: InsertInvitation,
          clicked: false,
          roles: ['A'],
          open: false,
          options: [
            {
              link: 'en-curso',
              name: 'en curso',
              component: Actual,
              clicked: false,
            },
            {
              link: 'periodos',
              name: 'Periodos',
              component: ListIcon,
              clicked: false,
            },
          ],
        },
      ],
    };
  }

  handleCloseWelcomeModal = () => {
    this.setState({ openWelcomeModal: false });
    setHideWelcomeModal();
  };

  componentDidMount = () => {
    const { findCurrentSchoolPeriodDispatch } = this.props;
    const rol = getSessionUserRol();

    if (rol === 'S' || rol === 'T') {
      findCurrentSchoolPeriodDispatch();
    }
  };

  componentWillUnmount = () => {
    const { cleanSelectedSchoolPeriodDispatch } = this.props;
    cleanSelectedSchoolPeriodDispatch();
  };

  componentWillMount = () => {
    this.validateToken();
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleMenu = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleOpenWelcomeModal = () => {
    this.setState({ openWelcomeModal: true });
  };

  handleOpenDownload = () => {
    this.setState((state) => {
      return { openDownload: !state.openDownload, open: true };
    });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleLogout = () => {
    removeSessionGeoToken();
    this.handleClose();
  };

  handleProfile = () => {
    const { history } = this.props;
    const rol = getSessionUserRol();
    const id = getSessionUserId();
    switch (rol) {
      case 'A':
        this.handleClose();
        history.push(`/usuarios/administradores/modificar/${id}`);
        break;
      default:
        this.handleClose();
        history.push(`/mi-perfil/${id}`);
        break;
    }
  };

  validateToken = () => {
    const { history } = this.props;
    if (!getSessionGeoToken()) {
      this.handleClose();
      history.push('/');
    }
    return false;
  };

  handleClick = (option) => {
    const { options } = this.state;
    let changed = false;
    options.map((opt) => {
      if (opt.name === option && opt.options) {
        changed = true;
        // eslint-disable-next-line no-param-reassign
        opt.open = !opt.open;
      }
      return opt;
    });
    if (changed) this.setState({ options });
  };

  render() {
    const {
      classes,
      theme,
      children,
      history,
      getConstanceDispatch,
      location,
      inscriptionVisible,
    } = this.props;
    const { anchorEl, options, open: openOption, openDownload, openWelcomeModal } = this.state;
    const open = Boolean(anchorEl);
    const rol = getSessionUserRol();
    const userSession = getSessionUser();
    const userId = userSession ? userSession[USER_INSTANCE[rol]].id : null;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: openOption,
          })}
        >
          <Toolbar disableGutters={!openOption} className={classes.AppBarInside}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, {
                [classes.hide]: openOption,
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              GestionGEO
            </Typography>

            <div>
              <IconButton onClick={this.handleOpenWelcomeModal} color="inherit">
                <Help />
              </IconButton>
              <IconButton
                aria-owns={open ? 'menu-appbar' : undefined}
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={this.handleClose}
              >
                <MenuItem onClick={this.handleProfile}>Mi Perfil</MenuItem>
                <MenuItem
                  onClick={() => {
                    this.handleClose();
                    history.push(`/cambio-clave`);
                  }}
                >
                  Cambio de contraseña
                </MenuItem>
                <MenuItem onClick={this.handleLogout}>Salir</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: openOption,
            [classes.drawerClose]: !openOption,
          })}
          classes={{
            paper: classNames({
              [classes.drawerOpen]: openOption,
              [classes.drawerClose]: !openOption,
            }),
          }}
          open={openOption}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            {options
              .filter(
                (option) =>
                  (option.roles.some((item) => item === rol) && option.name !== 'Inscripcion') ||
                  (option.name === 'Inscripcion' && rol === 'S' && inscriptionVisible)
              )
              .map((option) => (
                <Fragment key={option.name}>
                  {option.options ? (
                    <ListItem
                      button
                      key={option.name}
                      selected={location.pathname.includes(
                        option.name.toLowerCase().replace(' ', '-')
                      )}
                      onClick={() => this.handleClick(option.name)}
                    >
                      <ListItemIcon>
                        <option.component />
                      </ListItemIcon>
                      <ListItemText primary={option.name} className={classes.itemText} />
                      {option.options && (option.open ? <ExpandLess /> : <ExpandMore />)}
                    </ListItem>
                  ) : (
                    <Link to={`/${option.link}`} style={{ textDecoration: 'none' }}>
                      <ListItem
                        button
                        key={option.name}
                        selected={location.pathname.includes(
                          option.name.toLowerCase().replace(' ', '-')
                        )}
                        onClick={() => this.handleClick(option.name)}
                      >
                        <ListItemIcon>
                          <option.component />
                        </ListItemIcon>
                        <ListItemText primary={option.name} className={classes.itemText} />
                        {option.options && (option.open ? <ExpandLess /> : <ExpandMore />)}
                      </ListItem>
                    </Link>
                  )}
                  {option.options ? (
                    <Collapse in={option.open} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {option.options.map((subOption) => (
                          <Link
                            to={`/${option.link}/${subOption.link}`}
                            style={{
                              textDecoration: 'none',
                            }}
                            key={subOption.name}
                          >
                            <ListItem
                              button
                              key={subOption.name}
                              onClick={() => this.handleClick(subOption.name)}
                              className={classes.nested}
                              selected={location.pathname.includes(
                                subOption.name.toLowerCase().replace(' ', '-')
                              )}
                            >
                              <ListItemIcon>
                                <subOption.component />
                              </ListItemIcon>
                              <ListItemText primary={subOption.name} className={classes.itemText} />
                            </ListItem>
                          </Link>
                        ))}
                      </List>
                    </Collapse>
                  ) : null}
                </Fragment>
              ))}
            {userSession && ['A', 'T'].indexOf(rol) !== -1 ? (
              <>
                <ListItem button onClick={this.handleOpenDownload}>
                  <ListItemIcon>
                    <Download />
                  </ListItemIcon>
                  <ListItemText primary="Descargas" className={classes.itemText} />
                  {openDownload ? <ExpandLess /> : <ExpandMore />}
                </ListItem>

                <Collapse in={openDownload} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {CONSTANCES[rol].map(({ name, userType, constanceType }) => (
                      <ListItem
                        button
                        key={name}
                        onClick={() => getConstanceDispatch(userId, userType, constanceType)}
                        className={classes.nested}
                      >
                        <ListItemIcon>
                          <div style={{ width: '10px' }} />
                        </ListItemIcon>
                        <ListItemText primary={name} className={classes.itemText} />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </>
            ) : null}
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <CustomizedSnackbar />
          {children}
          {this.validateToken()}
        </main>
        <WelcomeModal
          tutorialSteps={tutorialSteps}
          open={openWelcomeModal}
          handleCloseWelcomeModal={this.handleCloseWelcomeModal}
        />
      </div>
    );
  }
}

MenuApp.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
    appBar: PropTypes.string,
    appBarShift: PropTypes.string,
    menuButton: PropTypes.string,
    hide: PropTypes.string,
    drawer: PropTypes.string,
    drawerOpen: PropTypes.string,
    drawerClose: PropTypes.string,
    nested: PropTypes.string,
    toolbar: PropTypes.string,
    AppBarInside: PropTypes.string,
    content: PropTypes.string,
    itemText: PropTypes.string,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,

  theme: PropTypes.shape({
    direction: PropTypes.string,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  children: PropTypes.shape({}).isRequired,
  getConstanceDispatch: PropTypes.func.isRequired,
  inscriptionVisible: PropTypes.bool,
  findCurrentSchoolPeriodDispatch: PropTypes.func.isRequired,
  cleanSelectedSchoolPeriodDispatch: PropTypes.func.isRequired,
};
MenuApp.defaultProps = {
  inscriptionVisible: false,
};
const mS = (state) => ({
  showMessage: state.snackbarReducer.show,
  message: state.snackbarReducer.message,
  inscriptionVisible: !!state.schoolPeriodReducer.selectedSchoolPeriod.inscription_visible,
});
const mD = {
  getConstanceDispatch: getConstance,
  findCurrentSchoolPeriodDispatch: findCurrentSchoolPeriod,
  cleanSelectedSchoolPeriodDispatch: cleanSelectedSchoolPeriod,
};
const MenuAppWrapper = withStyles(styles, { withTheme: true })(connect(mS, mD)(MenuApp));
export default MenuAppWrapper;
