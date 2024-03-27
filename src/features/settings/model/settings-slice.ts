import {RequestSettingsStatus} from '@enums/enums.ts';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {createAppAsyncThunk} from '@utils/createAppAsyncThunk.ts';
import {pushWithFlow} from '@utils/pushWithFlow.ts';

import {settingsApi} from '../api/settings-api.ts';

import {TrafficList} from './types/types.ts';

const getTrafficList = createAppAsyncThunk<
    { trafficList: TrafficList[] },
    undefined
>('settings/getTrafficList', async (_, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI;

    try {
        const res = await settingsApi.getTrafficList();

        if (res.status === 200) {
            return {trafficList: res.data};
        }

        return rejectWithValue(null);
    } catch (e: any) {
        return rejectWithValue(null);
    } finally {
        dispatch(pushWithFlow('/settings'));
    }
});

const addTariff = createAppAsyncThunk<
    { settingsStatus: RequestSettingsStatus },
    {
        tariffId: string,
        days: number
    }
>('settings/addTariff', async (arg, thunkAPI) => {
    const {rejectWithValue} = thunkAPI;

    try {
        const res = await settingsApi.addTariff({
            tariffId: arg.tariffId,
            days: arg.days
        });

        if (res.status === 200) {
            return {settingsStatus: RequestSettingsStatus.Succeeded};
        }

        return rejectWithValue(null);
    } catch (e: any) {

        return rejectWithValue(null);
    }
});


const slice = createSlice({
    name: 'settings',
    initialState: {
        trafficList: [] as TrafficList[],
        settingsStatus: RequestSettingsStatus.Idle
    },
    reducers: {
        setSettingsStatus: (
            state,
            action: PayloadAction<{
                settingsStatus: RequestSettingsStatus;
            }>,
        ) => {
            state.settingsStatus = action.payload.settingsStatus;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTrafficList.fulfilled, (state, action) => {
                state.trafficList = action.payload.trafficList;
            })
            .addCase(addTariff.fulfilled, (state, action) => {
                state.settingsStatus = action.payload.settingsStatus;
            })
    },
});

export const settingsSlice = slice.reducer;
export const {setSettingsStatus} = slice.actions;
export const settingsThunks = {getTrafficList, addTariff};
