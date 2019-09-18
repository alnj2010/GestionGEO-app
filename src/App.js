import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import NotFound from './components/NotFound';
import Login from './containers/Login';
import Menu from './components/Menu';
import Home from './components/Home';

import AdminsList from './containers/Admins';
import AdminDetail from './containers/Admins/detail';

import PostgraduatesList from './containers/Postgraduates';
import PostgraduateDetail from './containers/Postgraduates/detail';

import SubjectsList from './containers/Subjects';
import SubjectDetail from './containers/Subjects/detail';

import StudentsList from './containers/Students';
import StudentDetail from './containers/Students/detail';

import TeachersList from './containers/Teachers';
import TeacherDetail from './containers/Teachers/detail';

import SchoolPeriodsList from './containers/SchoolPeriods/list';
import SchoolPeriodDetail from './containers/SchoolPeriods/detail';
import SchoolPeriodActual from './containers/SchoolPeriods/actual';

import InscriptionList from './containers/Inscription';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Menu>
            <Switch>
              <Route exact path="/home" component={Home} />

              <Route exact path="/administradores/" component={AdminsList} />
              <Route exact path="/administradores/edit/:id" component={AdminDetail} />
              <Route exact path="/administradores/create" component={AdminDetail} />

              <Route exact path="/postgrados/" component={PostgraduatesList} />
              <Route exact path="/postgrados/edit/:id" component={PostgraduateDetail} />
              <Route exact path="/postgrados/create" component={PostgraduateDetail} />

              <Route exact path="/materias/" component={SubjectsList} />
              <Route exact path="/materias/edit/:id" component={SubjectDetail} />
              <Route exact path="/materias/create" component={SubjectDetail} />

              <Route exact path="/estudiantes/" component={StudentsList} />
              <Route exact path="/estudiantes/edit/:id" component={StudentDetail} />
              <Route exact path="/estudiantes/create" component={StudentDetail} />

              <Route exact path="/profesores/" component={TeachersList} />
              <Route exact path="/profesores/edit/:id" component={TeacherDetail} />
              <Route exact path="/profesores/create" component={TeacherDetail} />

              <Route exact path="/periodo-semestral/actual" component={SchoolPeriodActual} />
              <Route exact path="/periodo-semestral/list" component={SchoolPeriodsList} />
              <Route exact path="/periodo-semestral/edit/:id" component={SchoolPeriodDetail} />
              <Route exact path="/periodo-semestral/create" component={SchoolPeriodDetail} />

              <Route exact path="/inscripcion/" component={InscriptionList} />
              <NotFound />
            </Switch>
          </Menu>
          <NotFound />
        </Switch>
      </Router>
    );
  }
}

export default App;
