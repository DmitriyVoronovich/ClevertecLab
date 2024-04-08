import {
    AddTrainingStatus,
    InvitationToJointTraining,
    RequestCalendarStatus,
    RequestStatusType,
    RequestTrainStatus,
    TrainingSelectedMenu
} from '@enums/enums.ts';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {createAppAsyncThunk} from '@utils/createAppAsyncThunk.ts';
import {pushWithFlow} from '@utils/pushWithFlow.ts';

import {appActions} from '../../../app/model/appSlice.ts';
import {calendarApi} from '../../calendar/api/calendar-api.ts';
import {
    addSearchExercises,
    calendarThunks,
    editSearchExercises,
    setAddTrainingStatus,
    setTraining,
    setTrainingStatus
} from '../../calendar/model/calendar-slice.ts';
import {PostTrainingParams, TrainingParams} from '../../calendar/model/types/types.ts';
import { trainingApi} from '../api/training-api.ts';

import {TrainingPals} from './types/types.ts';
import {Invitation, inviteApi} from '../../invite/api/invite-api.ts';


const slice = createSlice({
    name: 'training',
    initialState: {
        selectedMenuItem: TrainingSelectedMenu.MyWorkouts as TrainingSelectedMenu,
        requestTrainStatus: RequestTrainStatus.Idle as RequestTrainStatus,
        trainingPalsList: [] as TrainingPals[],
        jointTrainingUserList: [] as TrainingPals[],
        invitationMode: InvitationToJointTraining.Idle as InvitationToJointTraining,
        userId: ''
    },
    reducers: {
        setSelectedMenuItem: (
            state,
            action: PayloadAction<{
                selectedMenuItem: TrainingSelectedMenu;
            }>,
        ) => {
            state.selectedMenuItem = action.payload.selectedMenuItem;
        },
        setUserId: (
            state,
            action: PayloadAction<{
                userId: string;
            }>,
        ) => {
            state.userId = action.payload.userId;
        },
        setRequestTrainStatus: (
            state, action: PayloadAction<{
                requestTrainStatus: RequestTrainStatus
            }>
        ) => {
            state.requestTrainStatus = action.payload.requestTrainStatus
        },
        setInvitationMode: (
            state, action: PayloadAction<{
                invitationMode: InvitationToJointTraining
            }>
        ) => {
            state.invitationMode = action.payload.invitationMode
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTrainingPalsList.fulfilled, (state, action) => {
                state.trainingPalsList = action.payload.trainingPalsList;
            })
            .addCase(getUserTrainingList.fulfilled, (state, action) => {
                state.jointTrainingUserList = action.payload.jointTrainingUserList;
            })
    }
});

export const {
    setSelectedMenuItem,
    setRequestTrainStatus,
    setInvitationMode,
    setUserId
} = slice.actions;

const sendInvite = createAppAsyncThunk<
    {
        requestTrainStatus: RequestTrainStatus;
    },
    { invitation: Invitation }
>(`${slice.name}/sendInvite`, async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI;

    try {
        const res = await inviteApi.sendAnInvitation({
            to: arg.invitation.to,
            trainingId: arg.invitation.trainingId
        });

        if (res.status === 200) {

            return {requestTrainStatus: RequestTrainStatus.Idle};
        }

        return rejectWithValue(null);

    } catch (e: any) {

        return rejectWithValue(null);
    } finally {
        dispatch(setInvitationMode({invitationMode: InvitationToJointTraining.Idle}))
    }
});

const getTraining = createAppAsyncThunk<{ training: TrainingParams[] }, undefined>(
    `${slice.name}/getTraining`,
    async (_, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI;

        dispatch(appActions.setAppStatus({status: RequestStatusType.Loading}));
        try {
            const res = await calendarApi.getTraining();

            if (res.status === 200) {
                dispatch(calendarThunks.trainingList(() => dispatch(pushWithFlow('/training'))));
                dispatch(setSelectedMenuItem({selectedMenuItem: TrainingSelectedMenu.MyWorkouts}));

                dispatch(setTraining({training: res.data}))
                return {training: res.data};
            }

            return rejectWithValue(null);

        } catch (e: any) {
            dispatch(setTrainingStatus({trainingStatus: RequestCalendarStatus.Failed}));

            return rejectWithValue(null);
        } finally {
            dispatch(appActions.setAppStatus({status: RequestStatusType.Idle}));
        }
    },
);

