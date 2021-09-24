import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { withStyles, CircularProgress, Grid } from '@material-ui/core';

import Table from './Table';
import TableBodyRow from './Row';

const styles = () => ({
  tableContainer: {
    marginTop: 20,
  },
  fieldsRequiredContainer: { marginTop: 10 },
  fieldRequired: {
    fontSize: 13,
    color: 'red',
    marginTop: 5,
  },
});
function FinalWorkTable({
  finalWorks,
  classes,
  setFinalWorkSelected,
  isFinalSubject,
  approvedProjects,
  teachers,
  isLoading,
}) {
  const [finalWorksData, setFinalWorksData] = useState([]);
  const projects = approvedProjects.reduce((accumulator, currentValue) => {
    accumulator[currentValue.id] = currentValue.title;
    return accumulator;
  }, {});
  const advisors = teachers.reduce((accumulator, currentValue) => {
    accumulator[currentValue.id] = `${currentValue.first_name} ${currentValue.first_surname}`;
    return accumulator;
  }, {});
  useEffect(() => {
    if (finalWorks && finalWorks.length) {
      setFinalWorksData(
        finalWorks.map((fw) => {
          return {
            id: fw.id,
            code: fw.code,
            name: fw.name,
            laboratoryHours: fw.laboratory_hours,
            practicalHours: fw.practical_hours,
            theoreticalHours: fw.theoretical_hours,
            uc: fw.uc,
            title: '',
            projectId: '',
            advisors: '',
          };
        })
      );
    }
  }, [finalWorks]);

  return (
    <Grid item className={classes.tableContainer} xs={12}>
      <Table
        options={{
          selection: true,
          search: false,
          paging: false,
          actionsColumnIndex: -1,
        }}
        onSelectionChange={(rows) => setFinalWorkSelected(rows)}
        components={{
          Row: TableBodyRow,
          Toolbar: () => null,
        }}
        columns={[
          {
            title: 'id',
            field: 'id',
            hidden: true,
          },
          {
            title: 'Codigo',
            field: 'code',
            editable: 'never',
          },
          {
            title: 'Titulo',
            field: 'title',
            editable: 'onUpdate',
          },
          {
            title: 'Proyecto',
            field: 'projectId',
            lookup: projects,
            hidden: !isFinalSubject,
          },
          {
            title: 'Tutor',
            field: 'advisors',
            lookup: advisors,
            hidden: !isFinalSubject,
          },
          { title: 'Nombre', field: 'name', editable: 'never' },
          { title: 'Unidades de Credito', field: 'uc', editable: 'never' },
        ]}
        data={finalWorksData}
        localization={{
          body: {
            emptyDataSourceMessage: isLoading ? (
              <CircularProgress size={30} />
            ) : (
              'No hay Trabajos finales disponibles'
            ),
          },
        }}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              const data = [...finalWorksData];
              const index = data.indexOf(oldData);
              data[index] = newData;
              setFinalWorksData(data);

              resolve();
            }),
        }}
      />
      <div className={classes.fieldsRequiredContainer}>
        <div className={classes.fieldRequired}>** Titulo es requerido</div>
        {isFinalSubject ? (
          <>
            <div className={classes.fieldRequired}>** Proyecto es requerido</div>
            {/*<div className={classes.fieldRequired}>** Tutor es requerido</div>*/}
          </>
        ) : null}
      </div>
    </Grid>
  );
}

FinalWorkTable.propTypes = {};

export default withStyles(styles)(
  memo(
    FinalWorkTable,
    (prevProps, nextProps) =>
      prevProps.finalWorks.length === nextProps.finalWorks.length &&
      prevProps.teachers.length === nextProps.teachers.length
  )
);
