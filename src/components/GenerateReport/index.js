import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Button, FormControl, InputLabel, Select, Modal, MenuItem } from '@material-ui/core';

import PropTypes from 'prop-types';

const styles = (theme) => ({
  reportContainer: {
    marginTop: '20px',
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    left: '50%',
    top: '50%',
    transform: 'translate(-50%,-50%)',
    padding: 10,
  },
  formControl: {
    margin: 8,
    minWidth: 120,
  },
  rangeContent: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
});
function GenerateReport({
  classes: { reportContainer, paper, formControl, rangeContent },
  schoolPeriods,
  getReport,
}) {
  const [rangeReport, setRangeReport] = React.useState({ initial: '', final: '' });
  const [openModal, setOpenModal] = useState(false);
  const [untilOptions, setUntilOptions] = useState([]);
  const handleChangeRangeReport = (event, { key }) => {
    if (event.target.name === 'initial') {
      setUntilOptions(schoolPeriods.slice(key));
      setRangeReport({ initial: event.target.value, final: '' });
    } else {
      setRangeReport({ ...rangeReport, final: event.target.value });
    }
  };
  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
    setRangeReport({ initial: '', final: '' });
    setUntilOptions([]);
  };
  const handleDowload = () => {
    if (rangeReport.initial !== '' && rangeReport.final !== '')
      getReport(rangeReport.initial, rangeReport.final);
  };
  return (
    <>
      <Grid container justify="center" className={reportContainer}>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Generar Reporte Anual
        </Button>
      </Grid>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-range-report"
        aria-describedby="modal-range-report-select"
      >
        <div className={paper}>
          <h2 id="modal-range-report">Periodos Semestrales</h2>
          <div id="modal-range-report-select" className={rangeContent}>
            <FormControl variant="outlined" className={formControl}>
              <InputLabel id="select-initial-range-label">Desde</InputLabel>
              <Select
                id="select-initial-range"
                name="initial"
                value={rangeReport.initial}
                onChange={handleChangeRangeReport}
                label="Desde"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {schoolPeriods.slice(0, -1).map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.cod_school_period}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl variant="outlined" className={formControl}>
              <InputLabel id="select-final-range-label">Hasta</InputLabel>
              <Select
                id="select-final-range"
                name="final"
                value={rangeReport.final}
                onChange={handleChangeRangeReport}
                label="Hasta"
                disabled={rangeReport.initial === ''}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {untilOptions.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.cod_school_period}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Grid container justify="center" className={reportContainer}>
              <Button
                variant="contained"
                color="primary"
                disabled={rangeReport.final === ''}
                onClick={handleDowload}
              >
                Descargar
              </Button>
            </Grid>
          </div>
        </div>
      </Modal>
    </>
  );
}

GenerateReport.propTypes = {
  classes: PropTypes.shape({
    reportContainer: PropTypes.string,
    paper: PropTypes.string,
    formControl: PropTypes.string,
    rangeContent: PropTypes.string,
  }).isRequired,
  schoolPeriods: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  getReport: PropTypes.func.isRequired,
};

GenerateReport.defaultProps = {};

export default React.memo(withStyles(styles)(GenerateReport));
