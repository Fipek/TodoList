import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import streamReducer from './streamReducer';
import todoListReducer from './todoListReducer';

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  todotasks: streamReducer,
  todolists: todoListReducer
});