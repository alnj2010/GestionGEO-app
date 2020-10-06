import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import { getSessionUser, getSessionUserRol } from '../../storage/sessionStorage';

import PresentationHome from './PresentationHome';

const styles = () => ({});
function AdminHome() {
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
  );
}

AdminHome.propTypes = {
  classes: PropTypes.shape({
    welcome: PropTypes.string,
    welcome__pictureContainer: PropTypes.string,
    welcome__picture: PropTypes.string,
    welcome__info: PropTypes.string,
    welcome__infoUsername: PropTypes.string,
    welcome__infoUserRol: PropTypes.string,
  }).isRequired,
};

export default React.memo(withStyles(styles)(AdminHome));
