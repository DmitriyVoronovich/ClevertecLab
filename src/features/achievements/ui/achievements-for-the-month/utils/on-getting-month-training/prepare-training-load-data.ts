import {TrainingParams} from '../../../../../calendar/model/types/types.ts';
import {LoadByDate} from '../../types/types.ts';

export const prepareTrainingLoadData = (training: TrainingParams[]) => {
    return training.reduce((accum: LoadByDate, item) => {
        let dateObject;

        if (/^\d+$/.test(item.date)) {
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
};
