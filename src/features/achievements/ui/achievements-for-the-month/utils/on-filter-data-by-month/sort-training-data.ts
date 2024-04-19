import {TrainingParams} from '../../../../../calendar/model/types/types.ts';

export const sortTrainingData = (training: TrainingParams[]) => [...training].sort((a, b) => {
    const dateA = /^\d+$/.test(a.date) ? new Date(+a.date) : new Date(a.date);
    const dateB = /^\d+$/.test(b.date) ? new Date(+b.date) : new Date(b.date);

    return dateB.getTime() - dateA.getTime();
});
