import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { createReduxHistoryContext } from "redux-first-history";
import { createBrowserHistory } from "history";
import {authSlice} from "../features/auth/model/authSlice.ts";
import {appSlice} from "../app/model/appSlice.ts";
import {feedbackSlice} from "../features/feedback/model/feedbackSlice.ts";

const {
    createReduxHistory,
    routerMiddleware,
    routerReducer
} = createReduxHistoryContext(
    { history: createBrowserHistory(), showHistoryAction: true, reduxTravelling: true});

export const store = configureStore({
    reducer: combineReducers({
        router: routerReducer,
        auth: authSlice,
        app: appSlice,
        feedback: feedbackSlice

    }),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(routerMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const history = createReduxHistory(store);
