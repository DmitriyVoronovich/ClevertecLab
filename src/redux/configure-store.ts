import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { createReduxHistoryContext } from "redux-first-history";
import { createBrowserHistory } from "history";
import {authReducer} from "../features/auth/auth.reducer.ts";
import {appReducer} from "../app/app.reducer.ts";

const {
    createReduxHistory,
    routerMiddleware,
    routerReducer
} = createReduxHistoryContext(
    { history: createBrowserHistory(), showHistoryAction: true, reduxTravelling: true});

export const store = configureStore({
    reducer: combineReducers({
        router: routerReducer,
        auth: authReducer,
        app: appReducer

    }),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(routerMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const history = createReduxHistory(store);
