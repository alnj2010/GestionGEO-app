import { ACTIONS } from '../actions/studentInscription';


const initialState = {
  currentEnrolledSubjects: {},
  availableSubjects: [],
};
const StudentInscription = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.AVAILABLE_SUBJECTS:
      return { ...state, ...action.payload };
    case ACTIONS.CURRENT_ENROLLED_SUBJECTS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default StudentInscription;