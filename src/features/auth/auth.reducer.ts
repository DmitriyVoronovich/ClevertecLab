import {createSlice} from "@reduxjs/toolkit";
import {createAppAsyncThunk} from "../../common/utils/create-app-async-thunk.ts";
import {authApi, CodeParamsType, LoginParamsType, PasswordParamsType} from "./auth.api.ts";
import {push} from "redux-first-history";
import {FormType} from "@pages/login/login-page/login-form/LoginForm.tsx";
import {appActions} from "../../app/app.reducer.ts";
export const pushWithFlow = (to: string) => push(to, {flowRedirect: true})

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
        dispatch(appActions.setAppStatus({ status: "loading" }));
        try {
            const res = await authApi.registration(arg);
            if (res.status === 201) {
                sessionStorage.removeItem('data-registration');
                dispatch(pushWithFlow('/result/success'));
                return {isRegistered: true};
            } else {
                return rejectWithValue(null);
            }
        } catch (e: any) {
            if (e.response.status === 409) {
                dispatch(pushWithFlow('/result/error-user-exist'));
                return rejectWithValue(null);
            } else {
                dispatch(pushWithFlow('/result/error'));
                return rejectWithValue(null);
            }
        } finally {
            dispatch(appActions.setAppStatus({ status: "idle" }));
        }
    })

const login = createAppAsyncThunk<{ isLoggedIn: boolean }, FormType>(
    `${slice.name}/login`,
    async (arg, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI;
        dispatch(appActions.setAppStatus({ status: "loading" }));
        try {
            const data = {email: arg.email, password: arg.password};
            const res = await authApi.login(data);
            if (res.status === 200) {
                sessionStorage.setItem('isLoggedIn', JSON.stringify(true));
                if (arg.remember) {
                    localStorage.setItem('jwtToken', JSON.stringify(res.data.accessToken));
                }
                dispatch(pushWithFlow('/main'));
                return {isLoggedIn: true};
            } else {
                return rejectWithValue(null);
            }
        } catch (e) {
            dispatch(pushWithFlow('/result/error-login'));
            return rejectWithValue(null);
        } finally {
            dispatch(appActions.setAppStatus({ status: "idle" }));
        }
    })

const checkEmail = createAppAsyncThunk<{ email: string }, string>(
    `${slice.name}/checkEmail`,
    async (arg, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI;
        dispatch(appActions.setAppStatus({ status: "loading" }));
        try {
            const res = await authApi.checkEmail({email: arg});
            if (res.status === 200) {
                dispatch(pushWithFlow('/auth/confirm-email'));
                sessionStorage.removeItem('email');
                return {email: res.data.email};
            } else {
                return rejectWithValue(null);
            }
        } catch (e: any) {
            if (e.response.data.statusCode === 404 && e.response.data.message === 'Email не найден') {
                dispatch(pushWithFlow('/result/error-check-email-no-exist'));
                console.log('de')
                return rejectWithValue(null);
            } else {
                dispatch(pushWithFlow('/result/error-check-email'));
                return rejectWithValue(null);
            }
        } finally {
            dispatch(appActions.setAppStatus({ status: "idle" }));
        }
    })

const confirmEmail = createAppAsyncThunk<undefined, CodeParamsType>(
    `${slice.name}/confirmEmail`,
    async (arg, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI;
        dispatch(appActions.setAppStatus({ status: "loading" }));
        try {
            const res = await authApi.confirmEmail(arg);
            if (res.status === 200) {
                dispatch(pushWithFlow('/auth/change-password'), {flowRedirect: true});
            } else {
                return rejectWithValue(null);
            }
        } catch (e: any) {
            dispatch(pushWithFlow('/auth/confirm-email'));
            return rejectWithValue(null);
        } finally {
            dispatch(appActions.setAppStatus({ status: "idle" }));
        }
    })

const changePassword = createAppAsyncThunk<undefined, PasswordParamsType>(
    `${slice.name}/changePassword`,
    async (arg, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI;
        dispatch(appActions.setAppStatus({ status: "loading" }));
        try {
            const res = await authApi.changePassword(arg);
            if (res.status === 201) {
                sessionStorage.removeItem('changePassword');
                dispatch(pushWithFlow('/result/success-change-password'));
            } else {
                return rejectWithValue(null);
            }
        } catch (e: any) {
            dispatch(pushWithFlow('/result/error-change-password'));
            return rejectWithValue(null);
        } finally {
            dispatch(appActions.setAppStatus({ status: "idle" }));
        }
    })
export const authReducer = slice.reducer;
export const authThunks = {registration, login, checkEmail, confirmEmail, changePassword};
