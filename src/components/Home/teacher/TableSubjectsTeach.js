import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as moment from 'moment';
import MaterialTable from 'material-table';
import { Grid, CircularProgress } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '../../Dialog';

const styles = () => ({
  tableContainer: {
    marginTop: 10,
  },
});
class TableSubjectsTeach extends Component {
  constructor() {
    super();
    this.state = {
      func: null,
    };
  }

  handleDialogShow = (action, func) => {
    const { show } = this.props;
    this.setState({ func }, () => {
      show(action);
    });
  };

  render() {
    const { currentSubjects, classes, codSchoolPeriod, isLoading } = this.props;
    const { func } = this.state;
    return (
      <Grid item xs={12} className={classes.tableContainer}>
        <MaterialTable
          title={
            codSchoolPeriod
              ? `Materias que imparto en el periodo académico: ${codSchoolPeriod}`
              : ''
          }
          columns={[
            { title: 'Id', field: 'id', hidden: true },
            { title: 'Código', field: 'code' },
            { title: 'Asignatura', field: 'name' },
          ]}
          data={
            Array.isArray(currentSubjects)
              ? currentSubjects.map((subj) => ({
                  id: subj.id,
                  code: subj.subject.code,
                  name: subj.subject.name,
                }))
              : []
          }
          localization={{
            body: {
              emptyDataSourceMessage: isLoading ? (
                <CircularProgress size={30} />
              ) : (
                'No impartes asignaturas en el periodo escolar actual'
              ),
            },
          }}
          options={{
            search: false,
            paging: false,
            showTextRowsSelected: false,
          }}
        />
        <Dialog handleAgree={func} />
      </Grid>
    );
  }
}

TableSubjectsTeach.propTypes = {};
TableSubjectsTeach.defaultProps = {};

export default withStyles(styles)(TableSubjectsTeach);
