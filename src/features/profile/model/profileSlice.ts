import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {createAppAsyncThunk} from '@utils/createAppAsyncThunk.ts';
import {RequestProfileStatus} from '@enums/enums.ts';
import {ProfileInformation} from './types/types.ts';
import {profileApi} from '../api/profile-api.ts';

const me = createAppAsyncThunk<
    { meInformation: ProfileInformation },
    undefined
>('profile/me', async (_, thunkAPI) => {
    const {rejectWithValue} = thunkAPI;

    try {
        const res = await profileApi.getUserInformation();

        if (res.status === 200) {
            return {meInformation: res.data};
        }

        return rejectWithValue(null);
    } catch (e: any) {

        return rejectWithValue(null);
    }
});



const slice = createSlice({
    name: 'profile',
    initialState: {
        meInformation: {} as ProfileInformation,
        profileStatus: RequestProfileStatus.Idle,
        avatarUrl: ''
    },
    reducers: {
        setProfileStatus: (
            state,
            action: PayloadAction<{
                profileStatus: RequestProfileStatus;
            }>,
        ) => {
            state.profileStatus = action.payload.profileStatus;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(me.fulfilled, (state, action) => {
                state.meInformation = action.payload.meInformation;
            })
            .addCase(editUserInformation.fulfilled, (state, action) => {
                state.meInformation = action.payload.meInformation;
            })
            .addCase(editUserAvatar.fulfilled, (state, action) => {
                state.avatarUrl = action.payload.avatarUrl;
            })

    },
});

export const {setProfileStatus} = slice.actions;

const editUserInformation = createAppAsyncThunk<
    { meInformation: ProfileInformation },
    { user: ProfileInformation }
>(`profile/editUserInformation`, async (user, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI;

    try {
        const res = await profileApi.editUserInformation(user.user);

        if (res.status === 200) {
            dispatch(me())
            dispatch(setProfileStatus({profileStatus: RequestProfileStatus.Selected}));

            return {meInformation: res.data};
        }

        return rejectWithValue(null);
    } catch (e: any) {
        dispatch(setProfileStatus({profileStatus: RequestProfileStatus.Error}));

        return rejectWithValue(null);
    }
});

const editUserAvatar = createAppAsyncThunk<
    { avatarUrl: string },
    { avatar: any }
>('profile/editUserAvatar', async (avatar, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI;

    try {
        const res = await profileApi.editUserAvatar(avatar.avatar);

        if (res.status === 200) {
            dispatch(setProfileStatus({profileStatus: RequestProfileStatus.Succeeded}));

            return {avatarUrl: res.data.url};
        }

        return rejectWithValue(null);
    } catch (e: any) {
        dispatch(setProfileStatus({profileStatus: RequestProfileStatus.Failed}));

        return rejectWithValue(null);
    }
});

export const profileSlice = slice.reducer;

export const profileThunks = {me, editUserInformation, editUserAvatar};
