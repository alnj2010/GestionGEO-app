import React from 'react';
import StudentHomeContainer from '../../containers/Home/student';
import TeacherHomeContainer from '../../containers/Home/teacher';
import AdminHome from './admin';

import { getSessionUserRol } from '../../storage/sessionStorage';

function Home() {
    const rol = getSessionUserRol();

    switch (rol) {
        case 'A':
            return <AdminHome />;
        case 'T':
            return <TeacherHomeContainer />;
        case 'S':
            return <StudentHomeContainer />;
        default:
            return null;
    }
}

export default Home;
