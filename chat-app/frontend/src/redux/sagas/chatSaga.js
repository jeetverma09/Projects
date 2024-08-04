import axios from 'axios'
import { takeEvery, all, call, put } from "redux-saga/effects";

function* loadMessages(){
    try {
        const response=yield call(axios.get,'http://localhost:3000/api/messages')
        console.log(response,"this is all messages")
        yield put({type:'LOAD_MESSAGES_SUCCESS',payload:response.data})
    } catch (error) {
        console.error('Error in loading messages',error)
    }
}

function* watchLoadMessages(){
    yield takeEvery('LOAD_MESSAGES_REQUEST',loadMessages);
}

export default function* chatSaga(){
    yield all([watchLoadMessages()])
}