import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { object, func, string, bool } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Grid,
  Button,
} from '@material-ui/core';
import {
  Form,
  reduxForm,
  change,
  submit,
  formValueSelector,
} from 'redux-form';
import Dialog from '../Dialog';
import { show } from '../../actions/dialog';
import CategoriesAssociations from './associations';
import AdminNotes from '../AdminNotes';
import RenderFields from '../RenderFields'
const styles = theme => ({
  inputLabel: {
    paddingTop: '4%',
  },
  rightInputLabel: {
    paddingTop: '4%',
    paddingLeft: '4%',
  },
  input: {
    alignSelf: 'center',
  },
  form: {
    paddingLeft: '5%',
  },
  smallIcon: {
    width: '36.5%',
    height: '36.5%',
    cursor: 'pointer',
  },
  largeIcon: {
    width: '70%',
    height: '70%',
    cursor: 'pointer',
  },
  avatarPhoto: {
    width: '50%',
    height: '50%',
    cursor: 'pointer',
  },

  photo: {
    width: '100%',
    height: '100%',
    cursor: 'pointer',
  },
  buttonContainer: { paddingTop: '2%' },
  save: {
    color: 'white',
    backgroundColor: '#61A956',
    '&:hover': {
      backgroundColor: 'rgb(78, 127, 71)',
    },
  },
  fileInput: {
    display: 'none',
  },
  date: { boxSizing: 'content-box', paddingTop: '4%' },
  lastSave: { justifyContent: 'flex-end', display: 'flex' },
  error: {
    color: 'red',
  },
});

class CategoryDetail extends Component {
  constructor() {
    super();
    this.state = {
      func: null,
    };
  }


  handleDialogShow = (action, func) => {
    this.setState({ func: func }, () => {
      this.props.show(action);
    });
  };



  render = () => {
    const {
      classes,
      handleSubmit,
      handleSaveCategory,
      categoryId,
      pristine,
      submitting,
      valid,
      avatar,
      handleCategoryDelete,
      saveAdminNotes,
      goBack,
      submit,
      categoryBrands,
      change
    } = this.props;
    const { func } = this.state;
    return (
      <Fragment>
        <Grid container spacing={32}>
          <Form onSubmit={handleSubmit(handleSaveCategory)}>
            <Grid container spacing={32}>
              <Grid item xs={12}>
                <h3>
                  {categoryId ? `Category: ${categoryId}` : 'New Category'}
                </h3>
                <hr />
              </Grid>
              <Grid item xs={6} className={classes.form}>
                <Grid container>
                <RenderFields >{[
                    {label: 'Category Title', field: 'name', id: 'title', type: 'text' },
                    {label: 'Category Position',field: 'position',id: 'position',type: 'text' },
                    {label: 'Category Description',field: 'description',id: 'description',type: 'text-area' },
                  ]}</RenderFields>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid container>
                <RenderFields >{[
                    { field: 'photo', id: 'photo', type: 'file', avatar:avatar, change:change, images: [
                      {label:' Category Avatar', classesPhoto:classes.avatarPhoto, classesDefault:classes.smallIcon },
                      {label:'Category Image',  classesPhoto:classes.photo, classesDefault:classes.largeIcon }]
                    },      
                  ]}</RenderFields>
                  <Grid item xs={12}>
                    <Grid container className={classes.buttonContainer}>
                      <Grid item xs={4}>
                        <Button variant="contained" onClick={goBack}>
                          Cancel
                        </Button>
                      </Grid>
                      <Grid item xs={4}>
                        {categoryId ? (
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() =>
                              this.handleDialogShow(
                                'delete',
                                handleCategoryDelete,
                              )
                            }
                          >
                            Delete
                          </Button>
                        ) : null}
                      </Grid>
                      <Grid item xs={4}>
                        <Button
                          variant="contained"
                          className={classes.save}
                          onClick={() =>
                            categoryId
                              ? this.handleDialogShow('update', submit)
                              : submit('category')
                          }
                          disabled={!valid || pristine || submitting}
                        >
                          Save Changes
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={2} />
              <Grid item xs={8}>
                {categoryBrands && categoryBrands.length > 0 ? (
                  <CategoriesAssociations categoryBrands={categoryBrands} />
                ) : null}
              </Grid>
              <Grid item xs={2} />
            </Grid>
          </Form>
          <Grid item xs={12}>
            {categoryId ? (
              <AdminNotes onSubmit={saveAdminNotes} parent={this} />
            ) : (
              <Fragment>
                <hr />
                <h3>
                  Admin Notes will be avaliable after you create a category
                </h3>
              </Fragment>
            )}
          </Grid>
        </Grid>
        <Dialog handleAgree={func} />
      </Fragment>
    );
  };
}

CategoryDetail.propTypes = {
  classes: object.isRequired,
  handleSubmit: func.isRequired,
  handleSaveCategory: func.isRequired,
  playerId: string,
  pristine: bool.isRequired,
  submitting: bool.isRequired,
  valid: bool.isRequired,
  avatar: string,
  handleCategoryDelete: func.isRequired,
  goBack: func.isRequired,
};

const categoryValidation = values => {
  const errors = {};
  if(values.photo && values.photo.type!=='image/jpeg' && values.photo.type!=='image/jpg' && values.photo.type!=='image/png' )
    errors.photo='Image mime type must be JPG or PNG'
  if (!values.name) errors.name = 'Category name is required';
  if (!values.position) errors.position = 'Category name is position';
  else if (!/^([\d])+$/.test(values.position))
    errors.position = 'Category position must not contain letters';
  if (!values.description)
    errors.description = 'Category description is required';
  return errors;
};

CategoryDetail = reduxForm({
  form: 'category',
  validate: categoryValidation,
  enableReinitialize: true,
})(CategoryDetail);

const selector = formValueSelector('category');

CategoryDetail = connect(
  state => ({
    initialValues: {
      name: state.categoryReducer.selectedCategory.name
        ? state.categoryReducer.selectedCategory.name
        : '',
      description: state.categoryReducer.selectedCategory.description
        ? state.categoryReducer.selectedCategory.description
        : '',
      position: state.categoryReducer.selectedCategory.position
        ? state.categoryReducer.selectedCategory.position
        : '',
      adminNotes: state.categoryReducer.selectedCategory.adminNotes
        ? state.categoryReducer.selectedCategory.adminNotes
        : '',
      avatar: state.categoryReducer.selectedCategory.image,
    },
    avatar: selector(state, 'avatar'),
  }),
  { change, submit, show },
)(CategoryDetail);

export default withStyles(styles)(CategoryDetail);
