import {TrainingParams} from '../../../../../calendar/model/types/types.ts';

import {determinePeriodDates} from './determine-period-dates.ts';
import {filterTrainingData} from './filter-training-data.ts';
import {sortTrainingData} from './sort-training-data.ts';

export const onFilterLastFourWeeks = (training: TrainingParams[]) => {
    const sortedData = sortTrainingData(training);
    const { start, end } = determinePeriodDates();

    const filteredData = filterTrainingData(sortedData, start, end);

    return {
        filteredData,
        start: `${start}`,
        end: `${end}`
    };
};
