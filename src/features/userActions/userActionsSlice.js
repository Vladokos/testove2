import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userActions: [],
    status: "idle"
}

const userActionsSlice = createSlice({
    name: "userActions",
    initialState: initialState,
    reducers: {
        getUserActions(state, action){
            state.status = "pending";
        },
        getUserActionsSuccess(state, action){
            state.status = "success";
            state.userActions = action.payload;
        },
        getUserActionsError(state, action){
            state.status = "error";
        },

        // create
        addUserAction(state, action) {
            state.status = "pending";
        },

        addUserActionSuccess(state, action) {
            state.status = "success";
            state.userActions.push(action.payload);
        },

        addUserActionError(state, action) {
            state.status = "error";
        },

        updateUserAction(state, action) {
            const { id, ...changes } = action.payload

            const index = state.categories.find(category => category.id === id);
            if (index !== -1) {
                state.categories[index] = { ...state.categories[index], ...changes };
            }
        },

        deleteUserAction(state, action) {
            const { id } = action.payload;

        }
    }
})

export const {getUserActions, getUserActionsError,getUserActionsSuccess,
    addUserAction, addUserActionSuccess, addUserActionError,
     updateUserAction, deleteUserAction } = userActionsSlice.actions;
export default userActionsSlice.reducer;