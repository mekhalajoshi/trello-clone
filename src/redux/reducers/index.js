import { combineReducers } from 'redux';
import courses from './courseReducer';
import login from './loginReducer';
import data from './dataReducer';

const rootReducer = combineReducers({
  courses, login, data,
});
export default rootReducer;
