import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MaterialTable from 'material-table';

import { Grid, Fab } from '@material-ui/core';

class Inscription extends Component {
  transformData = (subjects) => {
    if (subjects)
      return subjects.map((subject) => {
        return {
          school_period_subject_teacher_id: subject.id,
          subject: subject.subject.subject_name,
          teacher: `${subject.teacher.user.first_name} ${subject.teacher.user.first_surname}`,
          duty: subject.duty,
          uc: subject.subject.uc,
          enrolled_students: subject.enrolled_students,
        };
      });
    return [];
  };

  render() {
    const { subjects, saveInscription } = this.props;
    const enrolledSubjects = [];
    return (
      <Grid container>
        <Grid item xs={12}>
          <MaterialTable
            title="Inscripcion"
            columns={[
              {
                title: 'school_period_subject_teacher_id',
                field: 'school_period_subject_teacher_id',
                hidden: true,
              },
              { title: 'Materia', field: 'subject' },
              { title: 'Profesor', field: 'teacher' },
              { title: 'Aranceles', field: 'duty' },
              { title: 'Unidades de credito', field: 'uc' },
              { title: 'Inscritos', field: 'enrolled_students' },
            ]}
            onSelectionChange={() => enrolledSubjects}
            data={this.transformData(subjects)}
            localization={{
              header: {
                actions: 'Acciones',
              },
            }}
            options={{
              selection: true,
            }}
          />
        </Grid>
        <Grid container justify="center">
          <Fab
            variant="extended"
            size="medium"
            color="primary"
            aria-label="Add"
            onClick={() => saveInscription(enrolledSubjects)}
          >
            Inscribir Materias
          </Fab>
        </Grid>
      </Grid>
    );
  }
}

Inscription.propTypes = {
  subjects: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  saveInscription: PropTypes.func.isRequired,
};

export default Inscription;
