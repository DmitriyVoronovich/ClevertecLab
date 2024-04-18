import {TrainingParams} from '../../../../calendar/model/types/types.ts';
import {LoadByDate, LoadByDateItem} from "../../achievements-for-the-month/types/types.ts";

export const onGettingWeekTraining = (training: TrainingParams[]) => {

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

    const loadByDateArray: LoadByDateItem[] = Object.entries(loadByDate).map(([date, load]) => ({date, load: Number(load)}));

    const lastSevenDays = Array(7).fill(null).map((_, index) => {
        const date = new Date();
        date.setUTCHours(0, 0, 0, 0)
        date.setDate(date.getDate() - index);

        return date.toISOString();
    });

    lastSevenDays.forEach(day => {
        const existingDay = loadByDateArray.find(({ date }) => date === day);

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
