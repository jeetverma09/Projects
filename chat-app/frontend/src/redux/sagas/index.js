import { all } from 'redux-saga/effects';
import chatSaga from './chatSaga';
import authSaga from './authSaga'

export default function* rootSaga(){
    yield all([chatSaga(),authSaga()])
}