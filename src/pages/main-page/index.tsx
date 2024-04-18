import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { RequestCalendarStatus } from '@enums/enums.ts';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { HomePage } from '@pages/home-page';

import fon from '../../assets/main_page_light.png';
import { Sidebar } from '../../common/components';
import {NotFoundPage} from '../../features/404/ui';
import { setTrainingStatus } from '../../features/calendar/model/calendar-slice.ts';
import { CalendarPage } from '../../features/calendar/ui';
import { FeedbacksPage, TokenRequestError } from '../../features/feedback/ui';
import {ProfilePage} from '../../features/profile/ui/profile-page';
import {SettingsPage} from '../../features/settings/ui/settings-page';

import './main-page.css';
import {TrainingPage} from "../../features/training/ui/training-page";
import {pushWithFlow} from "@utils/push-with-flow.ts";
import {AchievementsPage} from "../../features/achievements/ui/achievements-page";

export const MainPage = () => {
    const dispatch = useAppDispatch();
    const [open, setOpen] = React.useState(false);

    const token = localStorage.getItem('jwtToken');
    const trainingStatus = useAppSelector((state) => state.calendar.trainingStatus);
    let tog;

    if (token !== null) {
        tog = JSON.parse(token);
    }

    let isLoggedIn;

    const data = sessionStorage.getItem('isLoggedIn');

    if (data !== null) {
        isLoggedIn = JSON.parse(data);
    }

    if (!tog && !isLoggedIn) {
        dispatch(pushWithFlow('/auth'))
    }

    const handleOpen = () => setOpen(!open);

    const changeStatus = () =>
        dispatch(setTrainingStatus({ trainingStatus: RequestCalendarStatus.Idle }));

    return (
        <div className="main_page_container" style={{ backgroundImage: `url(${fon})` }}>
            <Sidebar handleOpen={handleOpen} open={open} />
            <div className="a">
                <Routes>
                    <Route path="main" element={<HomePage />} />
                    <Route path="feedbacks" element={<FeedbacksPage />} />
                    <Route path="calendar" element={<CalendarPage />} />
                    <Route path="profile" element={<ProfilePage />} />
                    <Route path="settings" element={<SettingsPage />} />
                    <Route path="training" element={<TrainingPage />} />
                    <Route path="achievements" element={<AchievementsPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </div>
            <TokenRequestError callback={changeStatus} status={trainingStatus} />
        </div>
    );
};
