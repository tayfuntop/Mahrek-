import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    id: 1,
};

export const currentId = createSlice({
    name: 'currentId',
    initialState,
    reducers: {
        setCurrentId: (state, action) => {
            state.id = action.payload;
        }
    }
});

export const { setCurrentId } = currentId.actions;

export default currentId.reducer;