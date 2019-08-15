import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import {
  Grid,
  Button
} from '@material-ui/core';
import { Form, reduxForm, change, submit } from 'redux-form';
import { object, func, bool, number } from 'prop-types';
import { show } from '../../actions/dialog';
import Dialog from '../Dialog';
import RenderFields from '../RenderFields'

const styles = theme => ({
  inputLabel: {
    paddingTop: '4%',
  },
  input: {
    alignSelf: 'center',
  },
  form: {
    paddingLeft: '5%',
  },
  largeIcon: {
    width: '36.5%',
    height: '36.5%',
    cursor: 'pointer',
  },
  profilePhoto: {
    width: 360,
    height: 360,
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

class PostgraduateDetail extends Component {
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
      savePostgraduate,
      goBack,
      postgraduateId,
      handlePostgraduateDelete,
      pristine,
      submitting,
      valid,
      submit,
    } = this.props;
    const { func } = this.state;
    return (
      <Form onSubmit={handleSubmit(savePostgraduate)}>
        <Grid container>
          <Grid item xs={12}>
            <h3> {postgraduateId ? `Postgrado: ${postgraduateId}` : 'Nuevo Postgrado'}</h3>
            <hr />
          </Grid>
          <Grid item xs={6} className={classes.form}>
            <Grid container>
              <RenderFields >{[
                { label: 'Nombre del postgrado', field: 'postgraduateName', id: 'postgraduateName', type: 'text' },
                { label: 'Unidades de credito', field: 'numCu', id: 'numCu', type: 'number', min:0 },
              ]}</RenderFields>
            </Grid>
            <Grid container>
              <Grid item xs={12}>
                <Grid container className={classes.buttonContainer}>
                  <Grid item xs={4}>
                    <Button variant="contained" onClick={goBack}>
                      Cancelar
                    </Button>
                  </Grid>
                  <Grid item xs={4}>
                    {postgraduateId ? (
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() =>
                          this.handleDialogShow('delete', handlePostgraduateDelete)
                        }
                      >
                        Borrar
                      </Button>
                    ) : null}
                  </Grid>
                  <Grid item xs={4}>
                    <Button
                      variant="contained"
                      className={classes.save}
                      onClick={() =>
                        postgraduateId
                          ? this.handleDialogShow('actualizar', submit)
                          : submit('postgraduate')
                      }
                      disabled={!valid || pristine || submitting}
                    >
                      Guardar Cambios
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Dialog handleAgree={func} />
      </Form>
    );
  };
}

PostgraduateDetail.propTypes = {
  classes: object.isRequired,
  handleSubmit: func.isRequired,
  savePostgraduate: func.isRequired,
  goBack: func.isRequired,
  postgraduateId: number,
  handlePostgraduateDelete: func.isRequired,
  pristine: bool.isRequired,
  submitting: bool.isRequired,
  valid: bool.isRequired,
};

const postgraduateValidation = values => {
  const errors = {};

  if (!values.postgraduateName) {
    errors.postgraduateName = 'Nombre del Postgrado es requerido';
  }

  if (!values.numCu) {
    errors.numCu = 'Unidades de credito es requerido';
  }


  return errors;
};

PostgraduateDetail = reduxForm({
  form: 'postgraduate',
  validate: postgraduateValidation,
  enableReinitialize: true,
})(PostgraduateDetail);

PostgraduateDetail = connect(
  state => ({
    initialValues: {
      postgraduateName: state.postgraduateReducer.selectedPostgraduate.postgraduate_name
        ? state.postgraduateReducer.selectedPostgraduate.postgraduate_name
        : '',
      numCu: state.postgraduateReducer.selectedPostgraduate.num_cu
        ? state.postgraduateReducer.selectedPostgraduate.num_cu
        : '',
    },
    action: state.dialogReducer.action,
  }),
  { change, show, submit },
)(PostgraduateDetail);

export default withStyles(styles)(PostgraduateDetail);
