import {createSlice} from "@reduxjs/toolkit";
import {createAppAsyncThunk} from "../../common/utils/create-app-async-thunk.ts";
import {authApi, CodeParamsType, LoginParamsType, PasswordParamsType} from "./auth.api.ts";
import {push} from "redux-first-history";
import {FormType} from "@pages/login/login-page/login-form/LoginForm.tsx";

const slice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: false,
        isRegistered: false,
        email: ''
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registration.fulfilled, (state, action) => {
                state.isRegistered = action.payload.isRegistered;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn;
            })
            .addCase(checkEmail.fulfilled, (state, action) => {
                state.email = action.payload.email;
            })
    }
});

// thunks

const registration = createAppAsyncThunk<{ isRegistered: boolean }, LoginParamsType>(
    `${slice.name}/registration`,
    async (arg, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI;
        try {
            const res = await authApi.registration(arg);
            if (res.status === 201) {
                sessionStorage.removeItem('data-registration');
                dispatch(push('/result/success'));
                return {isRegistered: true};
            } else {
                return rejectWithValue(null);
            }
        } catch (e: any) {
            if (e.response.status === 409) {
                dispatch(push('/result/error-user-exist'));
                return rejectWithValue(null);
            } else {
                dispatch(push('/result/error'));
                return rejectWithValue(null);
            }
        }
    })

const login = createAppAsyncThunk<{ isLoggedIn: boolean }, FormType>(
    `${slice.name}/login`,
    async (arg, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI;
        try {
            const data = {email: arg.email, password: arg.password};
            const res = await authApi.login(data);
            if (res.status === 200) {
                sessionStorage.setItem('isLoggedIn', JSON.stringify(true));
                if (arg.remember) {
                    localStorage.setItem('jwtToken', JSON.stringify(res.data.accessToken));
                }
                dispatch(push('/main'));
                return {isLoggedIn: true};
            } else {
                return rejectWithValue(null);
            }
        } catch (e) {
            dispatch(push('/result/error-login'));
            return rejectWithValue(null);
        }
    })

const checkEmail = createAppAsyncThunk<{ email: string }, string>(
    `${slice.name}/checkEmail`,
    async (arg, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI;
        try {
            const res = await authApi.checkEmail({email: arg});
            if (res.status === 200) {
                dispatch(push('/auth/confirm-email'));
                sessionStorage.removeItem('email');
                return {email: res.data.email};
            } else {
                return rejectWithValue(null);
            }
        } catch (e: any) {
            if (e.response.data.statusCode === 404 && e.response.data.message === 'Email не найден') {
                dispatch(push('/result/error-check-email-no-exist'));
                return rejectWithValue(null);
            } else {
                dispatch(push('/result/error-check-email'));
                return rejectWithValue(null);
            }
        }
    })

const confirmEmail = createAppAsyncThunk<undefined, CodeParamsType>(
    `${slice.name}/confirmEmail`,
    async (arg, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI;
        try {
            const res = await authApi.confirmEmail(arg);
            if (res.status === 200) {
                dispatch(push('/auth/change-password'));
            } else {
                return rejectWithValue(null);
            }
        } catch (e: any) {
            dispatch(push('/auth/confirm-email'));
            return rejectWithValue(null);
        }
    })

const changePassword = createAppAsyncThunk<undefined, PasswordParamsType>(
    `${slice.name}/changePassword`,
    async (arg, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI;
        try {
            const res = await authApi.changePassword(arg);
            if (res.status === 201) {
                sessionStorage.removeItem('changePassword');
                dispatch(push('/result/success-change-password'));
            } else {
                return rejectWithValue(null);
            }
        } catch (e: any) {
            dispatch(push('/result/error-change-password'));
            return rejectWithValue(null);
        }
    })
export const authReducer = slice.reducer;
export const authActions = slice.actions;
export const authThunks = {registration, login, checkEmail, confirmEmail, changePassword};
