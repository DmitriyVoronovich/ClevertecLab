import {RequestStatusType, RequestTrainStatus} from '@enums/enums.ts';
import {createSlice} from '@reduxjs/toolkit';
import {createAppAsyncThunk} from '@utils/createAppAsyncThunk.ts';

import {appActions} from '../../../app/model/appSlice.ts';
import {setRequestTrainStatus, trainingThunks} from '../../training/model/training-slice.ts';
import {inviteApi, InviteParams, ResponseInvitation} from '../api/invite-api.ts';


const slice = createSlice({
    name: 'invite',
    initialState: {
        inviteList: [] as InviteParams[]
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getInvite.fulfilled, (state, action) => {
                state.inviteList = action.payload.inviteList;
            })
            .addCase(resToInvite.fulfilled, (state, action) => {
                state.inviteList = state.inviteList.filter((item) => item._id !== action.payload.invite._id);
            })
    }
});

export const {} = slice.actions;

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

        if (res.status === 200) {

            return {inviteList: res.data};
        }

        return rejectWithValue(null);

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

        if (res.status === 200) {

            return {invite: res.data};
        }

        return rejectWithValue(null);

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
        const res = await inviteApi.removeInvitation(id );

        if (res.status === 200) {

            dispatch(trainingThunks.getTrainingPalsList())

            return undefined;
        }

        return rejectWithValue(null);

    } catch (e: any) {
        dispatch(setRequestTrainStatus({requestTrainStatus: RequestTrainStatus.Failed}));

        return rejectWithValue(null);
    } finally {
        dispatch(appActions.setAppStatus({status: RequestStatusType.Idle}));
    }
});


export const inviteSlice = slice.reducer;


export const inviteThunks = {getInvite, resToInvite, removeInvite};
