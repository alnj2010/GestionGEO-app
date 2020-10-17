import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import MaterialTable from 'material-table';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import { STUDENT_STATUS } from '../../services/constants';
import { reverseJson } from '../../helpers/index';

const styles = () => ({
  warningTable: { marginTop: 20 },
});

function WarningStudents({
  warningStudents,
  history,
  isLoading,
  updateStudentStatus,
  width,
  classes: { warningTable },
}) {
  const studenStatus = reverseJson(STUDENT_STATUS);

  const [data, setData] = useState([]);
  useEffect(() => {
    const initialData = Array.isArray(warningStudents)
      ? warningStudents.map((item) => {
          return {
            identification: item.user.identification,
            first_name: item.user.first_name,
            first_surname: item.user.first_surname,
            currentStatus: item.current_status,
            idUser: item.user.id,
            idSchoolProgram: item.school_program_id,
            second_name: item.user.second_name,
            second_surname: item.user.second_surname,
            telephone: item.user.telephone,
            mobile: item.user.mobile,
            work_phone: item.user.work_phone,
            email: item.user.email,
            level_instruction: item.user.level_instruction,
            active: item.user.active,
            with_disabilities: item.user.with_disabilities,
            sex: item.user.sex,
            nationality: item.user.nationality,
            idStudent: item.id,
            guideTeacherId: item.guide_teacher_id,
            studentType: item.student_type,
            homeUniversity: item.home_university,
            currentPostgraduate: item.current_postgraduate,
            typeIncome: item.type_income,
            isUcvTeacher: item.is_ucv_teacher,
            isAvailableFinalWork: item.is_available_final_work,
            creditsGranted: item.credits_granted,
            withWork: item.with_work,
            testPeriod: item.test_period,
            equivalences: item.equivalence,
          };
        })
      : [];
    setData(initialData);
  }, [warningStudents]);
  const matches = isWidthUp('sm', width);
  return (
    <div className={warningTable}>
      <MaterialTable
        columns={[
          { title: '#User', field: 'idUser', hidden: true, editable: 'never' },
          { title: '#SchoolProgram', field: 'idSchoolProgram', hidden: true, editable: 'never' },
          { title: 'Cedula', field: 'identification', editable: 'never' },
          { title: 'Nombre', field: 'first_name', editable: 'never' },
          { title: 'apellido', field: 'first_surname', editable: 'never' },
          { title: 'status', field: 'currentStatus', lookup: studenStatus },
          { title: '', field: 'second_name', hidden: true, editable: 'never' },
          { title: '', field: 'second_surname', hidden: true, editable: 'never' },
          { title: '', field: 'telephone', hidden: true, editable: 'never' },
          { title: '', field: 'mobile', hidden: true, editable: 'never' },
          { title: '', field: 'work_phone', hidden: true, editable: 'never' },
          { title: '', field: 'email', hidden: true, editable: 'never' },
          { title: '', field: 'level_instruction', hidden: true, editable: 'never' },
          { title: '', field: 'active', hidden: true, editable: 'never' },
          { title: '', field: 'with_disabilities', hidden: true, editable: 'never' },
          { title: '', field: 'sex', hidden: true, editable: 'never' },
          { title: '', field: 'nationality', hidden: true, editable: 'never' },
          { title: '', field: 'idStudent', hidden: true, editable: 'never' },
          { title: '', field: 'guideTeacherId', hidden: true, editable: 'never' },
          { title: '', field: 'studentType', hidden: true, editable: 'never' },
          { title: '', field: 'homeUniversity', hidden: true, editable: 'never' },
          { title: '', field: 'currentPostgraduate', hidden: true, editable: 'never' },
          { title: '', field: 'typeIncome', hidden: true, editable: 'never' },
          { title: '', field: 'isUcvTeacher', hidden: true, editable: 'never' },
          { title: '', field: 'isAvailableFinalWork', hidden: true, editable: 'never' },
          { title: '', field: 'creditsGranted', hidden: true, editable: 'never' },
          { title: '', field: 'withWork', hidden: true, editable: 'never' },
          { title: '', field: 'testPeriod', hidden: true, editable: 'never' },
          { title: '', field: 'equivalences', hidden: true, editable: 'never' },
        ]}
        data={data}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              const dataUpdate = [...data];
              const index = oldData.tableData.id;
              dataUpdate[index] = newData;

              updateStudentStatus(dataUpdate[index]).then(() => {
                setData([...dataUpdate]);
                resolve();
              });
            }),
        }}
        title={matches ? 'Estudiantes con incidencias' : ''}
        actions={[
          {
            icon: 'visibility',
            tooltip: 'Ver detalles',
            onClick: (event, rowData) => {
              history.push(`/estudiantes/modificar/${rowData.idUser}`);
            },
          },
        ]}
        options={{
          pageSize: 5,
          search: true,
        }}
        onChangePage={() => {
          window.scroll(0, 0);
        }}
        localization={{
          header: {
            actions: 'Acciones',
          },
          body: {
            emptyDataSourceMessage: warningStudents.message,
          },
        }}
        isLoading={isLoading}
      />
    </div>
  );
}

WarningStudents.propTypes = {
  classes: PropTypes.shape({ warningTable: PropTypes.string }).isRequired,
  warningStudents: PropTypes.oneOfType([
    PropTypes.shape({ message: PropTypes.string, error: PropTypes.string }),
    PropTypes.arrayOf(PropTypes.shape({})),
  ]).isRequired,
  isLoading: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  updateStudentStatus: PropTypes.func.isRequired,
  width: PropTypes.string.isRequired,
};

WarningStudents.defaultProps = {};

export default React.memo(withStyles(styles)(withWidth()(WarningStudents)));
