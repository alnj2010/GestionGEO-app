import React from 'react';
import { connect } from 'react-redux';
import StudentConstance from '../../components/Constance/student';
import { getSessionStudentId } from '../../storage/sessionStorage';

function StudentConstanceContainer() {
  const id = getSessionStudentId();

  return <StudentConstance id={id} />;
}

StudentConstanceContainer.propTypes = {};
const mS = () => ({});

const mD = {};

export default connect(mS, mD)(StudentConstanceContainer);
