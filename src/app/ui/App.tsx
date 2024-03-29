import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { HomePage } from '@pages/home-page';
import { MainPage } from '@pages/main-page';

import { getToken } from '@utils/getToken.ts';
import { Loader } from '@components/loader';
import { authActions } from '../../features/auth/model/auth-slice.ts';
import {
    ChangePassword,
    CodeForm,
    Error,
    ErrorChangePassword,
    ErrorCheck,
    ErrorCheckEmail,
    ErrorLogin,
    ErrorRegistration,
    LoginPage,
    Success,
    SuccessChangePassword,
} from '../../features/auth/ui';
import { CalendarPage } from '../../features/calendar/ui';
import { FeedbacksPage } from '../../features/feedback/ui';
import { LocationState } from '../types/types.ts';

import { authGoogle } from './utils/authGoogle.ts';

import s from './app.module.css';
import {ProfilePage} from '../../features/profile/ui/profile-page';
import {SettingsPage} from '../../features/settings/ui/settings-page';
import {profileThunks} from '../../features/profile/model/profileSlice.ts';
import {NotFoundPage} from '../../features/404/ui';

function App() {
    const dispatch = useAppDispatch();
    const status = useAppSelector((state) => state.app.status);
    const locationState = useAppSelector((state) => state.router?.location?.state as LocationState);
    const authState = useAppSelector((state) => state.auth);

    useEffect(() => {
        window.onbeforeunload = () => {
            sessionStorage.clear();
        };
    }, []);

    authGoogle();

    useEffect(() => {
        dispatch(profileThunks.me())
        if (!authState.isLoggedIn) {
            const token = getToken();

            if (token) {
                dispatch(authActions.setAuthStatus({ isLoggedIn: true }));
            }
        }
    });

    return (
        <>
            <Routes>
                <Route
                    path="/"
                    element={<Navigate to={authState.isLoggedIn ? '/main' : '/auth'} />}
                />
                <Route path="/" element={<MainPage />}>
                    <Route path='main' element={<HomePage />} />
                    <Route path='feedbacks' element={<FeedbacksPage />} />
                    <Route path='calendar' element={<CalendarPage />} />
                    <Route path='profile' element={<ProfilePage />} />
                    <Route path="settings" element={<SettingsPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Route>
                <Route path='/auth/*' element={<LoginPage />}>
                    <Route path='registration' element={<LoginPage />} />
                </Route>
                {locationState?.flowRedirect ? (
                    <>
                        {' '}
                        <Route path="/result">
                            <Route path='error-user-exist' element={<ErrorRegistration />} />
                            <Route path='error-login' element={<ErrorLogin />} />
                            <Route path='success' element={<Success />} />
                            <Route path='error' element={<Error />} />
                            <Route
                                path='error-check-email-no-exist'
                                element={<ErrorCheckEmail />}
                            />
                            <Route path='error-check-email' element={<ErrorCheck />} />
                            <Route path='error-change-password' element={<ErrorChangePassword />} />
                            <Route
                                path='success-change-password'
                                element={<SuccessChangePassword />}
                            />
                        </Route>
                        <Route path='/auth/confirm-email' element={<CodeForm />} />
                        <Route path='/auth/change-password' element={<ChangePassword />} />
                    </>
                ) : (
                    <Route path={'/*'} element={<Navigate to="/auth" />} />
                )}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
            {status === 'loading' && (
                <div className={s.loading}>
                    <Loader />
                </div>
            )}
        </>
    );
}

export default App;
