import { takeEvery, put, takeLatest } from 'redux-saga/effects';
import { getItemsSuccess, getItemsError, addItem, updateItem, deleteItem } from './itemsSlice';

function* getItemsSaga() {
    try {
        const data = [
            { "id": 1, "parent_id": 1, "name": "Гренни Смит", "flags": "green" },
            { "id": 2, "parent_id": 1, "name": "Фуджи", "flags": "sweet" },
            { "id": 3, "parent_id": 2, "name": "Кавендиш", "flags": "sweet" },
            { "id": 4, "parent_id": 2, "name": "Красный банан", "flags": "red" },
            { "id": 5, "parent_id": 3, "name": "Навел", "flags": "juicy" },
            { "id": 6, "parent_id": 3, "name": "Севилья", "flags": "bitter" },
            { "id": 7, "parent_id": 4, "name": "Конференция", "flags": "soft" },
            { "id": 8, "parent_id": 4, "name": "Боск", "flags": "crisp" },
            { "id": 9, "parent_id": 5, "name": "Золотистый киви", "flags": "sweet" },
            { "id": 10, "parent_id": 5, "name": "Зеленый киви", "flags": "tart" },
            { "id": 11, "parent_id": 6, "name": "Нам Док Май", "flags": "" },
            { "id": 12, "parent_id": 6, "name": "Кат Чу", "flags": "" },
            { "id": 13, "parent_id": 6, "name": "мини", "flags": "" },
        ]

        yield put(getItemsSuccess(data));
    } catch (error) {
        yield put(getItemsError());
    }
}

function* handleAddItem(action) {
    yield put(addItem(action.payload));
}

function* handleUpdateItem(action) {
    yield put(updateItem(action.payload));
}

function* handleDeleteItem(action) {
    yield put(deleteItem(action.payload));
}

export function* watchGetItems() {
    yield takeLatest("items/getItems", getItemsSaga)
}

export default function* itemSaga() {
    yield takeEvery('items/addItem', handleAddItem);
    yield takeEvery('items/updateItem', handleUpdateItem);
    yield takeEvery('items/deleteItem', handleDeleteItem);
}

