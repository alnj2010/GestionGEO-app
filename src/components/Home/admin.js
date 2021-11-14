import React from 'react';
import PropTypes from 'prop-types';

import { getSessionUser, getSessionUserRol } from '../../storage/sessionStorage';
import PresentationHome from './PresentationHome';
import WarningStudents from '../WarningStudents';

function AdminHome({
  warningStudents,
  history,
  isLoading,
  updateStudentStatus,
}) {
  const {
    level_instruction: levelInstruction,
    first_name: firstName,
    second_name: secondName,
    first_surname: firstSurname,
    second_surname: secondSurname,
    sex,
    administrator: { rol, principal },
  } = getSessionUser();

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
        rol={rol}
        principal={principal}
        userRol={userRol}
      />
      <WarningStudents
        warningStudents={warningStudents}
        history={history}
        isLoading={isLoading}
        updateStudentStatus={updateStudentStatus}
      />
      
    </>
  );
}

AdminHome.propTypes = {
  schoolPeriods: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  history: PropTypes.shape({}).isRequired,
  getReport: PropTypes.func.isRequired,
  updateStudentStatus: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  warningStudents: PropTypes.oneOfType([
    PropTypes.shape({ message: PropTypes.string, error: PropTypes.string }),
    PropTypes.arrayOf(PropTypes.shape({})),
  ]).isRequired,
};

export default React.memo(AdminHome);