const addTraining = createAppAsyncThunk<
    {
        requestTrainStatus: RequestTrainStatus;
    },
    PostTrainingParams
>(`${slice.name}/addTraining`, async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue, getState} = thunkAPI;
    const {invitationMode, userId} = getState().training;

    try {
        const res = await calendarApi.setTraining(arg);

        if (res.status === 200) {
            dispatch(addSearchExercises({searchExercise: res.data}));
            dispatch(setRequestTrainStatus({requestTrainStatus: RequestTrainStatus.Succeeded}));
            if (invitationMode) {
                dispatch(sendInvite({invitation: {to: userId, trainingId: res.data._id}}))
            }
            dispatch(getTraining());

            return {requestTrainStatus: RequestTrainStatus.Idle};
        }
        dispatch(setRequestTrainStatus({requestTrainStatus: RequestTrainStatus.Failed}));

        return rejectWithValue(null);

    } catch
        (e: any) {
        dispatch(setRequestTrainStatus({requestTrainStatus: RequestTrainStatus.Failed}));

        return rejectWithValue(null);
    }
});

const editTraining = createAppAsyncThunk<
    {
        addTrainingStatus: AddTrainingStatus;
    },
    { training: TrainingParams; trainingId: string }
>(`${slice.name}/editTraining`, async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI;

    dispatch(setAddTrainingStatus({addTrainingStatus: AddTrainingStatus.Loading}));
    try {
        const res = await calendarApi.editTraining(arg.training, arg.trainingId);

        if (res.status === 200) {
            dispatch(editSearchExercises({searchExercise: arg.training}));
            dispatch(setAddTrainingStatus({addTrainingStatus: AddTrainingStatus.Success}));
            dispatch(getTraining());

            return {addTrainingStatus: AddTrainingStatus.Idle};
        }
        dispatch(setAddTrainingStatus({addTrainingStatus: AddTrainingStatus.Error}));

        return rejectWithValue(null);

    } catch (e: any) {
        dispatch(setAddTrainingStatus({addTrainingStatus: AddTrainingStatus.Error}));

        return rejectWithValue(null);
    }
});

const getTrainingPalsList = createAppAsyncThunk<{ trainingPalsList: TrainingPals[] }, undefined>(
    `${slice.name}/getTrainingPalsList`,
    async (_, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI;

        dispatch(appActions.setAppStatus({status: RequestStatusType.Loading}));
        try {

            const res = await trainingApi.getTrainingPalsList();

            if (res.status === 200) {

                return {trainingPalsList: res.data};
            }

            return rejectWithValue(null);

        } catch (e: any) {
            dispatch(setTrainingStatus({trainingStatus: RequestCalendarStatus.Failed}));

            return rejectWithValue(null);
        } finally {
            dispatch(appActions.setAppStatus({status: RequestStatusType.Idle}));
        }
    },
);

const getUserTrainingList = createAppAsyncThunk<{ jointTrainingUserList: TrainingPals[] }, {
    trainingType: string
}>(
    `${slice.name}/getUserTrainingList`,
    async ({trainingType}, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI;

        dispatch(appActions.setAppStatus({status: RequestStatusType.Loading}));
        try {

            const res = await trainingApi.getUserJointTraining(trainingType);

            if (res.status === 200) {
                return {jointTrainingUserList: res.data};
            }

            return rejectWithValue(null);

        } catch (e: any) {
            dispatch(setRequestTrainStatus({requestTrainStatus: RequestTrainStatus.Error}));

            return rejectWithValue(null);
        } finally {
            dispatch(appActions.setAppStatus({status: RequestStatusType.Idle}));
        }
    },
);

export const trainingSlice = slice.reducer;


export const trainingThunks = {
    getTraining,
    addTraining,
    editTraining,
    getTrainingPalsList,
    getUserTrainingList,
    sendInvite
};
