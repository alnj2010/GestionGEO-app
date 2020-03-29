import React, { Component } from 'react';
import StudentHomeContainer from '../../containers/Home/student';
import TeacherHomeContainer from '../../containers/Home/teacher';
import AdminHomeContainer from '../../containers/Home/admin';

import { getSessionUserRol } from '../../storage/sessionStorage';

class Home extends Component {
    render() {
        const rol = getSessionUserRol();

        switch (rol) {
            case 'A':
                return <AdminHomeContainer />;
            case 'T':
                return <TeacherHomeContainer />;
            case 'S':
                return <StudentHomeContainer />;
            default:
                return null;
        }
    }
}

Home.propTypes = {};

export default Home;
