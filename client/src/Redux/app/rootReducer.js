import { combineReducers } from 'redux';
import authReducer from '../slices/AuthSlice';
import clientReducer from '../slices/ClientSlice';
import MembershipReducer from '../slices/MembershipSlice';
import StaffReducer from '../slices/StaffSlice';
import TrainingReducer from '../slices/TrainingSlice';
import VisitReducer from '../slices/VisitSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  clients: clientReducer,
  memberships: MembershipReducer,
  staff: StaffReducer,
  trainings: TrainingReducer,
  visits: VisitReducer,
});

export default rootReducer;