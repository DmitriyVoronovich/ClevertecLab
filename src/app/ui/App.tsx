import {useEffect} from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "@hooks/typed-react-redux-hooks.ts";
import {authActions} from "../../features/auth/model/authSlice.ts";
import {FeedbacksPage} from "../../features/feedback/ui";
import {HomePage} from "@pages/home-page/HomePage.tsx";
import {
    ChangePassword,
    CodeForm,
    ErrorChangePassword,
    ErrorCheck,
    ErrorCheckEmail,
    ErrorLogin,
    ErrorRegistration,
    LoginPage,
    Success, SuccessChangePassword,Error
} from "../../features/auth/ui";
import {Loader} from "../../common/components";
import {authGoogle} from "./utils/authGoogle.ts";
import {MainPage} from "@pages/main-page/MainPage.tsx";
import {getToken} from "../../common/utils/getToken.ts";
import {CalendarPage} from "../../features/calendar/ui/calendarPage/CalendarPage.tsx";
import {LocationState} from "../types/types.ts";
import s from './app.module.css'


function App() {
    const dispatch = useAppDispatch();
    const status = useAppSelector(state => state.app.status);
    const locationState = useAppSelector((state) => state.router?.location?.state as LocationState);
    const authState = useAppSelector(state => state.auth);

    useEffect(() => {
        window.onbeforeunload = function () {
            sessionStorage.clear();
        }
    }, []);
    authGoogle();

    useEffect(() => {
        if (!authState.isLoggedIn) {
            const token = getToken();
            if (token) {
                dispatch(authActions.setAuthStatus({isLoggedIn: true}));
            }
        }
    });


    return (
        <>
            <Routes>
                <Route path={'/'}
                       element={<Navigate to={authState.isLoggedIn ? '/main' : '/auth'}/>}/>
                <Route path={'/'} element={<MainPage/>}>
                    <Route path='main' element={<HomePage/>}/>
                    <Route path='feedbacks' element={<FeedbacksPage/>}/>
                    <Route path='calendar' element={<CalendarPage/>}/>
                </Route>
                <Route path='/auth/*' element={<LoginPage/>}>
                    <Route path='registration' element={<LoginPage/>}/>
                </Route>
                {locationState?.flowRedirect
                    ? <> <Route path={'/result'}>
                        <Route path='error-user-exist' element={<ErrorRegistration/>}/>
                        <Route path='error-login' element={<ErrorLogin/>}/>
                        <Route path='success' element={<Success/>}/>
                        <Route path='error' element={<Error/>}/>
                        <Route path='error-check-email-no-exist' element={<ErrorCheckEmail/>}/>
                        <Route path='error-check-email' element={<ErrorCheck/>}/>
                        <Route path='error-change-password' element={<ErrorChangePassword/>}/>
                        <Route path='success-change-password' element={<SuccessChangePassword/>}/>
                    </Route>
                        <Route path='/auth/confirm-email' element={<CodeForm/>}/>
                        <Route path='/auth/change-password' element={<ChangePassword/>}/>
                    </>
                    : <Route path={'/*'} element={<Navigate to={'/auth'}/>}/>}

            </Routes>
            {status === "loading" &&
                <div className={s.loading}>
                    <Loader/>
                </div>
            }
        </>

    )
}

export default App;
