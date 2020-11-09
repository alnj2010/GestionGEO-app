import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, reduxForm } from 'redux-form';
import MaterialTable from 'material-table';
import { withStyles } from '@material-ui/core/styles';

import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import { Grid, Fab, Typography } from '@material-ui/core';
import RenderFields from '../RenderFields';
import CustomizedSnackbar from '../Snackbar';
import { FINANCING_TYPE } from '../../services/constants';
import { jsonToOptions } from '../../helpers';
import Table from './Table';
import TableBodyRow from './Row';

const styles = () => ({
  tableContainer: {
    marginTop: 20,
  },
});
function Inscription({
  subjects,
  saveInscription,
  width,
  finalWorks,
  classes,
  handleSubmit,
  pristine,
  submitting,
  valid,
}) {
  const matches = isWidthUp('sm', width);

  const [finalWorksData, setFinalWorksData] = useState([]);
  const tableFinalWorkRef = useRef(null);
  const tableSubjectRef = useRef(null);
  useEffect(() => {
    if (finalWorks && finalWorks.length) {
      setFinalWorksData(
        finalWorks.map((fw) => {
          return {
            id: fw.id,
            code: fw.code,
            name: fw.name,
            laboratoryHours: fw.laboratory_hours,
            practicalHours: fw.practical_hours,
            theoreticalHours: fw.theoretical_hours,
            uc: fw.uc,
            title: 'Sin titulo',
          };
        })
      );
    }
  }, [finalWorks]);

  const transformData = () => {
    if (subjects)
      return subjects.map((subject) => {
        return {
          school_period_subject_teacher_id: subject.id,
          subject: subject.subject.name,
          teacher: `${subject.teacher.user.first_name} ${subject.teacher.user.first_surname}`,
          duty: subject.duty,
          uc: subject.subject.uc,
          enrolled_students: subject.enrolled_students,
        };
      });
    return [];
  };

  let isFinalSubject;
  if (finalWorks && finalWorks.length) {
    const [item] = finalWorks;
    isFinalSubject = item.is_final_subject;
  }
  const handleInscriptionStudent = (values) => {
    const enrolledSubjects = tableSubjectRef.current.props.data.filter(
      (item) => item.tableData.checked
    );
    let enrolledProjectOrWorks;
    let enrolledFinalWorks;
    let enrolledProjects;

    if (tableFinalWorkRef) {
      enrolledProjectOrWorks = tableFinalWorkRef.current.props.data.filter(
        (item) => item.tableData.checked
      );

      if (isFinalSubject) {
        enrolledFinalWorks = enrolledProjectOrWorks;
      } else {
        enrolledProjects = enrolledProjectOrWorks;
      }
    }
    saveInscription({ enrolledSubjects, enrolledProjects, enrolledFinalWorks, ...values });
  };
  return (
    <Grid container>
      <Typography variant="h6" gutterBottom>
        Materias disponibles para inscripción
      </Typography>
      <Grid item xs={12}>
        <MaterialTable
          tableRef={tableSubjectRef}
          title={matches ? 'inscripción' : ''}
          components={{
            Toolbar: () => null,
          }}
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
          data={transformData()}
          localization={{
            body: {
              emptyDataSourceMessage: 'No hay materias disponibles',
            },
          }}
          options={{
            search: false,
            selection: true,
            paging: false,
            showTextRowsSelected: false,
          }}
        />
      </Grid>
      {finalWorks && finalWorks.length ? (
        <Grid item className={classes.tableContainer} xs={12}>
          <Table
            tableRef={tableFinalWorkRef}
            title={matches ? 'inscripción' : ''}
            options={{
              selection: true,
              search: false,
              paging: false,
              actionsColumnIndex: -1,
            }}
            components={{
              Row: TableBodyRow,
              Toolbar: () => null,
            }}
            columns={[
              {
                title: 'id',
                field: 'id',
                hidden: true,
              },
              {
                title: 'Codigo',
                field: 'code',
                editable: 'never',
              },
              {
                title: 'Titulo',
                field: 'title',
                editable: 'onUpdate',
              },
              { title: 'Nombre', field: 'name', editable: 'never' },
              { title: 'Unidades de Credito', field: 'uc', editable: 'never' },
            ]}
            data={finalWorksData}
            localization={{
              body: {
                emptyDataSourceMessage: 'No hay Trabajos finales disponibles',
              },
            }}
            editable={{
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve, reject) => {
                  const data = [...finalWorksData];
                  const index = data.indexOf(oldData);
                  data[index] = newData;
                  setFinalWorksData(data);

                  resolve();
                }),
            }}
          />
        </Grid>
      ) : null}
      <Grid container className={classes.tableContainer}>
        <Form onSubmit={handleSubmit(handleInscriptionStudent)} style={{ width: '100%' }}>
          <Grid container>
            <Grid item xs={3}>
              <RenderFields>
                {[
                  {
                    field: 'financing',
                    id: 'financing',
                    type: 'select',
                    label: 'financiación',
                    options: jsonToOptions(FINANCING_TYPE),
                  },
                ]}
              </RenderFields>
            </Grid>
            <Grid item xs={6}>
              <RenderFields>
                {[
                  {
                    label: 'Descripcion financiación',
                    field: 'financing_description',
                    id: 'financing_description',
                    type: 'text',
                  },
                ]}
              </RenderFields>
            </Grid>

            <Grid item container justify="center" xs={3}>
              <Fab
                variant="extended"
                size="medium"
                color="primary"
                aria-label="Add"
                disabled={
                  !valid ||
                  pristine ||
                  submitting ||
                  !tableSubjectRef.current.props.data.filter((item) => item.tableData.checked)
                    .length
                }
                type="submit"
              >
                Inscribir
              </Fab>
            </Grid>
          </Grid>
          <CustomizedSnackbar />
        </Form>
      </Grid>
    </Grid>
  );
}

Inscription.propTypes = {
  subjects: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  saveInscription: PropTypes.func.isRequired,
  width: PropTypes.string.isRequired,
};

const inscriptionStudentValidator = (values) => {
  const errors = {};
  if (!values.financing_description) {
    errors.financing_description = 'descripcion requerida';
  }
  if (!values.financing) {
    errors.financing = 'financiacion requerida';
  }
  return errors;
};

const InscriptionWrapper = reduxForm({
  form: 'inscriptionStudent',
  validate: inscriptionStudentValidator,
})(Inscription);

export default withStyles(styles)(withWidth()(InscriptionWrapper));
