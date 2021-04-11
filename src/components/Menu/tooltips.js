import React from 'react';
import Users from '@material-ui/icons/Group';
import Subject from '@material-ui/icons/LocalLibrary';
import SchoolProgram from '@material-ui/icons/Extension';
import InsertInvitation from '@material-ui/icons/InsertInvitation';
import Actual from '@material-ui/icons/AlarmAdd';
import ListIcon from '@material-ui/icons/List';
import Download from '@material-ui/icons/Archive';

import Cursos from '@material-ui/icons/LibraryBooks';
import Visibility from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import adminStep1 from '../../images/adminWelcome.jpg';
import adminStep2 from '../../images/stepUsers.jpg';
import adminStep3 from '../../images/stepSubjects.jpg';
import adminStep4 from '../../images/stepSchoolPrograms.jpg';
import adminStep5 from '../../images/stepSchoolPeriod.jpg';
import adminStep6 from '../../images/stepDowload.jpg';

import teacherStep1 from '../../images/teacherWelcome.jpg';
import teacherStep2 from '../../images/teacherCourses.jpg';
import teacherStep3 from '../../images/teacherClassroom.png';

import { getSessionUser } from '../../storage/sessionStorage';

// eslint-disable-next-line import/prefer-default-export
export const tutorialSteps = {
  A: [
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
              A través del menú lateral izquierdo, haciendo click en el ítem{' '}
              <strong>Usuarios</strong> . Ud. accederá a la lista donde podrá agregar nuevos
              usuarios, acceder a los detalles de cada uno y modificar sus valores si es necesario.
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
                Haciendo click en el ítem <strong>Programas Académicos</strong> . Ud. podrá acceder
                a la lista de programas académicos existentes, como también incorporar nuevos y
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
  ],
  T: [
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
                Ud ha ingresado como <strong>Docente</strong> de GestionGeo.
              </span>
              En este modulo ud. podrá gestionar sus asignaturas impartidas. Esta comprendido por
              las siguientes secciones:
              <ul>
                <li>
                  Asignaturas impartidas <Cursos />
                </li>
                <li>
                  Descargas <Download />
                </li>
              </ul>
            </div>
          </>
        );
      },
      image: teacherStep1,
    },
    {
      // eslint-disable-next-line react/display-name
      Content: ({ classes }) => {
        return (
          <>
            <div className={classes.title}>
              Asignaturas Impartidas <Cursos />
            </div>
            <div className={classes.descriptionContainer}>
              A través del menú lateral izquierdo, haciendo click en el ítem{' '}
              <strong>Asignaturas Impartidas</strong> Ud. accederá a la lista de asignaturas
              impartidas en el periodo escolar actual, y por medio del icono <Visibility /> podrá
              ingresar a la lista de los estudiantes en dicha asignatura.
            </div>
          </>
        );
      },
      image: teacherStep2,
    },
    {
      // eslint-disable-next-line react/display-name
      Content: ({ classes }) => {
        return (
          <>
            <div className={classes.title}>Estudiantes</div>
            <div className={classes.descriptionContainer}>
              Luego de haber seleccionado, por medio de <Visibility />, una asignatura de la lista
              en <strong>Asignaturas Impartidas</strong> Ud. accederá a la lista de los estudiantes
              en donde podra ver, en la columna <em>Calificacion</em>, su estatus, inicialmente
              estará en 'sin calificar', pero cuando el administrador de GestionGeo habilite la
              carga de notas podra observar la columna <em>Acciones</em> y haciendo click en el
              icono <EditIcon /> podra cargar la nota del estudiante.
            </div>
          </>
        );
      },
      image: teacherStep3,
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
  ],
  S: null,
};
