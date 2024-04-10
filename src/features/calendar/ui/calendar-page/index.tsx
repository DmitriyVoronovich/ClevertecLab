import {RequestCalendarStatus} from '@enums/enums.ts';
import {useAppDispatch, useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import set from '@image/image/set.svg';
import {goBackToMain} from '@utils/go-back-to-main.ts';

import {calendarThunks, setTrainingStatus} from '../../model/calendar-slice.ts';
import { CalendarSection } from '../calendar-section';
import { ErrorModal } from '../error-modal';

import s from './calendar-page.module.css';

export const CalendarPage = () => {
    const dispatch = useAppDispatch()
    const trainingStatus = useAppSelector((state) => state.calendar.trainingStatus);

    const onRefreshTrainingList = () => dispatch(calendarThunks.trainingList(() => {}));

    const onRefreshTrainingListBack = () => dispatch(setTrainingStatus({ trainingStatus: RequestCalendarStatus.Idle }));

    const onBackToMain = goBackToMain(dispatch);

    return (
        <div className={s.container}>
            <div className={s.header_container}>
                <div>
                    <span onClick={onBackToMain} className='s.go_main'>Главная</span> / <span
                    className={s.header_menu_item}>Календарь</span>
                </div>
                <div className={s.header_content_wrapper}>
                <img src={set} className={s.header_content_svg} alt="Настройки"/>
                    <span className={s.header_content_item}>Настройки</span>
                </div>
            </div>
            <CalendarSection/>
            {trainingStatus === RequestCalendarStatus.Error && <ErrorModal callback={onRefreshTrainingList} back={onRefreshTrainingListBack}/>}
        </div>
    );
}
