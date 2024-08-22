import { all, fork } from 'redux-saga/effects';
import categoriesSaga, { watchGetCategories } from '../features/category/categoriesSaga';
import itemSaga, {watchGetItems} from '../features/items/itemSaga';
import userActionSaga, {watchGetUserActions,watchAddUserAction} from '../features/userActions/userActionSaga';

export default function* rootSaga() {
  yield all([
    fork(watchGetCategories),
    fork(watchGetItems),
    fork(watchGetUserActions),
    fork(watchAddUserAction),
    categoriesSaga(),
    itemSaga(),
    userActionSaga()
  ]);
}