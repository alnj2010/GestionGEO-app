import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { FieldArray } from 'redux-form';
import { Grid } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import RenderFields from '../RenderFields';

const styles = () => ({
  buttonDelete: {
    display: 'flex',
    alignItems: 'flex-end',
  },
});

function RenderFieldsArray({
  name,
  distributions,
  classes,
  addButtonDisabled,
  children,
  nonRepeatOptions,
}) {
  let fieldSelectnonRepeat = children().find(
    (child) =>
      child.type === 'select' && child.hasOwnProperty('repeatOption') && !child.repeatOption
  );
  fieldSelectnonRepeat = fieldSelectnonRepeat && fieldSelectnonRepeat.field;

  const renderChildren = ({ fields }) => {
    const selectedFields = fields.getAll();
    return (
      <>
        {fields.map((field, index) => {
          return (
            // eslint-disable-next-line
            <Grid container justify="center" key={index}>
              <Grid container item xs={10}>
                <RenderFields lineal={distributions}>
                  {children(selectedFields[index]).map((input) => {
                    const propsSelectNonRepeat = {};
                    if (
                      input.type === 'select' &&
                      input.hasOwnProperty('repeatOption') &&
                      !input.repeatOption
                    ) {
                      propsSelectNonRepeat.options = nonRepeatOptions.filter(
                        (item) =>
                          !selectedFields.some((s, i) => s[input.field] === item.value && index > i)
                      );
                      propsSelectNonRepeat.disabled = selectedFields.length > index + 1;
                    }
                    return {
                      ...input,
                      field: `${field}.${input.field}`,
                      id: `${field}.${input.id}`,
                      ...propsSelectNonRepeat,
                    };
                  })}
                </RenderFields>
              </Grid>
              <Grid item xs={1} className={classes.buttonDelete}>
                <IconButton
                  aria-label="remover"
                  color="secondary"
                  onClick={() => fields.remove(index)}
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          );
        })}

        <Grid container item xs={12} justify="center">
          <Grid item xs={1}>
            <Fab
              color="primary"
              aria-label="Add"
              disabled={
                addButtonDisabled ||
                (nonRepeatOptions &&
                  selectedFields &&
                  !nonRepeatOptions.some(
                    (nonOpt) =>
                      !selectedFields.some(
                        (selectOpt) =>
                          !selectOpt[fieldSelectnonRepeat] ||
                          selectOpt[fieldSelectnonRepeat] === nonOpt.value
                      )
                  ))
              }
              onClick={() => fields.push({})}
            >
              <AddIcon />
            </Fab>
          </Grid>
        </Grid>
      </>
    );
  };
  return <FieldArray name={name} component={renderChildren} />;
}

RenderFieldsArray.propTypes = {
  classes: PropTypes.shape({
    buttonDelete: PropTypes.string,
  }).isRequired,
  name: PropTypes.string.isRequired,
  addButtonDisabled: PropTypes.bool,
  distributions: PropTypes.arrayOf(PropTypes.number),
  children: PropTypes.func.isRequired,
  nonRepeatOptions: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.number, key: PropTypes.string, value: PropTypes.number })
  ),
};
RenderFieldsArray.defaultProps = {
  distributions: null,
  addButtonDisabled: false,
  nonRepeatOptions: null,
};

export default withStyles(styles)(
  memo(
    RenderFieldsArray,
    (prevProps, nextProps) =>
      prevProps.addButtonDisabled === nextProps.addButtonDisabled &&
      (!prevProps.nonRepeatOptions ||
        (prevProps.nonRepeatOptions.length === nextProps.nonRepeatOptions.length &&
          (nextProps.nonRepeatOptions.length === 0 ||
            prevProps.nonRepeatOptions[0].id === nextProps.nonRepeatOptions[0].id)))
  )
);
