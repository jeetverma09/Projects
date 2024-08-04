import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { authSuccess, authFailure } from '../actions/authActions';

function* registerUser(action) {
  try {
    const response = yield call(axios.post, 'http://localhost:3000/api/users/register', action.payload);
    yield put(authSuccess(response.data));
  } catch (error) {
    yield put(authFailure(error.response.data.message));
  }
}

function* loginUser(action) {
  try {
    const response = yield call(axios.post, 'http://localhost:3000/api/users/login', action.payload);
    localStorage.setItem('user',JSON.stringify(response.data))
    yield put(authSuccess(response.data));
  } catch (error) {
    const errorMessage = error.response ? error.response.data.message : error.message;
    yield put(authFailure(errorMessage));
  }
}

function* watchAuthRequests() {
  yield takeEvery('REGISTER_USER_REQUEST', registerUser);
  yield takeEvery('LOGIN_USER_REQUEST', loginUser);
}

export default watchAuthRequests;
