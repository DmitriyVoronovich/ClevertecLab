import { RequestStatusType } from '@enums/enums.ts';
import { createSlice,PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    status: RequestStatusType.Idle as RequestStatusType,
};

const slice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
            state.status = action.payload.status;
        },
    },
});

export const appSlice = slice.reducer;
export const appActions = slice.actions;
