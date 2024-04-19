import {TrainingParams} from '../../../../../calendar/model/types/types.ts';
import {
    prepareTrainingLoadData
} from '../../../achievements-for-the-month/utils/on-getting-month-training/prepare-training-load-data.ts';

import {createSevenDaysDatesArray} from './create-seven-days-dates-array.ts';
import {formatWeekTrainResults} from './format-week-train-results.ts';

export const onGettingWeekTraining = (training: TrainingParams[]) => {
    const loadByDate = prepareTrainingLoadData(training);
    const sevenDaysArray = createSevenDaysDatesArray();

    return formatWeekTrainResults(loadByDate, sevenDaysArray);
};
