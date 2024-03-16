import type {Dayjs} from 'dayjs';
import dayjs from 'dayjs'
import {Calendar, CalendarProps} from 'antd';
import './calendarSection.css';
import locale from "antd/es/date-picker/locale/ru_RU";
import 'dayjs/locale/ru'
import {TrainingModal} from "../trainingModal/TrainingModal.tsx";
import {useRef, useState} from "react";
import {SelectInfo} from "antd/es/calendar/generateCalendar";
import {useAppDispatch, useAppSelector} from "@hooks/typed-react-redux-hooks.ts";
import Badge from "antd/lib/badge";
import {formateDate} from "../drawerModal/utils/formateDate.ts";
import {setSearchExercises, TrainingParams} from "../../model/calendarSlice.ts";

dayjs.locale('ru')

const getMonthData = (value: Dayjs) => {
    if (value.month() === 8) {
        return 1394;
    }
};

export const CalendarSection = () => {
    const dispatch = useAppDispatch();
    const training = useAppSelector(state => state.calendar.training)
    const trainingList = useAppSelector(state => state.calendar.trainingList)
    const [visible, setVisible] = useState(false);
    const [modalStyle, setModalStyle] = useState({left: 0, top: 0});
    const [date, setDate] = useState('');

    const ref = useRef<HTMLDivElement>(document.createElement("div"));

    const onClose = () => {
        setVisible(false)
    }

    const monthCellRender = (value: Dayjs) => {
        const num = getMonthData(value);
        return num ? (
            <div className="notes-month">

            </div>
        ) : null;
    };

    const selectedRect = (selectedDate: Dayjs) => {
        const selectedValue = selectedDate.format('YYYY-MM-DD');
        return ref.current.querySelector(`td[title="${selectedValue}"]`)?.getBoundingClientRect();
    };

    const onSearchForExercises = (array: any, searchDate: string) => {
        const searchExercises = array.filter((item: any) => formateDate(item.date) === searchDate);
        dispatch(setSearchExercises({searchExercises}))
    };

    const screenWidth = window.innerWidth;
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
            setVisible(true);
        }
    }
    const getListData = (value: Dayjs) => {
        const listData: TrainingParams[] = [];
        training.forEach((item) => {
            if (value.format('DD.MM.YYYY') === formateDate(item.date)) {
                listData.push(item);
            }
        });
        return listData;
    };

    const dateCellRender = (value: Dayjs) => {
        const listData = getListData(value);

        return (
                <ul className="calendar_list">
                    {listData.map((item) => {
                        const color = trainingList.find(element => element.name === item.name)
                        return (<li key={item._id} className={'calendar_list_item'}>
                            <Badge color={color?.color} text={item.name} style={{
                                fontWeight: '400',
                                fontSize: '12px',
                                lineHeight: '130%'
                            }}/>
                        </li>)
                    })}
                </ul>
                );
            };

    const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
        if (info.type === 'date') return dateCellRender(current);
        if (info.type === 'month') return monthCellRender(current);
        return info.originNode;
    };

    return (
        <div ref={ref} className={screenWidth < 361 ? "calendar" : 'full_calendar'}>
            {screenWidth < 361
                ? <Calendar cellRender={cellRender} locale={locale} onSelect={onSelected}
                            fullscreen={false}/>
                : <Calendar cellRender={cellRender} locale={locale} onSelect={onSelected}/>}
            {visible && <TrainingModal modalStyle={modalStyle} onClose={onClose}
                                       date={date}/>}
        </div>

    );
};
