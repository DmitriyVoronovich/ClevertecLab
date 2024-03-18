import React from 'react';
import './main-page.css';
import fon from "../../accets/main_page_light.png";
import {Sidebar} from "@components/sidebar/Sidebar.tsx";
import {FeedbacksPage, TokenRequestError} from "../../features/feedback/ui";
import {Route, Routes} from "react-router-dom";
import {HomePage} from "@pages/home-page/HomePage.tsx";
import {CalendarPage} from "../../features/calendar/ui/calendarPage/CalendarPage.tsx";
import {useAppDispatch, useAppSelector} from "@hooks/typed-react-redux-hooks.ts";
import {setTrainingStatus} from "../../features/calendar/model/calendarSlice.ts";

export const MainPage: React.FC = () => {
    const [open, setOpen] = React.useState(false);
    const token = localStorage.getItem('jwtToken');
    const dispatch = useAppDispatch();
    const trainingStatus = useAppSelector(state => state.calendar.trainingStatus);
    let tog
    if (token !== null) {
        tog = JSON.parse(token)
    }

    let isLoggedIn

    const data = sessionStorage.getItem('isLoggedIn');
    if (data !== null) {
        isLoggedIn = JSON.parse(data)
    }

    if (!tog && !isLoggedIn) {
        window.location.href = '/auth';
    }

    const handleOpen = () => {
        setOpen(!open);
    };

    const changeStatus = () => {
        dispatch(setTrainingStatus({trainingStatus: 'idle'}));
    }

    return (
        <div className={'main_page_container'} style={{backgroundImage: `url(${fon})`}}>
            <Sidebar handleOpen={handleOpen} open={open}/>
            <div className={'a'}>
                <Routes>
                    <Route path={'main'} element={<HomePage/>}/>
                    <Route path={'feedbacks'} element={<FeedbacksPage/>}/>
                    <Route path={'calendar'} element={<CalendarPage/>}/>
                </Routes>
            </div>
            <TokenRequestError callback={changeStatus} status={trainingStatus}/>
        </div>
    );
};
