import { useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { useIsMobile } from '@utils/useIsMobile.ts';
import { Calendar, CalendarProps } from 'antd';
import { SelectInfo } from 'antd/es/calendar/generateCalendar';
import locale from 'antd/es/date-picker/locale/ru_RU';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

import { TrainingModal } from '../training-modal';

import { onSelect } from './utils/on-select.ts';
import { DateCellRender } from './date-cell-render';

import './calendar-section.css';

import 'dayjs/locale/ru';

dayjs.locale('ru');

export const CalendarSection = () => {
    const dispatch = useAppDispatch();
    const training = useAppSelector((state) => state.calendar.training);
    const [visibleTrainingModal, setVisibleTrainingModal] = useState(false);
    const [modalStyle, setModalStyle] = useState({ left: 0, top: 0 });
    const [date, setDate] = useState('');
    const ref = useRef<HTMLDivElement>(document.createElement('div'));
    const isMobile = useIsMobile();

    const onCloseTrainingModal = () => setVisibleTrainingModal(false);

    const onSelected = onSelect(setDate, setModalStyle, setVisibleTrainingModal, dispatch);

    const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
        if (info.type === 'date') return <DateCellRender value={current} />;

        return info.originNode;
    };

    return (
        <div ref={ref} className={isMobile ? 'calendar' : 'full_calendar'}>
            <Calendar
                cellRender={cellRender}
                locale={locale}
                onSelect={(selectedDate: Dayjs, selectInfo: SelectInfo) =>
                    onSelected(selectedDate, selectInfo, ref, training)
                }
                fullscreen={!isMobile}
            />
            {visibleTrainingModal && (
                <TrainingModal
                    modalStyle={modalStyle}
                    onCloseTrainingModal={onCloseTrainingModal}
                    date={date}
                />
            )}
        </div>
    );
};
