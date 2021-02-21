import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import WelcomeModal from '../WelcomeModal';
import { getSessionUser, getSessionUserRol } from '../../storage/sessionStorage';

import PresentationHome from './PresentationHome';
import GenerateReport from '../GenerateReport';
import WarningStudents from '../WarningStudents';

const styles = (theme) => ({
  root: {
    maxWidth: 400,
    flexGrow: 1,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing.unit * 4,
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: 255,
    display: 'block',
    maxWidth: 400,
    overflow: 'hidden',
    width: '100%',
  },
});
function AdminHome({
  schoolPeriods,
  getReport,
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
      <GenerateReport schoolPeriods={schoolPeriods} getReport={getReport} />
      <WelcomeModal />
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

export default React.memo(withStyles(styles)(AdminHome));
