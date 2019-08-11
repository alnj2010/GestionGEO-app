import React, { Component } from 'react';
import { func, object } from 'prop-types';
import { connect } from 'react-redux';
import BrandDetail from '../../components/Brands/detail';
import {
  saveBrand,
  findBrandById,
  cleanSelectedBrand,
  deleteBrand,
  updateAdminNotes,
  updateBrand,
} from '../../actions/brand';
import { define, cleanDialog } from '../../actions/dialog';

export class BrandDetailContainer extends Component {

  componentDidMount = () => {
    const { match, findBrandById, define } = this.props;
    if (match.params.id) findBrandById(match.params.id);
    define('brand');
  };
  componentWillUnmount = () => {
    this.props.cleanSelectedBrand();
    this.props.cleanDialog();
  };

  handleSaveBrand = values => {
    const {
      history,
      match,
      findBrandById,
      updateBrand,
      saveBrand,
    } = this.props;
    if (match.params.id) updateBrand({ ...values, ...match.params});
    else
      saveBrand({ ...values }).then(response => {
        if (response) {
          findBrandById(response).then(res => history.push(`edit/${response}`));
        }
      });
  };

  goBack = () => {
    const { history } = this.props;
    history.goBack();
  };

  handleBrandDelete = () => {
    const { deleteBrand, history, match } = this.props;
    deleteBrand(match.params.id).then(res => history.push('/brands/list'));
  };

  saveAdminNotes = values => {
    const { match, updateAdminNotes } = this.props;
    updateAdminNotes({ ...values, id: match.params.id });
  };

  render() {
    const {
      brand: { id },
    } = this.props;
    return (
      <BrandDetail
        handleSaveBrand={this.handleSaveBrand}
        goBack={this.goBack}
        brandId={id}
        handleBrandDelete={this.handleBrandDelete}
        saveAdminNotes={this.saveAdminNotes}
      />
    );
  }
}

BrandDetailContainer.propTypes = {
  deleteBrand: func.isRequired,
  history: object.isRequired,
  match: object.isRequired,
  findBrandById: func.isRequired,
  updateBrand: func.isRequired,
  saveBrand: func.isRequired,
};

const mS = state => ({
  brand: state.brandReducer.selectedBrand,
});

const mD = {
  saveBrand,
  findBrandById,
  cleanSelectedBrand,
  deleteBrand,
  updateBrand,
  define,
  cleanDialog,
  updateAdminNotes,
};

BrandDetailContainer = connect(
  mS,
  mD,
)(BrandDetailContainer);

export default BrandDetailContainer;
