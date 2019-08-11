import React, { Component } from 'react';
import ExternalLinksList from '../../components/ExternalLinks';
import { func } from 'prop-types';
import { connect } from 'react-redux';
import {
  getList,
  deleteLink,
  saveLink,
  updateLink,
} from '../../actions/externalLinks';
import { show } from '../../actions/snackbar';

class LinksContainer extends Component {
  componentDidMount = () => {
    const { getList } = this.props;
    getList();
  };

  handleDelete = linkId => {
    const { getList, deleteLink } = this.props;
    deleteLink(linkId).then(res => getList());
  };

  handleAdd = data => {
    const { getList, saveLink, show } = this.props;
    if (
      data.url.substring(0, 8) !== 'https://' &&
      data.url.substring(0, 7) !== 'http://'
    )
      show('Please introduce a valid protocol: https:// or http://', 'error');
    else saveLink(data).then(res => getList());
  };

  handleUpdate = data => {
    const { getList, updateLink, show } = this.props;
    if (
      data.url.substring(0, 8) !== 'https://' &&
      data.url.substring(0, 7) !== 'http://'
    )
      show('Please introduce a valid protocol: https:// or http://', 'error');
    else updateLink(data).then(res => getList());
  };

  render = () => {
    const { links } = this.props;
    return (
      <ExternalLinksList
        links={links}
        isLoading={false}
        handleDelete={this.handleDelete}
        handleAdd={this.handleAdd}
        handleUpdate={this.handleUpdate}
      />
    );
  };
}

LinksContainer.propTypes = {
  getList: func.isRequired,
  deleteLink: func.isRequired,
  saveLink: func.isRequired,
  updateLink: func.isRequired,
};

const mS = state => ({
  links: state.linkReducer.list,
});

const mD = {
  getList,
  deleteLink,
  updateLink,
  saveLink,
  show,
};

LinksContainer = connect(
  mS,
  mD,
)(LinksContainer);

export default LinksContainer;
