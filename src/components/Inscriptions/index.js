import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Form, reduxForm } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';

import { Grid, Fab, Typography } from '@material-ui/core';
import FinalWorkTable from './FinalWorkTable';
import SubjectTable from './SubjectTable';
import RenderFields from '../RenderFields';
import CustomizedSnackbar from '../Snackbar';
import { FINANCING_TYPE } from '../../services/constants';
import { jsonToOptions } from '../../helpers';
import HelpButton from '../HelpButton';

const styles = () => ({
  tableContainer: {
    marginTop: 20,
  },
});
function Inscription({
  subjects,
  saveInscription,
  finalWorks,
  approvedProjects,
  classes,
  handleSubmit,
  pristine,
  submitting,
  valid,
  teachers,
  message,
}) {
  const [finalWorkSelected, setFinalWorkSelected] = useState([]);
  const [subjectsSelected, setSubjectsSelected] = useState([]);

  let isFinalSubject;
  if (finalWorks && finalWorks.length) {
    const [item] = finalWorks;
    isFinalSubject = item.is_final_subject;
  }
  const handleInscriptionStudent = (values) => {
    let enrolledFinalWorks;
    let enrolledProjects;

    if (isFinalSubject) {
      enrolledFinalWorks = finalWorkSelected;
    } else {
      enrolledProjects = finalWorkSelected;
    }

    saveInscription({
      enrolledSubjects: subjectsSelected,
      enrolledProjects,
      enrolledFinalWorks,
      ...values,
    });
  };
  return (
    <Grid container>
      <Typography variant="h6" gutterBottom>
        Asignaturas disponibles para inscripción{' '}
        <HelpButton>
          <div>
            <b>Asignaturas disponibles</b>
          </div>
          <div>
            Abajo se listan las Asignaturas disponibles para inscribir según el programa académico
            al que pertenezca. Proceda a seleccionar las asignaturas que desea inscribir y
            posteriormente llene los campos de financiación y descripción, para luego hacer click en
            el boton <strong>INSCRIBIR</strong>
          </div>
          <br />
          <div>
            Abajo se listan los distintos administradores existenten en el Postgrado de Geoquímica
          </div>
        </HelpButton>
      </Typography>

      <SubjectTable
        subjects={subjects}
        setSubjectsSelected={setSubjectsSelected}
        message={message}
      />
      {finalWorks && finalWorks.length ? (
        <FinalWorkTable
          finalWorks={finalWorks}
          teachers={teachers}
          isFinalSubject={isFinalSubject}
          setFinalWorkSelected={setFinalWorkSelected}
          approvedProjects={approvedProjects}
        />
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
                    field: 'financingDescription',
                    id: 'financingDescription',
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
                  !(finalWorkSelected.length + subjectsSelected.length) ||
                  (finalWorkSelected.length &&
                    finalWorkSelected.findIndex(
                      (fw) =>
                        fw.title === '' ||
                        (isFinalSubject && fw.projectId === '') ||
                        (isFinalSubject && fw.advisors === '')
                    ) !== -1)
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
};

const inscriptionStudentValidator = (values) => {
  const errors = {};
  if (!values.financingDescription) {
    errors.financingDescription = 'descripcion requerida';
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

export default withStyles(styles)(InscriptionWrapper);
