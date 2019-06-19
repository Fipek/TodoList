import _ from 'lodash';
import {
  CREATE_TASK,
  DELETE_TASK,
  FETCH_TASKS,
  CLEAN_TASKS,
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_TASKS:
      return { ...state, ..._.mapKeys(action.payload, 'id') };  
    case CREATE_TASK:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_TASK:
      return _.omit(state, action.payload);
    case CLEAN_TASKS:
      return _.remove(state, action.payload);
    default:
      return state;
  }
};