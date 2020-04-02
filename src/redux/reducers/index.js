import { combineReducers } from 'redux';
import courses from './courseReducer';
import login from './loginReducer';

const rootReducer = combineReducers({
  courses, login,
});
export default rootReducer;
