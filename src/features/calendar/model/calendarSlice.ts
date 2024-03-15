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
        trainingList: [] as TrainingList[],
        addTrainingStatus: 'idle' as AddTrainingStatus,
        searchExercises: [] as TrainingParams[]
    },
    reducers: {
        setTrainingStatus: (state, action: PayloadAction<{
            trainingStatus: RequestCalendarStatus
        }>) => {
            state.trainingStatus = action.payload.trainingStatus;
        },
        setAddTrainingStatus: (state, action: PayloadAction<{
            addTrainingStatus: AddTrainingStatus
        }>) => {
            state.addTrainingStatus = action.payload.addTrainingStatus;
        },
        setSearchExercises: (state, action: PayloadAction<{
            searchExercises: TrainingParams[]
        }>) => {
            state.searchExercises = action.payload.searchExercises;
        },
        addSearchExercises: (state, action: PayloadAction<{
            searchExercise: TrainingParams
        }>) => {
            state.searchExercises = [...state.searchExercises, action.payload.searchExercise];
        },
        editSearchExercises: (state, action: PayloadAction<{
            searchExercise: TrainingParams
        }>) => {
            state.searchExercises = state.searchExercises.map((item: TrainingParams) => item.name === action.payload.searchExercise.name
                ? action.payload.searchExercise
                : item);
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(training.fulfilled, (state, action) => {
                state.training = action.payload.training;
            })
            .addCase(trainingList.fulfilled, (state, action) => {
                state.trainingList = action.payload.trainingList.map((item, index) => ({
                    ...item,
                    color: colors[index]
                }));
            })
            .addCase(addTraining.fulfilled, (state, action) => {
                state.addTrainingStatus = action.payload.addTrainingStatus;
            })
            .addCase(editTraining.fulfilled, (state, action) => {
                state.searchExercises = [...state.searchExercises];
                state.addTrainingStatus = action.payload.addTrainingStatus;
            })
    }
});

// thunks

const training = createAppAsyncThunk<{ training: TrainingParams[] }, undefined>(
    `${slice.name}/training`,
    async (_, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI;
        dispatch(appActions.setAppStatus({status: "loading"}));
        try {
            const res = await calendarApi.getTraining();
            if (res.status === 200) {
                dispatch(calendarThunks.trainingList(
                    () => dispatch(pushWithFlow('/calendar'))
                ));
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

const trainingList = createAppAsyncThunk<{
    trainingList: { name: string, key: string }[]
}, () => void>(
    `${slice.name}/trainingList`,
    async (callback, thunkAPI) => {
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
            callback?.();
        }
    });

const addTraining = createAppAsyncThunk<{
    addTrainingStatus: AddTrainingStatus
}, PostTrainingParams>(
    `${slice.name}/addTraining`,
    async (arg, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI;
        dispatch(setAddTrainingStatus({addTrainingStatus: 'loading'}))
        try {
            const res = await calendarApi.setTraining(arg);
            if (res.status === 200) {
                dispatch(addSearchExercises({searchExercise: res.data}))
                dispatch(setAddTrainingStatus({addTrainingStatus: 'success'}))
                dispatch(calendarThunks.training());
                return {addTrainingStatus: 'idle'}
            } else {
                dispatch(setAddTrainingStatus({addTrainingStatus: 'error'}))
                return rejectWithValue(null);
            }
        } catch (e: any) {
            dispatch(setAddTrainingStatus({addTrainingStatus: 'error'}))
            return rejectWithValue(null);
        }
    });

const editTraining = createAppAsyncThunk<{
    addTrainingStatus: AddTrainingStatus
}, {training: PostTrainingParams, trainingId: string}>(
    `${slice.name}/editTraining`,
    async (arg, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI;
        dispatch(setAddTrainingStatus({addTrainingStatus: 'loading'}))
        try {
            const res = await calendarApi.editTraining(arg.training, arg.trainingId);
            if (res.status === 200) {
                debugger
                dispatch(editSearchExercises({searchExercise: arg.training}))
                dispatch(setAddTrainingStatus({addTrainingStatus: 'success'}))
                dispatch(calendarThunks.training());
                return {addTrainingStatus: 'idle'}
            } else {
                dispatch(setAddTrainingStatus({addTrainingStatus: 'error'}))
                return rejectWithValue(null);
            }
        } catch (e: any) {
            dispatch(setAddTrainingStatus({addTrainingStatus: 'error'}))
            return rejectWithValue(null);
        }
    });

export const calendarSlice = slice.reducer;
export const {
    setTrainingStatus,
    addSearchExercises,
    setAddTrainingStatus,
    setSearchExercises,
    editSearchExercises
} = slice.actions;
export const calendarThunks = {training, trainingList, addTraining, editTraining};

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
export type AddTrainingStatus = "idle" | "success" | "error" | "loading";

export type TrainingList = {
    name: string
    key: string
    color: string
}

export type TrainExercises = {
    checkbox?: boolean
    name: string
    replays: number
    weight: number
    approaches: number
    isImplementation: boolean
}
export type PostTrainingParams = {
    name: string,
    date: string,
    isImplementation: boolean,
    parameters: {
        repeat: boolean,
        period: number,
        jointTraining: boolean,
        participants: string[]
    },
    exercises: {
        name: string,
        replays: number,
        weight: number,
        approaches: number,
        isImplementation: boolean
    }[]
};
