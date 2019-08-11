import React, { Fragment } from 'react';
import { func, bool, object } from 'prop-types';
import { Form, Field, reduxForm, formValueSelector, submit } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';

const styles = theme => ({
  saveContainer: {
    paddingLeft: '5%',
    marginTop: 50,
  },
  hidden: {
    display: 'none',
  },
  save: {
    color: 'white',
    backgroundColor: '#61A956',
    '&:hover': {
      backgroundColor: 'rgb(78, 127, 71)',
    },
  },
  form: {
    paddingLeft: '5%',
    minWidth: 560,
  },
  inputLabelContent: {
    alignSelf: 'flex-end',
  },
  formControl: {
    minWidth: 175,
  },
  subtitle: {
    marginBottom: 0,
  },
  iOSSwitchBase: {
    '&$iOSChecked': {
      color: theme.palette.common.white,
      '& + $iOSBar': {
        backgroundColor: '#52d869',
      },
    },
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.sharp,
    }),
  },
  iOSChecked: {
    transform: 'translateX(15px)',
    '& + $iOSBar': {
      opacity: 1,
      border: 'none',
    },
  },
  iOSBar: {
    borderRadius: 13,
    width: 42,
    height: 26,
    marginTop: -13,
    marginLeft: -21,
    border: 'solid 1px',
    borderColor: theme.palette.grey[400],
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  iOSIcon: {
    width: 24,
    height: 24,
  },
  iOSIconChecked: {
    boxShadow: theme.shadows[1],
  },
});

let renderTextField = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => {
  const { id } = custom;
  return (
    <TextField
      id={id}
      label={label}
      error={touched && invalid}
      helperText={touched && error}
      {...input}
    />
  );
};

let renderSwitch = ({ label, input, ...custom }) => {
  const { classes } = custom;
  return (
    <Switch
      classes={{
        switchBase: classes.iOSSwitchBase,
        bar: classes.iOSBar,
        icon: classes.iOSIcon,
        iconChecked: classes.iOSIconChecked,
        checked: classes.iOSChecked,
      }}
      disableRipple
      checked={input.value ? true : false}
      onChange={input.onChange}
    />
  );
};

const renderFromHelper = ({ touched, error }) => {
  if (!(touched && error)) {
    return;
  } else {
    return <FormHelperText>{touched && error}</FormHelperText>;
  }
};

let renderSelect = ({
  input,
  label,
  meta: { touched, error },
  children,
  ...custom
}) => {
  const { classes, id } = custom;
  return (
    <FormControl className={classes.formControl} error={!!(touched && error)}>
      <InputLabel htmlFor={id}>Range invitation</InputLabel>
      <Select
        {...input}
        inputProps={{
          name: id,
          id: id,
        }}
        children={children}
      />
      {renderFromHelper({ touched, error })}
    </FormControl>
  );
};
let ContentForm = ({ classes, subtitle, children }) => {
  return (
    <Grid container direction="column" spacing={0}>
      <Grid item xs={12}>
        <h4 className={classes.subtitle}>{subtitle}</h4>
      </Grid>
      <Grid item xs={12}>
        {children}
      </Grid>
    </Grid>
  );
};

let setup = props => {
  const {
    handleSubmit,
    pristine,
    valid,
    submitting,
    classes,
    retributionValue,
    submit,
  } = props;
  return (
    <Fragment>
      <Form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={12}>
            <h3>Setup invite code</h3>
            <hr />
          </Grid>
          <Grid item xs={6} className={classes.form}>
            <ContentForm
              classes={classes}
              subtitle="Retribution of poins per registere"
            >
              <Field
                name="retribution"
                classes={classes}
                component={renderSwitch}
              />
            </ContentForm>
            <div className={retributionValue ? '' : classes.hidden}>
              <ContentForm
                classes={classes}
                subtitle="The amount of doubloons and coins for"
              >
                <Grid container spacing={8}>
                  <Grid item xs={2} className={classes.inputLabelContent}>
                    <Typography variant="subheading">Doubloons</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Field
                      name="pointUser"
                      id="amount-points-user"
                      label="Amount doubloons user"
                      component={renderTextField}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <Field
                      name="pointReferred"
                      id="amount-points-referred"
                      label="Amount doubloons referred"
                      component={renderTextField}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={8}>
                  <Grid item xs={2} className={classes.inputLabelContent}>
                    <Typography variant="subheading">Coins</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Field
                      name="coinUser"
                      id="amount-coins-user"
                      label="Amount coins user"
                      component={renderTextField}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <Field
                      name="coinReferred"
                      id="amount-coins-referred"
                      label="Amount coins referred"
                      component={renderTextField}
                    />
                  </Grid>
                </Grid>
              </ContentForm>

              <ContentForm
                classes={classes}
                subtitle="The maximum number of invitations"
              >
                <Grid container spacing={8}>
                  <Grid item xs={2} className={classes.inputLabelContent}>
                    <Typography variant="subheading">Max</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Field
                      name="maxInvitation"
                      id="max-invitation"
                      label="Max"
                      component={renderTextField}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <Field
                      name="rangeInvitation"
                      classes={classes}
                      id="range-invitation"
                      component={renderSelect}
                    >
                      <MenuItem value="1">Daily</MenuItem>
                      <MenuItem value="7">Weekly</MenuItem>
                      <MenuItem value="30">Monthly</MenuItem>
                      <MenuItem value="365">Annual</MenuItem>
                    </Field>
                  </Grid>
                </Grid>
              </ContentForm>
            </div>
          </Grid>
        </Grid>
      </Form>
      <Grid container className={classes.saveContainer} justify="center">
        <Grid item xs={12}>
          <Button
            variant="contained"
            className={classes.save}
            disabled={!valid || pristine || submitting}
            type="button"
            onClick={() => submit('setup')}
          >
            Save Changes
          </Button>
        </Grid>
      </Grid>
    </Fragment>
  );
};

setup.propTypes = {
  handleSubmit: func.isRequired,
  pristine: bool,
  valid: bool,
  submitting: bool,
  classes: object.isRequired,
  retributionValue: bool,
  submit: func.isRequired,
};

const setupValidators = values => {
  const errors = {};
  const requiredFields = [
    'pointUser',
    'pointReferred',
    'coinUser',
    'coinReferred',
    'maxInvitation',
    'rangeInvitation',
  ];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    } else if (
      field !== 'rangeInvitation' &&
      !/^[1-9][0-9]*$/.test(values[field])
    ) {
      errors[field] = 'The value must be a positive number';
    }
  });
  return errors;
};

setup = reduxForm({
  form: 'setup',
  validate: setupValidators,
  enableReinitialize: true,
})(setup);

const selector = formValueSelector('setup');

setup = connect(
  state => {
    const retributionValue = selector(state, 'retribution');
    return {
      initialValues: {
        retribution:
          state.inviteCodeReducer.setup.referalActive === '1' ? true : false,
        pointUser: state.inviteCodeReducer.setup.referalPoints,
        pointReferred: state.inviteCodeReducer.setup.referalPointsGets,
        coinUser: state.inviteCodeReducer.setup.referalCoins,
        coinReferred: state.inviteCodeReducer.setup.referalCoinsGets,
        maxInvitation: state.inviteCodeReducer.setup.referalMax,
        rangeInvitation: state.inviteCodeReducer.setup.referalTime,
      },
      retributionValue,
    };
  },
  { submit },
)(setup);

export default withStyles(styles)(setup);
