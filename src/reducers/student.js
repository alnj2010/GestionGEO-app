import { ACTIONS } from '../actions/student';

const initialState = {
  list: [],
  selectedStudent: {
    student: [],
  },
  warningStudents: [],
  availableSubjects: [],
  inscribedSchoolPeriods: [],
  selectedStudentSchoolPeriod: {},
  selectedSchoolProgram: null,
};

const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.LIST:
      return {
        ...state,
        ...action.payload,
      };
    case ACTIONS.WARNING_STUDENTS:
      return {
        ...state,
        ...action.payload,
      };
    case ACTIONS.SELECT:
      const newState = {
        ...state,
        ...action.payload,
      };
      newState.selectedStudent.student =
        newState.selectedStudent.student.length === 0
          ? {
              equivalence: [],
            }
          : newState.selectedStudent.student;
      return newState;
    case ACTIONS.CLEAN_SELECTED_STUDENT:
      return {
        ...state,
        selectedStudent: { student: [] },
      };

    case ACTIONS.AVAILABLE_SUBJECTS:
      return {
        ...state,
        ...action.payload,
      };

    case ACTIONS.INSCRIBED_SCHOOL_PERIODS:
      return {
        ...state,
        ...action.payload,
      };

    case ACTIONS.SELECTED_STUDENT_SCHOOL_PERIOD:
      return {
        ...state,
        ...action.payload,
      };
    case ACTIONS.SELECTED_SCHOOL_PROGRAM:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default studentReducer;
