import {TrainingParams} from '../../../../../calendar/model/types/types.ts';

import {createPeriodDatesArray} from './create-period-dates-array.ts';
import {formatMonthTrainResults} from './formatMonthTrainResults.ts';
import {prepareTrainingLoadData} from './prepare-training-load-data.ts';

export const onGettingMonthTraining = (training: TrainingParams[], startDate: string, endDate: string) => {
    const loadByDate = prepareTrainingLoadData(training);
    const daysArray = createPeriodDatesArray(startDate, endDate);

    return formatMonthTrainResults(loadByDate, daysArray);
};
