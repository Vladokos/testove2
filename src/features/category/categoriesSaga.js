import { takeEvery, put, takeLatest } from 'redux-saga/effects';
import { getCategoriesSuccess, getCategoriesError, addCategory, updateCategory, deleteCategory } from './categoriesSlice';

function* getCategoriesSaga() {
  try {
    const data = [
      { "id": 1, "name": "Яблоки", "flags": "seasonal" },
      { "id": 2, "name": "Бананы", "flags": "tropical" },
      { "id": 3, "name": "Апельсины", "flags": "citrus" },
      { "id": 4, "name": "Груши", "flags": "seasonal" },
      { "id": 5, "name": "Киви", "flags": "exotic" },
      { "id": 6, "name": "Манго", "flags": "" },
    ]

    yield put(getCategoriesSuccess(data))
  } catch (error) {
    yield put(getCategoriesError())
  }
}

function* handleAddCategory(action) {
  // Example of handling adding category, potentially with async operations
  yield put(addCategory(action.payload));
}

function* handleUpdateCategory(action) {
  yield put(updateCategory(action.payload));
}

function* handleDeleteCategory(action) {
  yield put(deleteCategory(action.payload));
}

export function* watchGetCategories() {
  yield takeLatest('categories/getCategories', getCategoriesSaga)
}

export default function* categoriesSaga() {
  yield takeEvery('categories/addCategory', handleAddCategory);
  yield takeEvery('categories/updateCategory', handleUpdateCategory);
  yield takeEvery('categories/deleteCategory', handleDeleteCategory);
}