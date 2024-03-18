import type {Dayjs} from 'dayjs';
import dayjs from 'dayjs';
import {Calendar, CalendarProps} from 'antd';
import locale from "antd/es/date-picker/locale/ru_RU";
import 'dayjs/locale/ru';
import {TrainingModal} from "../trainingModal/TrainingModal.tsx";
import {useRef, useState} from "react";
import {SelectInfo} from "antd/es/calendar/generateCalendar";
import {useAppDispatch, useAppSelector} from "@hooks/typed-react-redux-hooks.ts";
import {formateDate} from "../drawerModal/utils/formateDate.ts";
import {setSearchExercises} from "../../model/calendarSlice.ts";
import {TrainingParams} from "../../model/types/types.ts";
import {DateCellRender} from "./dateCellRender/dateCellRender.tsx";
import './calendarSection.css';

dayjs.locale('ru');

export const CalendarSection = () => {
    const dispatch = useAppDispatch();
    const training = useAppSelector(state => state.calendar.training);
    const [visibleTrainingModal, setVisibleTrainingModal] = useState(false);
    const [modalStyle, setModalStyle] = useState({left: 0, top: 0});
    const [date, setDate] = useState('');

    const ref = useRef<HTMLDivElement>(document.createElement("div"));

    const screenWidth = window.innerWidth;

    const onCloseTrainingModal = () => setVisibleTrainingModal(false);

    const selectedRect = (selectedDate: Dayjs) => {
        const selectedValue = selectedDate.format('YYYY-MM-DD');
        return ref.current.querySelector(`td[title="${selectedValue}"]`)?.getBoundingClientRect();
    };

    const onSearchForExercises = (array: TrainingParams[], searchDate: string) => {
        const searchExercises = array.filter((item: TrainingParams) => formateDate(item.date) === searchDate);
        dispatch(setSearchExercises({searchExercises}));
    };

    //Реф стоит ли выносить если большое число параметров
    const onSelected = (selectedDate: Dayjs, selectInfo: SelectInfo) => {
        const rect = selectedRect(selectedDate);
        onSearchForExercises(training, selectedDate.format('DD.MM.YYYY'))

        if (selectInfo.source === "date" && rect) {
            setDate(selectedDate.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'))

            if (screenWidth < rect.x + 264) {
                setModalStyle({left: rect.right - 264, top: rect.top});
            } else {
                setModalStyle({left: rect.left, top: rect.top});
            }
            setVisibleTrainingModal(true);
        }
    };

    const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
        if (info.type === 'date') return <DateCellRender value={current}/>;
        return info.originNode;
    };

    return (
        <div ref={ref} className={screenWidth < 361 ? "calendar" : 'full_calendar'}>
            {screenWidth < 361
                ? <Calendar cellRender={cellRender} locale={locale} onSelect={onSelected}
                            fullscreen={false}/>
                : <Calendar cellRender={cellRender} locale={locale} onSelect={onSelected}/>}
            {visibleTrainingModal && <TrainingModal modalStyle={modalStyle} onCloseTrainingModal={onCloseTrainingModal}
                                       date={date}/>}
        </div>

    );
};
