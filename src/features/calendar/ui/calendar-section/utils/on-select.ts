import { AppDispatch } from '@redux/configure-store.ts';
import { SelectInfo } from 'antd/es/calendar/generateCalendar';
import type { Dayjs } from 'dayjs';

import { setSearchExercises } from '../../../model/calendar-slice.ts';
import { TrainingParams } from '../../../model/types/types.ts';
import { formateDate } from '../../drawer-modal/utils/formate-date.ts';

const selectedRect = (selectedDate: Dayjs, ref: any) => {
    const selectedValue = selectedDate.format('YYYY-MM-DD');

    return ref.current.querySelector(`td[title="${selectedValue}"]`)?.getBoundingClientRect();
};
const onSearchForExercises = (
    array: TrainingParams[],
    searchDate: string,
    dispatch: AppDispatch,
) => {
    const searchExercises = array.filter(
        (item: TrainingParams) => formateDate(item.date) === searchDate,
    );

    dispatch(setSearchExercises({ searchExercises }));
};

export const onSelect =
    (
        setDate: React.Dispatch<React.SetStateAction<string>>,
        setModalStyle: React.Dispatch<
            React.SetStateAction<{
                left: number;
                top: number;
            }>
        >,
        setVisibleTrainingModal: React.Dispatch<React.SetStateAction<boolean>>,
        dispatch: AppDispatch,
    ) =>
    (
        selectedDate: Dayjs,
        selectInfo: SelectInfo,
        ref: React.Ref<HTMLDivElement>,
        training: TrainingParams[],
    ) => {
        const rect = selectedRect(selectedDate, ref);
        const screenWidth = window.innerWidth;

        onSearchForExercises(training, selectedDate.format('DD.MM.YYYY'), dispatch);

        if (selectInfo.source === 'date' && rect) {
            setDate(selectedDate.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'));

            if (screenWidth < rect.x + 264) {
                setModalStyle({ left: rect.right - 264, top: rect.top });
            } else {
                setModalStyle({ left: rect.left, top: rect.top });
            }
            setVisibleTrainingModal(true);
        }
    };
