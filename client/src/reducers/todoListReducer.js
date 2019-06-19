import _ from 'lodash';
import {
  CREATE_LIST,
  DELETE_LIST,
  FETCH_LISTS,
  CLEAN_LISTS
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_LISTS:
      return { ...state, ..._.mapKeys(action.payload, 'listId')};
    case CREATE_LIST:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_LIST:
      return _.omit(state, action.payload);
    case CLEAN_LISTS:
      return _.remove(state, action.payload);
    default:
      return state;
  }
};