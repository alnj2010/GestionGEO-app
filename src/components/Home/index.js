import React from 'react';
import StudentHomeContainer from '../../containers/Home/student';
import TeacherHomeContainer from '../../containers/Home/teacher';
import AdminHomeContainer from '../../containers/Home/admin';

import { getSessionUserRol } from '../../storage/sessionStorage';

function Home(props) {
  const rol = getSessionUserRol();

  switch (rol) {
    case 'A':
      return <AdminHomeContainer {...props} />;
    case 'T':
      return <TeacherHomeContainer {...props} />;
    case 'S':
      return <StudentHomeContainer {...props} />;
    default:
      return null;
  }
}

export default Home;
