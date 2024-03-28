import { RequestFeedbackStatus, RequestStatusType } from '@enums/enums.ts';
import { createSlice,PayloadAction } from '@reduxjs/toolkit';
import { createAppAsyncThunk } from '@utils/createAppAsyncThunk.ts';
import { pushWithFlow } from '@utils/pushWithFlow.ts';

import { appActions } from '../../../app/model/appSlice.ts';
import { feedbackApi } from '../api/feeedback-api.ts';
import { AllReview, Review } from '../api/types/types.ts';

import { compareCreatedAt } from './utils/compare-created-at.ts';

const slice = createSlice({
    name: 'feedback',
    initialState: {
        feedbackStatus: RequestFeedbackStatus.Idle as RequestFeedbackStatus,
        reviews: [] as AllReview[],
        review: {
            message: '',
            rating: 0,
        } as Review,
    },
    reducers: {
        setFeedbackStatus: (
            state,
            action: PayloadAction<{
                feedbackStatus: RequestFeedbackStatus;
            }>,
        ) => {
            state.feedbackStatus = action.payload.feedbackStatus;
        },
        setFeedbackReview: (
            state,
            action: PayloadAction<{
                feedbackReview: Review;
            }>,
        ) => {
            state.review = action.payload.feedbackReview;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getReviews.fulfilled, (state, action) => {
            state.reviews = action.payload.reviews.sort(compareCreatedAt);
        });
    },
});

// thunk
const getReviews = createAppAsyncThunk<{ reviews: AllReview[] }, undefined>(
    'feedback/getReviews',
    async (_, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI;

        dispatch(appActions.setAppStatus({ status: RequestStatusType.Loading }));
        dispatch(pushWithFlow('/feedbacks'));
        try {
            const res = await feedbackApi.getFeedback();

            if (res.status === 200) {
                const reviews = res.data;

                return { reviews };
            }

                return rejectWithValue(null);

        } catch (e: any) {
            if (e.response?.status === 403) {
                localStorage.removeItem('jwtToken');
                sessionStorage.removeItem('jwtToken');
                dispatch(pushWithFlow('/auth'));

                return rejectWithValue(null);
            }
                dispatch(setFeedbackStatus({ feedbackStatus: RequestFeedbackStatus.Failed }));

                return rejectWithValue(null);

        } finally {
            dispatch(appActions.setAppStatus({ status: RequestStatusType.Idle }));
        }
    },
);

const createReview = createAppAsyncThunk<undefined, Review>(
    'feedback/createReview',
    async (arg, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI;

        dispatch(appActions.setAppStatus({ status: RequestStatusType.Loading }));
        try {
            const data = { message: arg.message, rating: arg.rating };
            const res = await feedbackApi.createFeedback(data);

            if (res.status === 200 || res.status === 201) {
                dispatch(setFeedbackStatus({ feedbackStatus: RequestFeedbackStatus.Succeeded }));
            } else {
                return rejectWithValue(null);
            }
        } catch (e) {
            dispatch(setFeedbackStatus({ feedbackStatus: RequestFeedbackStatus.Error }));

            return rejectWithValue(null);
        } finally {
            dispatch(appActions.setAppStatus({ status: RequestStatusType.Idle }));
        }
    },
);

// Создадим slice

export const feedbackSlice = slice.reducer;
export const { setFeedbackStatus, setFeedbackReview } = slice.actions;
export const feedbackThunks = { getReviews, createReview };
