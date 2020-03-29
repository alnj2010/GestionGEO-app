import React, { Component } from "react";
import MaterialTable from "material-table";
import { array, bool, object, func } from "prop-types";
import Add from "@material-ui/icons/Add";
import { Fab, Grid } from "@material-ui/core";
import Dialog from "../Dialog";
import { handleExportCsv } from "../../utils/handleExportCsv";

class TeachersList extends Component {
  constructor() {
    super();
    this.state = {
      func: null
    };
  }
  transformData = teachers => {
    if (teachers)
      return teachers.map(teacher => {
        return {
          id: teacher.id,
          email: teacher.email,
          identification: teacher.identification,
          firstName: teacher.first_name,
          firstSurname: teacher.first_surname
        };
      });
    return [];
  };

  handleDialogShow = (action, func) => {
    const { show } = this.props;
    this.setState({ func: func }, () => {
      show(action);
    });
  };

  render = () => {
    const { teachers, isLoading, history, handleDeleteTeacher } = this.props;
    const { func } = this.state;
    return (
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <Fab
            variant="extended"
            size="medium"
            color="primary"
            aria-label="Add"
            onClick={() => history.push(`/profesores/create`)}
          >
            <Add />
            Agregar profesor
          </Fab>
        </Grid>
        <Grid item xs={12}>
          <MaterialTable
            columns={[
              { title: "#", field: "id", hidden: true },
              { title: "Nombre", field: "firstName" },
              { title: "Apellido", field: "firstSurname" },
              { title: "Cedula", field: "identification" },
              { title: "Email", field: "email" }
            ]}
            data={this.transformData(teachers)}
            title="profesores"
            actions={[
              {
                icon: "visibility",
                tooltip: "Ver detalles",
                onClick: (event, rowData) => {
                  history.push(`/profesores/edit/${rowData.id}`);
                }
              },
              {
                icon: "delete",
                tooltip: "Borrar profesor",
                onClick: (event, rowData) => {
                  this.handleDialogShow("eliminar", entity =>
                    handleDeleteTeacher(rowData.id)
                  );
                }
              }
            ]}
            options={{
              pageSize: 10,
              search: true,
              exportButton: true,
              exportCsv: (columns, renderData) =>
                handleExportCsv(columns, renderData, "teachers")
            }}
            onChangePage={() => {
              window.scroll(0, 0);
            }}
            isLoading={isLoading}
          />
        </Grid>
        <Dialog handleAgree={func} />
      </Grid>
    );
  };
}

TeachersList.propTypes = {
  teachers: array,
  isLoading: bool.isRequired,
  history: object.isRequired,
  handleDeleteTeacher: func.isRequired
};

export default TeachersList;