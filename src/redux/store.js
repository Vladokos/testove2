import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga';

import categoryReducer from '../features/category/categoriesSlice';
import itemReducer from '../features/items/itemsSlice';
import userActionReducer from '../features/userActions/userActionsSlice';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        categories: categoryReducer,
        items: itemReducer,
        userActions: userActionReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)
});

sagaMiddleware.run(rootSaga);

export default store;