import {TrainingParams} from '../../../../../calendar/model/types/types.ts';

import {formatResults} from './format-results.ts';
import {preparePopularExercisesData} from './prepare-popular-exercises-data.ts';

export const onFindPopularExercisesInMonth = (filterTraining: TrainingParams[]) => {
    const popularExercisesData = preparePopularExercisesData(filterTraining);

    return formatResults(popularExercisesData);
};
