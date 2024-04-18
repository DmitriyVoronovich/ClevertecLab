import {RequestCalendarStatus, RequestStatusType} from '@enums/enums.ts';
import {createSlice} from '@reduxjs/toolkit';
import {createAppAsyncThunk} from '@utils/create-app-async-thunk.ts';
import {pushWithFlow} from '@utils/push-with-flow.ts';

import {appActions} from '../../../app/model/app-slice.ts';
import {calendarApi} from '../../calendar/api/calendar-api.ts';
import {
    calendarThunks,
    setTraining,
    setTrainingStatus
} from '../../calendar/model/calendar-slice.ts';
import {profileThunks} from '../../profile/model/profileSlice.ts';

const slice = createSlice({
    name: 'achievements',
    initialState: {},
    reducers: {},
    extraReducers: () => {
    }
});

const getTraining = createAppAsyncThunk<undefined, undefined>(
    'achievements/getTraining',
    async (_, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI;

        dispatch(appActions.setAppStatus({status: RequestStatusType.Loading}));
        try {
            const res = await calendarApi.getTraining();

            dispatch(profileThunks.me());
            dispatch(setTraining({training: res.data}));
            dispatch(calendarThunks.trainingList(() => dispatch(pushWithFlow('/achievements'))));

            return undefined;

        } catch (e: any) {
            dispatch(setTrainingStatus({trainingStatus: RequestCalendarStatus.Failed}));

            return rejectWithValue(null);
        } finally {
            dispatch(appActions.setAppStatus({status: RequestStatusType.Idle}));
        }
    },
);

export const achievementsSlice = slice.reducer;

export const achievementsThunks = {
    getTraining
};
