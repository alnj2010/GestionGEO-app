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
import Admin from '@material-ui/icons/Group';
import Face from '@material-ui/icons/Face';
import Subject from '@material-ui/icons/LocalLibrary';
import InsertInvitation from '@material-ui/icons/InsertInvitation';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Menu from '@material-ui/core/Menu';
import { show, hide } from '../../actions/snackbar';
import CustomizedSnackbar from '../Snackbar';
import { Collapse } from '@material-ui/core';
import { object } from 'prop-types';

const drawerWidth = 240;

const styles = theme => ({
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

class MenuApp extends React.Component {
  state = {
    open: false,
    anchorEl: null,
    options: [
      {
        link: 'home',
        name: 'Inicio',
        component: Home,
        clicked: false,
        roles:['A','S','T'],
      },
      {
        link: 'inscripcion',
        name: 'Inscripcion',
        component: Inscription,
        clicked: false,
        roles:['S'],
      },
      {
        link: 'mis-cursos',
        name: 'Mis Cursos',
        component: Cursos,
        clicked: false,
        roles:['T'],
      },
      {
        link: 'constancias',
        name: 'Constancias',
        component: Download,
        clicked: false,
        roles:['S','T'],
      },
      {
        link: 'administradores',
        name: 'Administradores',
        component: Admin,
        clicked: false,
        roles:['A'],
      },
      {
        link: 'programas-academicos',
        name: 'Programa Academicos',
        component: SchoolProgram,
        clicked: false,
        roles:['A'],
      },
      {
        link: 'profesores',
        name: 'Profesores',
        component: Teacher,
        clicked: false,
        roles:['A'],
      },
      {
        link: 'estudiantes',
        name: 'Estudiantes',
        component: Face,
        clicked: false,
        roles:['A'],
      },
      {
        link: 'materias',
        name: 'Materias',
        component: Subject,
        clicked: false,
        roles:['A'],
      },
      {
        link: 'periodo-semestral',
        name: 'Periodo Semestral',
        component: InsertInvitation,
        clicked: false,
        roles:['A'],
        options: [
          {
            link: 'actual',
            name: 'Periodo en curso',
            component: Actual,
            clicked: false,
          },
          {
            link: 'list',
            name: 'Periodos',
            component: ListIcon,
            clicked: false,
          },
        ],
      },
    ],
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
  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleLogout = () => {
    sessionStorage.removeItem('GeoToken');
    this.handleClose();
  };
  handleProfile = () =>{
    const rol=sessionStorage.getItem('rol');
    const id=sessionStorage.getItem('id');
    switch(rol){
      case 'A': window.location.href=`/administradores/edit/${id}`; break;
      default : window.location.href=`/mi-perfil/${id}`; break;
    }
  }

  validateToken = () => {
    if (!sessionStorage.getItem('GeoToken')) {
      window.location.href = '/';
      return false;
    }
  };

  handleClick = option => {
    const { options } = this.state;
    let changed = false;
    options.map(opt => {
      if (opt.name === option && opt.options) {
        changed = true;
        opt.open = !opt.open;
      }
      return opt;
    });
    if (changed) this.setState({ options: options });
    else {
      const { location } = this.props;
      location.pathname = `/${option}`;
    }
  };

  render() {
    const { classes, theme, children} = this.props;
    const { anchorEl, options } = this.state;
    const open = Boolean(anchorEl);
    const rol=sessionStorage.getItem('rol');
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: this.state.open,
          })}
        >
          <Toolbar
            disableGutters={!this.state.open}
            className={classes.AppBarInside}
          >
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, {
                [classes.hide]: this.state.open,
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              GestionGEO
            </Typography>

            <div>
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
                <MenuItem onClick={()=>{window.location.href=`/mi-perfil`}}>Cambio de contrasena</MenuItem>
                <MenuItem onClick={this.handleLogout}>Salir</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: this.state.open,
            [classes.drawerClose]: !this.state.open,
          })}
          classes={{
            paper: classNames({
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClose]: !this.state.open,
            }),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'rtl' ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            {options.filter(option=>option.roles.some(item=>item===rol))
              .map((option, index) => (
              <Fragment key={option.name}>
                {option.options ? (
                  <ListItem
                    button
                    key={option.name}
                    onClick={() => this.handleClick(option.name)}
                  >
                    <ListItemIcon>
                      <option.component />
                    </ListItemIcon>
                    <ListItemText
                      primary={option.name}
                      className={classes.itemText}
                    />
                    {option.options ? (
                      option.open ? (
                        <ExpandLess />
                      ) : (
                        <ExpandMore />
                      )
                    ) : null}
                  </ListItem>
                ) : (
                  <Link
                    to={`/${option.link}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <ListItem
                      button
                      key={option.name}
                      onClick={() => this.handleClick(option.name)}
                    >
                      <ListItemIcon>
                        <option.component />
                      </ListItemIcon>
                      <ListItemText
                        primary={option.name}
                        className={classes.itemText}
                      />
                      {option.options ? (
                        option.open ? (
                          <ExpandLess />
                        ) : (
                          <ExpandMore />
                        )
                      ) : null}
                    </ListItem>
                  </Link>
                )}

                {option.options ? (
                  <Collapse in={option.open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {option.options.map(subOption => (
                        <Link
                          to={`/${option.link}/${subOption.link}`}
                          style={{ textDecoration: 'none' }}
                          key={subOption.name}
                        >
                          <ListItem
                            button
                            key={subOption.name}
                            onClick={() => this.handleClick(subOption.name)}
                            className={classes.nested}
                          >
                            <ListItemIcon>
                              <subOption.component />
                            </ListItemIcon>
                            <ListItemText
                              primary={subOption.name}
                              className={classes.itemText}
                            />
                          </ListItem>
                        </Link>
                      ))}
                    </List>
                  </Collapse>
                ) : null}
              </Fragment>
            ))}
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <CustomizedSnackbar />
          {children}
          {this.validateToken()}
        </main>
      </div>
    );
  }
}

MenuApp.propTypes = {
  classes: object.isRequired,
  theme: object.isRequired,
};

const mS = state => ({
  showMessage: state.snackbarReducer.show,
  message: state.snackbarReducer.message,
});

const mD = {
  show,
  hide,
};

MenuApp = connect(
  mS,
  mD,
)(MenuApp);
MenuApp = withStyles(styles, { withTheme: true })(MenuApp);
export default MenuApp;
