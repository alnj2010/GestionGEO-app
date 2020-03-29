import React, { Component } from "react";
import MaterialTable from "material-table";
import { array, bool, object, func } from "prop-types";
import Add from "@material-ui/icons/Add";
import { Fab, Grid } from "@material-ui/core";
import Dialog from "../Dialog";
import { handleExportCsv } from "../../utils/handleExportCsv";
import { Constance } from "../../services/constance";
import Inscription from "@material-ui/icons/HowToVote";
import Download from "@material-ui/icons/Archive";

class StudentsList extends Component {
  constructor() {
    super();
    this.state = {
      func: null
    };
  }
  transformData = students => {
    if (students)
      return students.map(student => {
        return {
          id: student.id,
          studentId: student.student.id,
          email: student.email,
          identification: student.identification,
          firstName: student.first_name,
          firstSurname: student.first_surname,
          secondName: student.second_name ? student.second_name : "",
          secondSurname: student.second_surname ? student.second_surname : ""
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
    const { students, isLoading, history, handleDeleteStudent } = this.props;
    const { func } = this.state;
    return (
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <Fab
            variant="extended"
            size="medium"
            color="primary"
            aria-label="Add"
            onClick={() => history.push(`/estudiantes/create`)}
          >
            <Add />
            Agregar estudiante
          </Fab>
        </Grid>
        <Grid item xs={12}>
          <MaterialTable
            columns={[
              { title: "#", field: "id", hidden: true },
              { title: "#", field: "studentId", hidden: true },
              { title: "Nombre", field: "secondName", hidden: true },
              { title: "Apellido", field: "secondSurname", hidden: true },
              { title: "Nombre", field: "firstName" },
              { title: "Apellido", field: "firstSurname" },
              { title: "Cedula", field: "identification" },
              { title: "Email", field: "email" }
            ]}
            data={this.transformData(students)}
            title="estudiantes"
            actions={[
              {
                icon: "visibility",
                tooltip: "Ver detalles",
                onClick: (event, rowData) => {
                  history.push(`/estudiantes/edit/${rowData.id}`);
                }
              },
              {
                icon: Download,
                tooltip: "Constancia de estudio",
                onClick: (event, rowData) => {
                  Constance.getStudyConstance(rowData.studentId);
                }
              },
              {
                icon: Inscription,
                tooltip: "Inscribir",
                onClick: (event, rowData) =>
                  history.push(
                    `/estudiantes/inscripciones/${rowData.studentId}`,
                    {
                      fullname: `${rowData.firstName} ${rowData.secondName} ${rowData.firstSurname} ${rowData.secondSurname}`
                    }
                  )
              },
              {
                icon: "delete",
                tooltip: "Borrar estudiante",
                onClick: (event, rowData) => {
                  this.handleDialogShow("eliminar", entity =>
                    handleDeleteStudent(rowData.id)
                  );
                }
              }
            ]}
            options={{
              pageSize: 10,
              search: true,
              exportButton: true,
              exportCsv: (columns, renderData) =>
                handleExportCsv(columns, renderData, "students")
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

StudentsList.propTypes = {
  students: array,
  isLoading: bool.isRequired,
  history: object.isRequired,
  handleDeleteStudent: func.isRequired
};

export default StudentsList;