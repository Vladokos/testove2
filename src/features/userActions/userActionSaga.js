import { takeEvery, put, takeLatest } from 'redux-saga/effects';
import { getUserActionsSuccess, getUserActionsError, addUserActionSuccess, addUserActionError, updateUserAction, deleteUserAction } from './userActionsSlice';

function* getUserActionsSaga() {
  try {
    yield put(getUserActionsSuccess([]));
  } catch (error) {
    yield put(getUserActionsError());
  }
}


function* addUserActionSaga(action) {
  try {
    yield put(addUserActionSuccess(action.payload))
  } catch (error) {
    yield put(addUserActionError());
  }
}

function* handleUpdateUserAction(action) {
  yield put(updateUserAction(action.payload));
}

function* handleDeleteUserAction(action) {
  yield put(deleteUserAction(action.payload));
}

export function* watchGetUserActions() {
  yield takeLatest("userActions/getUserActions", getUserActionsSaga)
}

export function* watchAddUserAction() {
  yield takeLatest("userActions/addUserAction", addUserActionSaga)
}

export default function* userActionSaga() {
  yield takeEvery('userActions/updateUserAction', handleUpdateUserAction);
  yield takeEvery('userActions/deleteUserAction', handleDeleteUserAction);
}