import {TrainingParams} from '../../../../calendar/model/types/types.ts';

export const onGetNumberOfRepetitions = (filterTraining: TrainingParams[]) => {
    return filterTraining.reduce((acm, item) => {
        const repetition = item.exercises.reduce((acc, {replays}) => acc += replays, 0);

        acm += repetition;

        return acm
    }, 0);
};
