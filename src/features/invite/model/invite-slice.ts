import {
    InvitationToJointTraining,
    RequestStatusType,
    RequestTrainStatus,
    TrainingSelectedMenu
} from '@enums/enums.ts';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {createAppAsyncThunk} from '@utils/createAppAsyncThunk.ts';

import {appActions} from '../../../app/model/app-slice.ts';
import {
    setChangeUserStatus,
    setInvitationMode,
    setRemoveTrain,
    setRequestTrainStatus,
    setSelectedMenuItem,
    trainingThunks
} from '../../training/model/training-slice.ts';
import {inviteApi} from '../api/invite-api.ts';
import {Invitation, InviteParams, ResponseInvitation} from '../api/types/types.ts';


const slice = createSlice({
    name: 'invite',
    initialState: {
        inviteList: [] as InviteParams[]
    },
    reducers: {
        setFilterInvite: (
            state, action: PayloadAction<{
                invite: string
            }>
        ) => {
            state.inviteList = state.inviteList.filter((item) => item._id !== action.payload.invite)
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getInvite.fulfilled, (state, action) => {
                state.inviteList = action.payload.inviteList;
            })
    }
});

export const {setFilterInvite} = slice.actions;

const getInvite = createAppAsyncThunk<
    {
        inviteList: InviteParams[];
    },
    undefined
>(`${slice.name}/getInvite`, async (_arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI;

    dispatch(appActions.setAppStatus({status: RequestStatusType.Loading}));
    try {
        const res = await inviteApi.getInvite();

        return {inviteList: res.data};

    } catch (e: any) {

        return rejectWithValue(null);
    } finally {
        dispatch(appActions.setAppStatus({status: RequestStatusType.Idle}));
    }
});

const resToInvite = createAppAsyncThunk<
    {
        invite: InviteParams;
    },
    { arg: ResponseInvitation }
>(`${slice.name}/resToInvite`, async ({arg}, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI;

    dispatch(appActions.setAppStatus({status: RequestStatusType.Loading}));
    try {
        const res = await inviteApi.responseToInvitation({id: arg.id, status: arg.status});

        dispatch(setFilterInvite({invite: arg.id}))

        if (res.data.status === 'accepted') {
            dispatch(trainingThunks.getTrainingPalsList());
            dispatch(setSelectedMenuItem({selectedMenuItem: TrainingSelectedMenu.MyTrainingPartner}));
        }

        return {invite: res.data};

    } catch (e: any) {

        return rejectWithValue(null);
    } finally {
        dispatch(appActions.setAppStatus({status: RequestStatusType.Idle}));
    }
});

const removeInvite = createAppAsyncThunk<
    undefined,
    { id: string }
>(`${slice.name}/removeInvite`, async ({id}, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI;

    dispatch(appActions.setAppStatus({status: RequestStatusType.Loading}));
    try {
        const res = await inviteApi.removeInvitation(id);

        dispatch(setFilterInvite({invite: id}))
        dispatch(setRemoveTrain({id}))

        return undefined;

    } catch (e: any) {
        dispatch(setRequestTrainStatus({requestTrainStatus: RequestTrainStatus.Failed}));

        return rejectWithValue(null);
    } finally {
        dispatch(appActions.setAppStatus({status: RequestStatusType.Idle}));
    }
});

const sendInvite = createAppAsyncThunk<
    undefined,
    { invitation: Invitation }
>(`${slice.name}/sendInvite`, async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI;

    try {
        const res = await inviteApi.sendAnInvitation({
            to: arg.invitation.to,
            trainingId: arg.invitation.trainingId
        });

            dispatch(setChangeUserStatus({userId: res.data.to}));
            dispatch(setSelectedMenuItem({selectedMenuItem: TrainingSelectedMenu.UserJointTrainingList}));

            return undefined;

    } catch (e: any) {

        return rejectWithValue(null);
    } finally {
        dispatch(setInvitationMode({invitationMode: InvitationToJointTraining.Idle}))
    }
});


export const inviteSlice = slice.reducer;


export const inviteThunks = {getInvite, resToInvite, removeInvite, sendInvite};
