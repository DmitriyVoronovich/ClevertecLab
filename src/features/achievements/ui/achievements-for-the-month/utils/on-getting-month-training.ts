import {TrainingParams} from '../../../../calendar/model/types/types.ts';
import {LoadByDate, LoadByDateItem} from "../types/types.ts";

export const onGettingMonthTraining = (training: TrainingParams[], startDate: string, endDate: string) => {
    const loadByDate = training.reduce((accum: LoadByDate, item) => {
        let dateObject;
        if ( /^\d+$/.test(item.date)) {
            dateObject = new Date(+item.date);
            dateObject.setUTCHours(0, 0, 0, 0);
        } else {
            dateObject = new Date(item.date);
        }
        const date = dateObject.toISOString();

        const load = item.exercises.reduce((sum, exercise) => sum + exercise.approaches * exercise.weight * exercise.replays, 0);

        if (accum[date]) {
            accum[date] += load;
        } else {
            accum[date] = load;
        }

        return accum;
    }, {});

    const endDateObj = new Date(endDate);
    endDateObj.setUTCHours(0, 0, 0, 0);

    const loadByDateArray: LoadByDateItem[] = Object.entries(loadByDate).map(([date, load]) => {
        const updatedDate = new Date(date);

        if (updatedDate.getUTCDate() === endDateObj.getUTCDate()) {
            updatedDate.setUTCHours(0, 0, 0, 0);
        }

        return {
            date: updatedDate.toISOString(),
            load: Number(load),
        };
    });
    const startDateObj = new Date(startDate);

    startDateObj.setUTCHours(0, 0, 0, 0);

    const daysDiff = Math.ceil((endDateObj.valueOf() - startDateObj.valueOf()) / (1000 * 3600 * 24)) + 1;

    const daysArray = Array(daysDiff).fill(null).map((_, index) => {
        const date = new Date(startDate);
        date.setUTCHours(0, 0, 0, 0);
        date.setDate(date.getDate() + index);

        return date.toISOString();
    });

    daysArray.forEach(day => {
        const existingDay = loadByDateArray.find(item => item.date === day);

        if (!existingDay) {
            loadByDateArray.push({
                date: day,
                load: 0
            });
        }
    });

    return loadByDateArray.sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();

        return dateA - dateB;
    });
};
