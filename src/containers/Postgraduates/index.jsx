import React, { Component } from 'react';
import { array, object, func } from 'prop-types';
import { connect } from 'react-redux';
import { define, cleanDialog, show } from '../../actions/dialog';
import { getList, deletePostgraduate } from '../../actions/postgraduate';
import PostgraduatesList from '../../components/Postgraduates';

export class PostgraduatesListContainer extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
    };
  }
  componentDidMount = () => {
    const { getList, define } = this.props;
    getList().then(() => this.setState({ isLoading: false }));
    define('Postgrado');
  };
  componentWillUnmount = () => {
    this.props.cleanDialog();
  };

  handleDeletePostgraduate = id => {
    const { getList, deletePostgraduate } = this.props;
    deletePostgraduate(id).then(res => getList());
  };

  render() {
    const { postgraduates, history, show } = this.props;
    const { isLoading } = this.state;
    return (
      <PostgraduatesList
        postgraduates={postgraduates}
        isLoading={isLoading}
        history={history}
        handlePostgraduateDetail={this.handlePostgraduateDetail}
        handleDeletePostgraduate={this.handleDeletePostgraduate}
        show={show}
      />
    );
  }
}

PostgraduatesListContainer.propTypes = {
  postgraduates: array,
  history: object.isRequired,
  getList: func.isRequired,
  deletePostgraduate: func.isRequired,
};

const mS = state => ({
  postgraduates: state.postgraduateReducer.list,
});

const mD = {
  getList,
  deletePostgraduate,
  cleanDialog,
  define,
  show,
};

PostgraduatesListContainer = connect(
  mS,
  mD,
)(PostgraduatesListContainer);

export default PostgraduatesListContainer;
