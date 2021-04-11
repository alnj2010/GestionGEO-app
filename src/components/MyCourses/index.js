import React, { Component } from 'react';
import MaterialTable from 'material-table';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import Dialog from '../Dialog';
import HelpButton from '../HelpButton';

class SubjectsList extends Component {
  constructor() {
    super();
    this.state = {
      func: null,
    };
  }

  transformData = (myCourses) => {
    if (Array.isArray(myCourses))
      return myCourses.map((course) => {
        return {
          id: course.id,
          subjectId: course.subject_id,
          courseCode: course.subject.code,
          courseName: course.subject.name,
          uc: course.subject.uc,
          enrolled: course.enrolled_students,
          limit: course.limit,
        };
      });
    return [];
  };

  handleDialogShow = (action, func) => {
    const { show } = this.props;
    this.setState({ func }, () => {
      show(action);
    });
  };

  render = () => {
    const { myCourses, history, width, isLoading } = this.props;
    const { func } = this.state;
    const matches = isWidthUp('sm', width);
    return (
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <MaterialTable
            columns={[
              { title: '#', field: 'id', hidden: true },
              { title: '#', field: 'subjectId', hidden: true },
              { title: 'Codigo', field: 'courseCode' },
              { title: 'Asignatura', field: 'courseName' },
              { title: 'Unidades de Credito', field: 'uc' },
              { title: 'Cursando', field: 'enrolled' },
              { title: 'limite', field: 'limit' },
            ]}
            data={this.transformData(myCourses)}
            title={
              matches ? (
                <>
                  Asignaturas impartidas{' '}
                  <HelpButton>
                    <div>
                      <b>Asignaturas impartidas</b>
                    </div>
                    <div>
                      Las Asignaturas son aperturadas por el administrador de GestionGeo al inicio
                      de cada periodo academico. Los docente son responsables de impartir y
                      calificar a los estudiantes que estan inscritos en dichas asignaturas durante
                      el periodo en curso.
                    </div>
                    <br />
                    <div>
                      Abajo se listan las Asignaturas ha impartir en el periodo academico en curso
                    </div>
                  </HelpButton>
                </>
              ) : (
                ''
              )
            }
            actions={[
              {
                icon: 'visibility',
                tooltip: 'Ver detalles',
                onClick: (event, rowData) => {
                  history.push(`/mis-cursos/curso/${rowData.subjectId}/${rowData.id}`);
                },
              },
            ]}
            localization={{
              header: {
                actions: 'Acciones',
              },
              body: {
                emptyDataSourceMessage: myCourses.message,
              },
            }}
            options={{
              pageSize: 10,
              search: true,
              exportButton: true,
            }}
            onChangePage={() => {
              window.scroll(0, 0);
            }}
            isLoading={isLoading}
          />
        </Grid>
        <Dialog handleAgree={func} />
      </Grid>
    );
  };
}

SubjectsList.propTypes = {
  myCourses: PropTypes.oneOfType([
    PropTypes.shape({ message: PropTypes.string, error: PropTypes.string }),
    PropTypes.arrayOf(PropTypes.shape({})),
  ]).isRequired,

  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  width: PropTypes.string.isRequired,
  show: PropTypes.func.isRequired,
};

export default withWidth()(SubjectsList);
