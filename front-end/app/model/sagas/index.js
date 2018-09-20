import { fork, all } from 'redux-saga/effects';
import toDoListSaga from './toDoListSaga';


export default function* () {
    yield all([
        fork(toDoListSaga)
    ]);
}