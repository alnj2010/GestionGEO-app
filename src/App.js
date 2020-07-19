import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import NotFound from './components/NotFound';
import Login from './containers/Login';
import Menu from './components/Menu';
import Home from './components/Home';

import MisCursos from './containers/MyCourses';
import CourseDetail from './containers/MyCourses/detail';

import ChangePassword from './containers/ChangePassword';

import Constancia from './components/Constance';

import Inscription from './containers/Inscriptions';

import MiPerfil from './containers/MiPerfil';

import AdminsList from './containers/Admins';
import AdminDetail from './containers/Admins/detail';

import SchoolProgramsList from './containers/SchoolPrograms';
import SchoolProgramDetail from './containers/SchoolPrograms/detail';

import SubjectsList from './containers/Subjects';
import SubjectDetail from './containers/Subjects/detail';

import StudentsList from './containers/Students';
import StudentDetail from './containers/Students/detail';
import StudentSchoolProgramDetail from './containers/Students/schoolProgram';
import StudentInscription from './containers/Students/inscription';
import StudentInscriptions from './containers/Students/inscriptions';

import TeachersList from './containers/Teachers';
import TeacherDetail from './containers/Teachers/detail';

import SchoolPeriodsList from './containers/SchoolPeriods/list';
import SchoolPeriodDetail from './containers/SchoolPeriods/detail';
import SchoolPeriodActual from './containers/SchoolPeriods/actual';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Menu>
          <Switch>
            <Route exact path="/inscripcion" component={Inscription} />

            <Route exact path="/home" component={Home} />
            <Route exact path="/cambio-clave" component={ChangePassword} />
            <Route exact path="/mi-perfil/:id" component={MiPerfil} />
            <Route exact path="/constancias" component={Constancia} />

            <Route exact path="/mis-cursos" component={MisCursos} />
            <Route exact path="/mis-cursos/curso/:id" component={CourseDetail} />

            <Route exact path="/administradores/" component={AdminsList} />
            <Route exact path="/administradores/edit/:id" component={AdminDetail} />
            <Route exact path="/administradores/create" component={AdminDetail} />

            <Route exact path="/programas-academicos/" component={SchoolProgramsList} />
            <Route exact path="/programas-academicos/edit/:id" component={SchoolProgramDetail} />
            <Route exact path="/programas-academicos/create" component={SchoolProgramDetail} />

            <Route exact path="/materias/" component={SubjectsList} />
            <Route exact path="/materias/edit/:id" component={SubjectDetail} />
            <Route exact path="/materias/create" component={SubjectDetail} />

            <Route exact path="/estudiantes/" component={StudentsList} />
            <Route exact path="/estudiantes/edit/:id" component={StudentDetail} />
            <Route
              exact
              path="/estudiantes/edit/:userId/programa-academico/:studentId"
              component={StudentSchoolProgramDetail}
            />
            <Route
              exact
              path="/estudiantes/edit/:userId/programa-academico/create"
              component={StudentSchoolProgramDetail}
            />
            <Route exact path="/estudiantes/create" component={StudentDetail} />
            <Route exact path="/estudiantes/inscripciones/:id" component={StudentInscriptions} />
            <Route
              exact
              path="/estudiantes/inscripciones/:id/nueva"
              component={StudentInscription}
            />
            <Route
              exact
              path="/estudiantes/inscripciones/:id/:idSchoolPeriod"
              component={StudentInscription}
            />

            <Route exact path="/profesores/" component={TeachersList} />
            <Route exact path="/profesores/edit/:id" component={TeacherDetail} />
            <Route exact path="/profesores/create" component={TeacherDetail} />

            <Route exact path="/periodo-semestral/actual" component={SchoolPeriodActual} />
            <Route exact path="/periodo-semestral/list" component={SchoolPeriodsList} />
            <Route exact path="/periodo-semestral/edit/:id" component={SchoolPeriodDetail} />
            <Route exact path="/periodo-semestral/create" component={SchoolPeriodDetail} />
            <NotFound />
          </Switch>
        </Menu>
        <NotFound />
      </Switch>
    </Router>
  );
}

export default App;
