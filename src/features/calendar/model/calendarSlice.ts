import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createAppAsyncThunk} from "../../../common/utils/createAppAsyncThunk.ts";
import {appActions} from "../../../app/model/appSlice.ts";
import {calendarApi} from "../api/calendarApi.ts";
import {pushWithFlow} from "../../auth/model/utils/pushWithFlow.ts";
import {colors} from "./calendarData.ts";
import {PostTrainingParams, TrainingList, TrainingParams} from "./types/types.ts";
import {
    AddTrainingStatus,
    RequestCalendarStatus,
    RequestStatusType
} from "../../../common/enums/enums.ts";

const slice = createSlice({
    name: "training",
    initialState: {
        training: [] as TrainingParams[],
        trainingStatus: RequestCalendarStatus.Idle as RequestCalendarStatus,
        trainingList: [] as TrainingList[],
        addTrainingStatus: AddTrainingStatus.Idle as AddTrainingStatus,
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
            searchExercise: any
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
        dispatch(appActions.setAppStatus({status: RequestStatusType.Loading}));
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
            dispatch(setTrainingStatus({trainingStatus: RequestCalendarStatus.Failed}));
            return rejectWithValue(null);
        } finally {
            dispatch(appActions.setAppStatus({status: RequestStatusType.Idle}));
        }
    });

const trainingList = createAppAsyncThunk<{
    trainingList: { name: string, key: string }[]
}, () => void>(
    `${slice.name}/trainingList`,
    async (callback, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI;
        dispatch(appActions.setAppStatus({status: RequestStatusType.Loading}));
        try {
            const res = await calendarApi.getTrainingList();
            if (res.status === 200) {
                return {trainingList: res.data};
            } else {
                return rejectWithValue(null);
            }
        } catch (e: any) {
            dispatch(setTrainingStatus({trainingStatus: RequestCalendarStatus.Error}));
            return rejectWithValue(null);
        } finally {
            dispatch(appActions.setAppStatus({status: RequestStatusType.Idle}));
            callback?.();
        }
    });

const addTraining = createAppAsyncThunk<{
    addTrainingStatus: AddTrainingStatus
}, PostTrainingParams>(
    `${slice.name}/addTraining`,
    async (arg, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI;
        dispatch(setAddTrainingStatus({addTrainingStatus: AddTrainingStatus.Loading}))
        try {
            const res = await calendarApi.setTraining(arg);
            if (res.status === 200) {
                dispatch(addSearchExercises({searchExercise: res.data}))
                dispatch(setAddTrainingStatus({addTrainingStatus: AddTrainingStatus.Success}))
                dispatch(calendarThunks.training());
                return {addTrainingStatus: AddTrainingStatus.Idle}
            } else {
                dispatch(setAddTrainingStatus({addTrainingStatus: AddTrainingStatus.Error}))
                return rejectWithValue(null);
            }
        } catch (e: any) {
            dispatch(setAddTrainingStatus({addTrainingStatus: AddTrainingStatus.Error}))
            return rejectWithValue(null);
        }
    });

const editTraining = createAppAsyncThunk<{
    addTrainingStatus: AddTrainingStatus
}, { training: PostTrainingParams, trainingId: string }>(
    `${slice.name}/editTraining`,
    async (arg, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI;
        dispatch(setAddTrainingStatus({addTrainingStatus: AddTrainingStatus.Loading}))
        try {
            const res = await calendarApi.editTraining(arg.training, arg.trainingId);
            if (res.status === 200) {
                dispatch(editSearchExercises({searchExercise: arg.training}))
                dispatch(setAddTrainingStatus({addTrainingStatus: AddTrainingStatus.Success}))
                dispatch(calendarThunks.training());
                return {addTrainingStatus: AddTrainingStatus.Idle}
            } else {
                dispatch(setAddTrainingStatus({addTrainingStatus: AddTrainingStatus.Error}))
                return rejectWithValue(null);
            }
        } catch (e: any) {
            dispatch(setAddTrainingStatus({addTrainingStatus: AddTrainingStatus.Error}))
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
