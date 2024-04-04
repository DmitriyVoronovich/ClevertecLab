import { combineReducers } from 'redux';
import { createReduxHistoryContext } from 'redux-first-history';
import { configureStore } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';

import { appSlice } from '../app/model/appSlice.ts';
import { authSlice } from '../features/auth/model/auth-slice.ts';
import { calendarSlice } from '../features/calendar/model/calendar-slice.ts';
import { feedbackSlice } from '../features/feedback/model/feedback-slice.ts';
import {profileSlice} from '../features/profile/model/profileSlice.ts';
import {settingsSlice} from '../features/settings/model/settings-slice.ts';
import {trainingSlice} from '../features/training/model/training-slice.ts';

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
    history: createBrowserHistory(),
    showHistoryAction: true,
    reduxTravelling: true,
});

export const store = configureStore({
    reducer: combineReducers({
        router: routerReducer,
        auth: authSlice,
        app: appSlice,
        feedback: feedbackSlice,
        calendar: calendarSlice,
        profile: profileSlice,
        settings: settingsSlice,
        training: trainingSlice
    }),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(routerMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const history = createReduxHistory(store);
