import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RequestStatusType } from '../../common/enums/enums.ts';

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
