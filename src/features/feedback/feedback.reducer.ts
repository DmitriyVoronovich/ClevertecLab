import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createAppAsyncThunk} from "../../common/utils/create-app-async-thunk.ts";
import {appActions} from "../../app/app.reducer.ts";
import {AllReview, feedbackApi, Review} from "./feeedback.api.ts";
import {pushWithFlow} from "../auth/auth.reducer.ts";

export type RequestFeedbackStatus = "idle" | "succeeded" | "failed" | "error";

const compareCreatedAt = (a: { createdAt: string }, b: { createdAt: string }) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();

    return dateB - dateA;
};

const feedbackActions = createSlice({
    name: "feedback",
    initialState: {
        feedbackStatus: "idle" as RequestFeedbackStatus,
        reviews: [] as AllReview[],
        review: {
            message: '',
            rating: 0
        } as Review,
    },
    reducers: {
        setFeedbackStatus: (state, action: PayloadAction<{
            feedbackStatus: RequestFeedbackStatus }>) => {
            state.feedbackStatus = action.payload.feedbackStatus;
        },
        setFeedbackReview: (state, action: PayloadAction<{
            feedbackReview: Review }>) => {
            state.review = action.payload.feedbackReview;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getReviews.fulfilled, (state, action) => {
                state.reviews = action.payload.reviews.sort(compareCreatedAt);
            })
    }});

// thunk
const getReviews = createAppAsyncThunk<{ reviews: AllReview[] }, undefined>(
    "feedback/getReviews",
    async (_, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI;
        dispatch(appActions.setAppStatus({status: "loading"}));
        dispatch(pushWithFlow("/feedbacks"));
        try {
            const res = await feedbackApi.getFeedback();
            if (res.status === 200) {
                const reviews = res.data;
                return {reviews};
            } else {
                return rejectWithValue(null);
            }
        } catch (e: any) {
            if (e.response?.status === 403) {
                localStorage.removeItem("jwtToken");
                sessionStorage.removeItem("jwtToken");
                dispatch(pushWithFlow("/auth"));
                return rejectWithValue(null);
            } else {
                dispatch(setFeedbackStatus({feedbackStatus: "failed"}));
                return rejectWithValue(null);
            }
        } finally {
            dispatch(appActions.setAppStatus({status: "idle"}));
        }
    }
);

const createReview = createAppAsyncThunk<undefined, Review>(
    `feedback/createReview`,
    async (arg, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI;
        dispatch(appActions.setAppStatus({status: "loading"}));
        try {
            const data = {message: arg.message, rating: arg.rating};
            const res = await feedbackApi.createFeedback(data);
            if (res.status === 200 || res.status === 201) {
                dispatch(setFeedbackStatus({feedbackStatus: "succeeded"}));
            } else {
                return rejectWithValue(null);
            }
        } catch (e) {
            dispatch(setFeedbackStatus({feedbackStatus: "error"}));
            return rejectWithValue(null);
        } finally{
            dispatch(appActions.setAppStatus({status: "idle"}));
        }
    })

// Создадим slice
const feedbackSlice = feedbackActions;

export const feedbackReducer = feedbackSlice.reducer;
export const {setFeedbackStatus, setFeedbackReview} = feedbackSlice.actions;
export const feedbackThunks = {getReviews, createReview};
