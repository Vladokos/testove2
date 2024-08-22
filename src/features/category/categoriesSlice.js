import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    categories: [],
    status:"idle"
}

const categorySlice = createSlice({
    name: "categories",
    initialState: initialState,
    reducers: {
        getCategories(state, action) {
            state.status = "pending"
        },
        getCategoriesSuccess(state, action) {
            state.status = "success"
            state.categories = action.payload
        },
        getCategoriesError(state, action){
            state.status = "error";
        },
        // create
        addCategory(state, action) {
            state.categories.push(action.payload)
        },

        updateCategory(state, action) {
            const { id, ...changes } = action.payload

            const index = state.categories.find(category => category.id === id);
            if (index !== -1) {
                state.categories[index] = { ...state.categories[index], ...changes };
            }
        },

        deleteCategory(state, action) {
            const { id } = action.payload;

        }
    }
})

export const { getCategories, getCategoriesSuccess, getCategoriesError,
    addCategory, updateCategory, deleteCategory } = categorySlice.actions;
export default categorySlice.reducer;