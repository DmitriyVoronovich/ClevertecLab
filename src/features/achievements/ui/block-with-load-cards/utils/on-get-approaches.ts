import {TrainingParams} from '../../../../calendar/model/types/types.ts';

export const onGetApproaches = (filterTraining: TrainingParams[]) => filterTraining.reduce((accum, item) => {
        const approache = item.exercises.reduce((acc, {approaches}) => acc += approaches, 0);

        accum += approache;

        return accum
    }, 0);
