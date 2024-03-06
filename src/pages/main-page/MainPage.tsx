import React from 'react';
import './main-page.css';
import fon from "../../accets/main_page_light.png";
import {Sidebar} from "@components/sidebar/Sidebar.tsx";
import {FeedbacksPage} from "../../features/feedback/ui/feedbacksPage/FeedbacksPage.tsx";
import {Route, Routes} from "react-router-dom";
import {HomePage} from "@pages/home-page/HomePage.tsx";

export const MainPage: React.FC = () => {
    const [open, setOpen] = React.useState(true);
    const token = localStorage.getItem('jwtToken');
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

    return (
        <div className={'main_page_container'} style={{backgroundImage: `url(${fon})`}}>
            <Sidebar handleOpen={handleOpen} open={open}/>
            <div className={'a'}>
                <Routes>
                    <Route path={'main'} element={<HomePage/>}/>
                    <Route path={'feedbacks'} element={<FeedbacksPage/>}/>
                </Routes>
            </div>
        </div>
    );
};
