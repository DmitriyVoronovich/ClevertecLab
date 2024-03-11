import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createAppAsyncThunk} from "../../../common/utils/createAppAsyncThunk.ts";
import {appActions} from "../../../app/model/appSlice.ts";
import {calendarApi} from "../api/calendarApi.ts";
import {pushWithFlow} from "../../auth/model/utils/pushWithFlow.ts";
import {colors} from "./calendarData.ts";

const slice = createSlice({
    name: "training",
    initialState: {
        training: [] as TrainingParams[],
        trainingStatus: "idle" as RequestCalendarStatus,
        trainingList: [] as TrainingList[]
    },
    reducers: {
        setTrainingStatus: (state, action: PayloadAction<{
            trainingStatus: RequestCalendarStatus
        }>) => {
            state.trainingStatus = action.payload.trainingStatus;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(training.fulfilled, (state, action) => {
                state.training = action.payload.training;
            })
            .addCase(trainingList.fulfilled, (state, action) => {
                state.trainingList = action.payload.trainingList.map((item, index) => ({...item, color: colors[index]}));
            })
    }
});

// thunks

const training = createAppAsyncThunk<{ training:  TrainingParams[] }, undefined>(
    `${slice.name}/training`,
    async (_, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI;
        dispatch(appActions.setAppStatus({status: "loading"}));
        try {
            const res = await calendarApi.getTraining();
            if (res.status === 200) {
                dispatch(pushWithFlow('/calendar'));
                dispatch(calendarThunks.trainingList());
                return {training: res.data};
            } else {
                return rejectWithValue(null);
            }
        } catch (e: any) {
            dispatch(setTrainingStatus({trainingStatus: "failed"}));
            return rejectWithValue(null);
        } finally {
            dispatch(appActions.setAppStatus({status: "idle"}));
        }
    });

const trainingList = createAppAsyncThunk<{ trainingList: { name: string, key: string }[] }, undefined>(
    `${slice.name}/trainingList`,
    async (_, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI;
        dispatch(appActions.setAppStatus({status: "loading"}));
        try {
            const res = await calendarApi.getTrainingList();
            if (res.status === 200) {
                return {trainingList: res.data};
            } else {
                return rejectWithValue(null);
            }
        } catch (e: any) {
            dispatch(setTrainingStatus({trainingStatus: "error"}));
            return rejectWithValue(null);
        } finally {
            dispatch(appActions.setAppStatus({status: "idle"}));
        }
    });

export const calendarSlice = slice.reducer;
export const {setTrainingStatus} = slice.actions;
export const calendarThunks = {training, trainingList};

export type TrainingParams = {
    _id: string,
    name: string,
    date: string,
    isImplementation: boolean,
    userId: string,
    parameters: {
        repeat: boolean,
        period: number,
        jointTraining: boolean,
        participants: string[]
    },
    exercises: {
        _id: string,
        name: string,
        replays: number,
        weight: number,
        approaches: number,
        isImplementation: boolean
    }[]
};

export type RequestCalendarStatus = "idle" | "failed" | "error";

export type TrainingList = {
    name: string
    key: string
    color: string
}
