import {
    AddTrainingStatus,
    RequestCalendarStatus,
    RequestStatusType,
} from '@enums/enums.ts';
import { createSlice,PayloadAction } from '@reduxjs/toolkit';
import { createAppAsyncThunk } from '@utils/createAppAsyncThunk.ts';
import { pushWithFlow } from '@utils/pushWithFlow.ts';

import { appActions } from '../../../app/model/app-slice.ts';
import { calendarApi } from '../api/calendar-api.ts';

import { PostTrainingParams, TrainingList, TrainingParams } from './types/types.ts';
import { colors } from './calendar-data.ts';
import {profileThunks} from "../../profile/model/profileSlice.ts";

const slice = createSlice({
    name: 'calendar',
    initialState: {
        training: [] as TrainingParams[],
        trainingStatus: RequestCalendarStatus.Idle as RequestCalendarStatus,
        trainingList: [] as TrainingList[],
        addTrainingStatus: AddTrainingStatus.Idle as AddTrainingStatus,
        searchExercises: [] as TrainingParams[],
    },
    reducers: {
        setTrainingStatus: (
            state,
            action: PayloadAction<{
                trainingStatus: RequestCalendarStatus;
            }>,
        ) => {
            state.trainingStatus = action.payload.trainingStatus;
        },
        setAddTrainingStatus: (
            state,
            action: PayloadAction<{
                addTrainingStatus: AddTrainingStatus;
            }>,
        ) => {
            state.addTrainingStatus = action.payload.addTrainingStatus;
        },
        setSearchExercises: (
            state,
            action: PayloadAction<{
                searchExercises: TrainingParams[];
            }>,
        ) => {
            state.searchExercises = action.payload.searchExercises;
        },
        addSearchExercises: (
            state,
            action: PayloadAction<{
                searchExercise: TrainingParams;
            }>,
        ) => {
            state.searchExercises = [...state.searchExercises, action.payload.searchExercise];
        },
        setTraining: (
            state,
            action: PayloadAction<{
                training: TrainingParams[];
            }>,
        ) => {
            state.training = action.payload.training;
        },
        editSearchExercises: (
            state,
            action: PayloadAction<{
                searchExercise: any;
            }>,
        ) => {
            state.searchExercises = state.searchExercises.map((item: TrainingParams) =>
                item.name === action.payload.searchExercise.name
                    ? action.payload.searchExercise
                    : item,
            );
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
                    color: colors[index],
                }));
            })
            .addCase(addTraining.fulfilled, (state, action) => {
                state.addTrainingStatus = action.payload.addTrainingStatus;
            })
            .addCase(editTraining.fulfilled, (state, action) => {
                state.searchExercises = [...state.searchExercises];
                state.addTrainingStatus = action.payload.addTrainingStatus;
            });
    },
});

export const calendarSlice = slice.reducer;
export const {
    setTrainingStatus,
    addSearchExercises,
    setAddTrainingStatus,
    setSearchExercises,
    editSearchExercises,
    setTraining,
} = slice.actions;


// thunks

const trainingList = createAppAsyncThunk<
    {
        trainingList: Array<{ name: string; key: string }>;
    },
    () => void
>(`${slice.name}/trainingList`, async (callback, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;

    dispatch(appActions.setAppStatus({ status: RequestStatusType.Loading }));
    try {
        const res = await calendarApi.getTrainingList();

        if (res.status === 200) {
            return { trainingList: res.data };
        }

            return rejectWithValue(null);

    } catch (e: any) {
        dispatch(setTrainingStatus({ trainingStatus: RequestCalendarStatus.Error }));

        return rejectWithValue(null);
    } finally {
        dispatch(appActions.setAppStatus({ status: RequestStatusType.Idle }));
        callback?.();
    }
});

const training = createAppAsyncThunk<{ training: TrainingParams[] }, undefined>(
    `${slice.name}/training`,
    async (_, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI;

        dispatch(appActions.setAppStatus({ status: RequestStatusType.Loading }));
        try {
            const res = await calendarApi.getTraining();

            if (res.status === 200) {
                dispatch(profileThunks.me());
                dispatch(trainingList(() => dispatch(pushWithFlow('/calendar'))));

                return { training: res.data };
            }

            return rejectWithValue(null);

        } catch (e: any) {
            dispatch(setTrainingStatus({ trainingStatus: RequestCalendarStatus.Failed }));

            return rejectWithValue(null);
        } finally {
            dispatch(appActions.setAppStatus({ status: RequestStatusType.Idle }));
        }
    },
);

const addTraining = createAppAsyncThunk<
    {
        addTrainingStatus: AddTrainingStatus;
    },
    PostTrainingParams
>(`${slice.name}/addTraining`, async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;

    dispatch(setAddTrainingStatus({ addTrainingStatus: AddTrainingStatus.Loading }));
    try {
        const res = await calendarApi.setTraining(arg);

        if (res.status === 200) {
            dispatch(addSearchExercises({ searchExercise: res.data }));
            dispatch(setAddTrainingStatus({ addTrainingStatus: AddTrainingStatus.Success }));
            dispatch(training());

            return { addTrainingStatus: AddTrainingStatus.Idle };
        }
            dispatch(setAddTrainingStatus({ addTrainingStatus: AddTrainingStatus.Error }));

            return rejectWithValue(null);

    } catch (e: any) {
        dispatch(setAddTrainingStatus({ addTrainingStatus: AddTrainingStatus.Error }));

        return rejectWithValue(null);
    }
});

const editTraining = createAppAsyncThunk<
    {
        addTrainingStatus: AddTrainingStatus;
    },
    { training: TrainingParams; trainingId: string }
>(`${slice.name}/editTraining`, async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;

    dispatch(setAddTrainingStatus({ addTrainingStatus: AddTrainingStatus.Loading }));
    try {
        const res = await calendarApi.editTraining(arg.training, arg.trainingId);

        if (res.status === 200) {
            dispatch(editSearchExercises({ searchExercise: arg.training }));
            dispatch(setAddTrainingStatus({ addTrainingStatus: AddTrainingStatus.Success }));
            dispatch(training());

            return { addTrainingStatus: AddTrainingStatus.Idle };
        }
            dispatch(setAddTrainingStatus({ addTrainingStatus: AddTrainingStatus.Error }));

            return rejectWithValue(null);

    } catch (e: any) {
        dispatch(setAddTrainingStatus({ addTrainingStatus: AddTrainingStatus.Error }));

        return rejectWithValue(null);
    }
});

export const calendarThunks = { training, trainingList, addTraining, editTraining };
