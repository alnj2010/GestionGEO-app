import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Button } from '@material-ui/core';
import { Form, reduxForm, change, submit, formValueSelector } from 'redux-form';
import { object, func, bool, number } from 'prop-types';
import { show } from '../../actions/dialog';
import Dialog from '../Dialog';
import RenderFields from '../RenderFields';

const styles = (theme) => ({
    form: {
        paddingLeft: '5%',
    },
    buttonContainer: { paddingTop: '2%' },
    save: {
        color: 'white',
        backgroundColor: '#61A956',
        '&:hover': {
            backgroundColor: 'rgb(78, 127, 71)',
        },
    },
    button: {
        width: '100%',
    },
});

class AdminDetail extends Component {
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
            saveAdmin,
            goBack,
            adminId,
            handleAdminDelete,
            pristine,
            submitting,
            valid,
            submit,
            rol,
            admin,
        } = this.props;
        const { func } = this.state;
        let isMain = sessionStorage.getItem('main') === 'true';
        return (
            <Form onSubmit={handleSubmit(saveAdmin)}>
                <Grid container>
                    <Grid item xs={12}>
                        <h3>
                            {' '}
                            {adminId
                                ? `Administrador: ${admin.first_surname} ${admin.first_name}`
                                : 'Nuevo Administrador'}
                        </h3>
                        <hr />
                    </Grid>
                    <Grid item xs={12} className={classes.form}>
                        <Grid container justify="space-between">
                            <RenderFields>
                                {[
                                    {
                                        label: 'Nombre',
                                        field: 'firstName',
                                        id: 'firstName',
                                        type: 'text',
                                    },
                                    {
                                        label: 'Segundo Nombre',
                                        field: 'secondName',
                                        id: 'secondName',
                                        type: 'text',
                                    },
                                    {
                                        label: 'Apellido',
                                        field: 'firstSurname',
                                        id: 'firstSurname',
                                        type: 'text',
                                    },
                                    {
                                        label: 'Segundo Apellido',
                                        field: 'secondSurname',
                                        id: 'secondSurname',
                                        type: 'text',
                                    },
                                    {
                                        label: 'Cedula',
                                        field: 'identification',
                                        id: 'identification',
                                        type: 'text',
                                    },
                                    {
                                        label: 'Email',
                                        field: 'email',
                                        id: 'email',
                                        type: 'text',
                                    },
                                    {
                                        label: 'Movil',
                                        field: 'mobile',
                                        id: 'mobile',
                                        type: 'phone',
                                    },
                                    {
                                        label: 'Telefono',
                                        field: 'telephone',
                                        id: 'telephone',
                                        type: 'phone',
                                    },
                                    {
                                        label: 'Telefono Trabajo',
                                        field: 'workPhone',
                                        id: 'workPhone',
                                        type: 'phone',
                                    },
                                    {
                                        label: 'Rol',
                                        field: `rol`,
                                        id: `rol`,
                                        type: 'select',
                                        options: [
                                            {
                                                key: 'SECRETARIO',
                                                value: 'SECRETARY',
                                            },
                                            {
                                                key: 'COORDINADOR',
                                                value: 'COORDINATOR',
                                            },
                                        ].map((type) => {
                                            return {
                                                key: type.key,
                                                value: type.value,
                                            };
                                        }),
                                    },
                                    {
                                        label: 'Sexo',
                                        field: `sex`,
                                        id: `sex`,
                                        type: 'select',
                                        options: [
                                            { key: 'MASCULINO', value: 'M' },
                                            { key: 'FEMENINO', value: 'F' },
                                        ].map((type) => {
                                            return {
                                                key: type.key,
                                                value: type.value,
                                            };
                                        }),
                                    },
                                    {
                                        label: 'Nivel de instruccion',
                                        field: 'levelInstruction',
                                        id: 'levelInstruction',
                                        type: 'select',
                                        options: [
                                            { value: 'TSU', id: 'TSU' },
                                            { value: 'TEC MEDIO', id: 'TCM' },
                                            { value: 'DOCTOR', id: 'Dr' },
                                            {
                                                value: 'ESPECIALISTA',
                                                id: 'Esp',
                                            },
                                            { value: 'INGENIERO', id: 'Ing' },
                                            {
                                                value: 'MAGISTER SCIENTIARUM',
                                                id: 'MSc',
                                            },
                                            { value: 'LICENCIADO', id: 'Lic' },
                                        ].map((type) => {
                                            return {
                                                key: type.value,
                                                value: type.id,
                                            };
                                        }),
                                    },
                                    {
                                        label: 'Nacionalidad',
                                        field: `nationality`,
                                        id: `nationality`,
                                        type: 'select',
                                        options: [
                                            { key: 'VENEZOLANO', value: 'V' },
                                            { key: 'EXTRANGERO', value: 'E' },
                                        ].map((type) => {
                                            return {
                                                key: type.key,
                                                value: type.value,
                                            };
                                        }),
                                    },
                                    {
                                        label: 'Coordinador principal',
                                        field: 'principal',
                                        id: 'principal',
                                        type:
                                            isMain && rol !== 'SECRETARY'
                                                ? 'switch'
                                                : 'hidden',
                                    },
                                ]}
                            </RenderFields>
                        </Grid>
                        <Grid container>
                            <Grid item xs={12}>
                                <Grid
                                    container
                                    className={classes.buttonContainer}
                                    justify="space-between"
                                    spacing={16}
                                >
                                    <Grid item xs={12} sm={3}>
                                        <Button
                                            variant="contained"
                                            className={`${classes.save} ${classes.button}`}
                                            onClick={() =>
                                                adminId
                                                    ? this.handleDialogShow(
                                                          'actualizar',
                                                          submit
                                                      )
                                                    : submit('admin')
                                            }
                                            disabled={
                                                !valid || pristine || submitting
                                            }
                                        >
                                            Guardar Cambios
                                        </Button>
                                    </Grid>

                                    <Grid item xs={12} sm={3}>
                                        <Button
                                            variant="contained"
                                            onClick={goBack}
                                            className={classes.button}
                                        >
                                            Cancelar
                                        </Button>
                                    </Grid>

                                    <Grid item xs={12} sm={3}>
                                        {adminId ? (
                                            <Button
                                                className={classes.button}
                                                variant="contained"
                                                color="secondary"
                                                onClick={() =>
                                                    this.handleDialogShow(
                                                        'delete',
                                                        handleAdminDelete
                                                    )
                                                }
                                            >
                                                Borrar
                                            </Button>
                                        ) : null}
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

AdminDetail.propTypes = {
    classes: object.isRequired,
    handleSubmit: func.isRequired,
    saveAdmin: func.isRequired,
    goBack: func.isRequired,
    adminId: number,
    handleAdminDelete: func.isRequired,
    pristine: bool.isRequired,
    submitting: bool.isRequired,
    valid: bool.isRequired,
};

const adminValidation = (values) => {
    const errors = {};

    if (!values.firstName) {
        errors.firstName = 'Nombre es requerido';
    } else if (/(?=[0-9])/.test(values.firstName))
        errors.firstName = 'El nombre no debe contener numeros';

    if (!values.firstSurname) {
        errors.firstSurname = 'Apellido es requerido';
    } else if (/(?=[0-9])/.test(values.firstSurname))
        errors.firstSurname = 'El Apellido no debe contener numeros';

    if (!values.identification) {
        errors.identification = 'Cedula es requerido';
    }

    if (!values.email) {
        errors.email = 'Email es requerido';
    } else if (!/(.+)@(.+){2,}\.(.+){2,}/i.test(values.email)) {
        errors.email = 'Introduce un email valido';
    }

    if (!values.mobile || values.mobile === '(   )    -    ') {
        errors.mobile = 'movil es requerido';
    }

    if (!values.nationality) errors.nationality = ' Nacionalidad Requerido';
    if (!values.sex) errors.sex = ' Sexo Requerido';
    if (!values.levelInstruction)
        errors.levelInstruction = ' Nivel de instruccion Requerido';
    if (!values.rol) errors.rol = ' Rol Requerido';
    return errors;
};

AdminDetail = reduxForm({
    form: 'admin',
    validate: adminValidation,
    enableReinitialize: true,
})(AdminDetail);
const selector = formValueSelector('admin');

AdminDetail = connect(
    (state) => ({
        initialValues: {
            firstName: state.adminReducer.selectedAdmin.first_name
                ? state.adminReducer.selectedAdmin.first_name
                : '',
            secondName: state.adminReducer.selectedAdmin.second_name
                ? state.adminReducer.selectedAdmin.second_name
                : '',
            firstSurname: state.adminReducer.selectedAdmin.first_surname
                ? state.adminReducer.selectedAdmin.first_surname
                : '',
            secondSurname: state.adminReducer.selectedAdmin.second_surname
                ? state.adminReducer.selectedAdmin.second_surname
                : '',
            identification: state.adminReducer.selectedAdmin.identification
                ? state.adminReducer.selectedAdmin.identification
                : '',
            email: state.adminReducer.selectedAdmin.email
                ? state.adminReducer.selectedAdmin.email
                : '',
            mobile: state.adminReducer.selectedAdmin.mobile
                ? state.adminReducer.selectedAdmin.mobile
                : '(   )    -    ',
            telephone: state.adminReducer.selectedAdmin.telephone
                ? state.adminReducer.selectedAdmin.telephone
                : '(   )    -    ',
            workPhone: state.adminReducer.selectedAdmin.work_phone
                ? state.adminReducer.selectedAdmin.work_phone
                : '(   )    -    ',
            rol: state.adminReducer.selectedAdmin.administrator
                ? state.adminReducer.selectedAdmin.administrator.rol
                : '',
            sex: state.adminReducer.selectedAdmin.sex
                ? state.adminReducer.selectedAdmin.sex
                : '',
            nationality: state.adminReducer.selectedAdmin.nationality
                ? state.adminReducer.selectedAdmin.nationality
                : '',
            levelInstruction: state.adminReducer.selectedAdmin.level_instruction
                ? state.adminReducer.selectedAdmin.level_instruction
                : '',
            principal: state.adminReducer.selectedAdmin.administrator
                ? state.adminReducer.selectedAdmin.administrator.principal
                : false,
        },
        action: state.dialogReducer.action,
        rol: selector(state, 'rol'),
    }),
    { change, show, submit }
)(AdminDetail);

export default withStyles(styles)(AdminDetail);
