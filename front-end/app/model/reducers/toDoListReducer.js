import {handleActions} from 'redux-actions';
import * as actions from 'actions/toDoListActions';

const initialState = {
    lastUpdate: 0,
    needSync: false,
    list: []
};

export default handleActions({
    [actions.syncList]: (state) => ({
        ...state,
        needSync: false,
    }),
    [actions.needSyncList]: (state) => ({
        ...state,
        needSync: true,
    }),
    [actions.setLastUpdate]: (state, { payload }) => ({
        ...state,
        lastUpdate: payload
    }),
    [actions.setList]: (state, { payload }) => ({
        ...state,
        list: payload
    }),
    [actions.sortList]: (state, { payload }) => ({
        ...state,
        list: payload
    }),
    [actions.addItem]: (state, { payload }) => ({
        ...state,
        list: [Object.assign(payload, {id: '_' + Math.random().toString(36).substr(2, 9)}), ...state.list]
    }),
    [actions.editItem]: (state, { payload }) => ({
        ...state,
        list: state.list.map((item, i) => i === payload.index ? {...item, title: payload.title}: item)
    }),
    [actions.removeItem]: (state, { payload }) => ({
        ...state,
        list: state.list.filter( (item, index) => index !== payload.index)
    }),
    [actions.changeStatus]: (state, { payload }) => ({
        ...state,
        list: state.list.map((item, i) => i === payload.index ? {...item, done: true}: item)
    })
}, initialState);
