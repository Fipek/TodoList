import todos from '../apis/todos';
import history from '../history';
import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_LIST,
  CREATE_TASK,
  FETCH_LISTS,
  FETCH_TASKS,
  DELETE_TASK,
  DELETE_LIST,
  CLEAN_TASKS,
  CLEAN_LISTS
} from './types';

export const signIn = userId => {
  return {
    type: SIGN_IN,
    payload: userId
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT
  };
};

//LISTS
export const createList = (formValues) => async (dispatch, getState) => {
  const response = await todos.post('/todo/list/create',formValues);
  dispatch({ type: CREATE_LIST, payload: response.data });
  history.push('/list');
};

export const fetchLists = (user) => async dispatch => {
  const response = await todos.get(`/todo/list/get/${user}`);
  dispatch({ type: FETCH_LISTS, payload: response.data});
};

export const deleteList = (listId) => async dispatch => {
  await todos.delete(`/todo/list/delete/${listId}`);
  dispatch({ type: DELETE_LIST, payload: listId });
};

//TASKS
export const createTask = (formValues) => async (dispatch, getState) => {
  const response = await todos.post('/todo/task/create',formValues);

  dispatch({ type: CREATE_TASK, payload: response.data });
  history.push(`/streams/${formValues.parentId}`);
};

export const fetchTasks = listId => async (dispatch, getState) => {
  const response = await todos.get(`/todo/task/get/${listId}`);
  dispatch({ type: FETCH_TASKS, payload: response.data });
};

export const deleteTask = (id,listId) => async dispatch => {
  await todos.delete(`/todo/task/delete/${id}`);
  dispatch({ type: DELETE_TASK, payload: id });
  //reload data.
  dispatch(fetchTasks(listId));
};

export const checkTask = todoItem => async (dispatch, getState) => {  
  await todos.post('/todo/task/set-status',todoItem);
  dispatch(fetchTasks(todoItem.listId));
  dispatch(fetchLists(getState().auth.userId));
};

export const cleanTasks = () => async (dispatch, getState) => {  
  dispatch({ type: CLEAN_TASKS, payload: getState().todotasks });
};

export const cleanLists = () => async (dispatch, getState) => {  
  dispatch({ type: CLEAN_LISTS, payload: getState().todolists });
};
