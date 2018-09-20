import {put, takeLatest, select} from 'redux-saga/effects';
import * as toDoListActions from 'actions/toDoListActions';
import SingleWebSocket from 'utils/SingleWebSocket';

const getLocalLastUpdate = state => state.toDoListReducer.lastUpdate;
const getLocalList = state => state.toDoListReducer.list;

function* sagaGetList({payload}) {
    try {
        const {list, lastUpdate} = payload;
        yield put(toDoListActions.setList(list));
        yield put(toDoListActions.setLastUpdate(lastUpdate));
    } catch (exception) {
        console.log('some error...');
    }
}

function* sagaUpdateItem({noOverrideLastUpdate}) {
    try {
        const socket = new SingleWebSocket();
        const lastUpdate = noOverrideLastUpdate ? yield select(getLocalLastUpdate) : Date.now();
        if (!noOverrideLastUpdate) yield put(toDoListActions.setLastUpdate(lastUpdate));

        const localList = yield select(getLocalList);
        socket.ws.send(JSON.stringify({type: 'UPDATE_LIST', data: {lastUpdate: lastUpdate, list: localList}}));
    } catch (exception) {
        console.log('some error...');
    }
}

export default function* () {
    yield takeLatest(toDoListActions.getList, sagaGetList);
    yield takeLatest(toDoListActions.addItem, sagaUpdateItem);
    yield takeLatest(toDoListActions.editItem, sagaUpdateItem);
    yield takeLatest(toDoListActions.removeItem, sagaUpdateItem);
    yield takeLatest(toDoListActions.changeStatus, sagaUpdateItem);
    yield takeLatest(toDoListActions.sortList, sagaUpdateItem);
    yield takeLatest(toDoListActions.syncList, sagaUpdateItem, {noOverrideLastUpdate: true});
}