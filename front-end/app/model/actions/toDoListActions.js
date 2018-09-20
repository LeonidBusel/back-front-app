import {createAction} from 'redux-actions';

export const getList = createAction('GET_LIST');
export const syncList = createAction('SYNC_LIST');

export const changeStatus = createAction('CHANGE_STATUS');
export const addItem = createAction('ADD_ITEM');
export const editItem = createAction('EDIT_ITEM');
export const removeItem = createAction('REMOVE_ITEM');
export const sortList = createAction('SORT_LIST');
export const needSyncList = createAction('NEED_SYNC');

// list set data
export const setList = createAction('SET_LIST');
export const setLastUpdate = createAction('SET_LAST_UPDATE');
