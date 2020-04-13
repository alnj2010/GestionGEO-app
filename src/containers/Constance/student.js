import React, { Component } from 'react';
import { connect } from 'react-redux';
import StudentConstance from '../../components/Constance/student';
import { getSessionStudentId } from '../../storage/sessionStorage';

export class StudentConstanceContainer extends Component {
    render() {
        const id = getSessionStudentId();

        return <StudentConstance id={id} />;
    }
}

StudentConstanceContainer.propTypes = {};
const mS = (state) => ({});

const mD = {};
StudentConstanceContainer = connect(mS, mD)(StudentConstanceContainer);

export default StudentConstanceContainer;
