import {
    createSevenDaysDatesArray
} from '../../../achievements-for-the-week/utils/on-getting-a-week-training/create-seven-days-dates-array.ts';

import {appendTrainingList} from './append-training-list.ts';
import {processTrainingResults} from './process-training-results.ts';

export const onGettingPopularTrain = (trainList: Array<{ date: string; mostPopularExercise: string; count: number }>) => {
    const sevenDaysArray = createSevenDaysDatesArray();

    appendTrainingList(trainList, sevenDaysArray);

    return processTrainingResults(trainList);
};
