import { configureStore } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';
import { combineReducers } from 'redux';
import { createReduxHistoryContext } from 'redux-first-history';
import { appSlice } from '../app/model/appSlice.ts';
import { authSlice } from '../features/auth/model/authSlice.ts';
import { calendarSlice } from '../features/calendar/model/calendarSlice.ts';
import { feedbackSlice } from '../features/feedback/model/feedbackSlice.ts';

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
    }),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(routerMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const history = createReduxHistory(store);
