import React, { Component } from 'react';
import { array, object, func } from 'prop-types';
import { connect } from 'react-redux';
import { define, cleanDialog, show } from '../../actions/dialog';
import { getList, deleteSubject } from '../../actions/subject';
import InscriptionList from '../../components/Inscription';

export class InscriptionListContainer extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
    };
  }
  componentDidMount = () => {
    const { getList, define } = this.props;
    getList().then(() => this.setState({ isLoading: false }));
    define('Materia');
  };
  componentWillUnmount = () => {
    this.props.cleanDialog();
  };

  handleDeleteSubject = id => {
    const { getList, deleteSubject } = this.props;
    deleteSubject(id).then(res => getList());
  };

  render() {
    const { subjects, history, show } = this.props;
    const { isLoading } = this.state;
    return (
      <InscriptionList
        subjects={subjects}
        isLoading={isLoading}
        history={history}
        handleSubjectDetail={this.handleSubjectDetail}
        handleDeleteSubject={this.handleDeleteSubject}
        show={show}
      />
    );
  }
}

InscriptionListContainer.propTypes = {
  subjects: array,
  history: object.isRequired,
  getList: func.isRequired,
  deleteSubject: func.isRequired,
};

const mS = state => ({
  subjects: state.subjectReducer.list,
});

const mD = {
  getList,
  deleteSubject,
  cleanDialog,
  define,
  show,
};

InscriptionListContainer = connect(
  mS,
  mD,
)(InscriptionListContainer);

export default InscriptionListContainer;
