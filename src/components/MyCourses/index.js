import React, { Component } from 'react';
import MaterialTable from 'material-table';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import Dialog from '../Dialog';

class SubjectsList extends Component {
  constructor() {
    super();
    this.state = {
      func: null,
    };
  }

  transformData = (myCourses) => {
    if (myCourses)
      return myCourses.map((course) => {
        return {
          id: course.id,
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
    const { myCourses, history } = this.props;
    const { func } = this.state;
    return (
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <MaterialTable
            columns={[
              { title: '#', field: 'id', hidden: true },
              { title: 'Codigo', field: 'courseCode' },
              { title: 'Materia', field: 'courseName' },
              { title: 'Unidades de Credito', field: 'uc' },
              { title: 'Cursando', field: 'enrolled' },
              { title: 'limite', field: 'limit' },
            ]}
            data={this.transformData(myCourses)}
            title="Mis Cursos"
            actions={[
              {
                icon: 'visibility',
                tooltip: 'Ver detalles',
                onClick: (event, rowData) => {
                  history.push(`/mis-cursos/curso/${rowData.id}`);
                },
              },
            ]}
            localization={{
              header: {
                actions: 'Acciones',
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
          />
        </Grid>
        <Dialog handleAgree={func} />
      </Grid>
    );
  };
}

SubjectsList.propTypes = {
  myCourses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,

  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,

  show: PropTypes.func.isRequired,
};

export default SubjectsList;
