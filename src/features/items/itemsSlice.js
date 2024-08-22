import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    status: "idle"
}

const itemsSlice = createSlice({
    name: "items",
    initialState: initialState,
    reducers: {
        getItems(state, action) {
            state.status = "pending";
        },
        getItemsSuccess(state, action) {
            state.status = "success";
            state.items = action.payload;
        },
        getItemsError(state, action) {
            state.status = "error"
        },

        // create
        addItem(state, action) {
            state.categories.push(action.payload)
        },

        updateItem(state, action) {
            const { id, ...changes } = action.payload

            const index = state.categories.find(category => category.id === id);
            if (index !== -1) {
                state.categories[index] = { ...state.categories[index], ...changes };
            }
        },

        deleteItem(state, action) {
            const { id } = action.payload;
        }
    }
})

export const { getItems, getItemsSuccess, getItemsError,
    addItem, updateItem, deleteItem } = itemsSlice.actions;
export default itemsSlice.reducer;