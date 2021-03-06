import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { getSessionUserRol } from '../../../storage/sessionStorage';
import PresentationHome from '../PresentationHome';
import CalendarStudent from './CalendarStudent';
import TableEnrolledSubjects from './TableEnrolledSubjects';
import TableEnrolledFinalWorks from './TableEnrolledFinalWorks';

const styles = () => ({});

function StudentHome({
  miPerfil,
  currentSubjects,
  classes,
  codSchoolPeriod,
  finalWorks,
  withdrawalDeadline,
  show,
  handleRetireSubject,
}) {
  const {
    level_instruction: levelInstruction,
    first_name: firstName,
    second_name: secondName,
    first_surname: firstSurname,
    second_surname: secondSurname,
    sex,
  } = miPerfil;
  const userRol = getSessionUserRol();

  return (
    <>
      <PresentationHome
        levelInstruction={levelInstruction}
        firstName={firstName}
        secondName={secondName}
        firstSurname={firstSurname}
        secondSurname={secondSurname}
        sex={sex}
        userRol={userRol}
      />
      <TableEnrolledSubjects
        currentSubjects={currentSubjects}
        codSchoolPeriod={codSchoolPeriod}
        withdrawalDeadline={withdrawalDeadline}
        show={show}
        handleRetireSubject={handleRetireSubject}
      />
      {finalWorks.length ? <TableEnrolledFinalWorks finalWorks={finalWorks} /> : null}

      <CalendarStudent currentSubjects={currentSubjects} />
    </>
  );
}

StudentHome.propTypes = {
  miPerfil: PropTypes.shape({
    first_name: PropTypes.string,
    first_surname: PropTypes.string,
    level_instruction: PropTypes.string,
    second_name: PropTypes.string,
    second_surname: PropTypes.string,
    sex: PropTypes.string,
  }).isRequired,
  classes: PropTypes.shape({
    calendar: PropTypes.string,
  }).isRequired,
  currentSubjects: PropTypes.arrayOf(PropTypes.shape({})),
};
StudentHome.defaultProps = {
  currentSubjects: null,
};

export default withStyles(styles)(StudentHome);
