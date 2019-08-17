import React, { Component } from 'react';
import { func, object } from 'prop-types';
import { connect } from 'react-redux';
import {
  findPostgraduateById,
  updatePostgraduate,
  deletePostgraduate,
  cleanSelectedPostgraduate,
  savePostgraduate,
} from '../../actions/postgraduate';
import PostgraduateDetail from '../../components/Postgraduates/detail';
import { define, cleanDialog } from '../../actions/dialog';
export class PostgraduateDetailContainer extends Component {
  componentDidMount = () => {
    const { match, findPostgraduateById, define } = this.props;
    if (match.params.id) findPostgraduateById(match.params.id);
    define('postgrado');
  };
  componentWillUnmount = () => {
    this.props.cleanSelectedPostgraduate();
    this.props.cleanDialog();
  };

  savePostgraduate = values => {
    const {
      match,
      updatePostgraduate,
      findPostgraduateById,
      savePostgraduate,
      history,
    } = this.props;
    const payload = { ...values };

    if (match.params.id) updatePostgraduate({ ...payload, ...match.params });
    else
      savePostgraduate({ ...payload }).then(response => {

        if (response) {
          findPostgraduateById(response).then(res => history.push(`edit/${response}`));
        }
      });
  };

  goBack = () => {
    const { history } = this.props;

    history.goBack();
  };

  handlePostgraduateDelete = () => {
    const { deletePostgraduate, history, match } = this.props;
    deletePostgraduate(match.params.id).then(res => history.push('/postgrados'));
  };


  render() {
    const {
      postgraduate: { id },
    } = this.props;

    return (
      <PostgraduateDetail
        savePostgraduate={this.savePostgraduate}
        goBack={this.goBack}
        postgraduateId={id}
        handlePostgraduateDelete={this.handlePostgraduateDelete}
      />
    );
  }
}

PostgraduateDetailContainer.propTypes = {
  deletePostgraduate: func.isRequired,
  history: object.isRequired,
  match: object.isRequired,
  updatePostgraduate: func.isRequired,
  findPostgraduateById: func.isRequired,
  savePostgraduate: func.isRequired,
};

const mS = state => ({
  postgraduate: state.postgraduateReducer.selectedPostgraduate,
});

const mD = {
  findPostgraduateById,
  updatePostgraduate,
  savePostgraduate,
  deletePostgraduate,
  define,
  cleanSelectedPostgraduate,
  cleanDialog,
};

PostgraduateDetailContainer = connect(
  mS,
  mD,
)(PostgraduateDetailContainer);

export default PostgraduateDetailContainer;
