import {formatTrainingResults} from './format-training-results.ts';
import {sortTrainingDataByWeekDay} from './sort-training-data-by-week-day.ts';
import {transformTrainingData} from './transform-training-data.ts';

export const onDataTransform = (selectedTraining: Array<{date: string | number, load: number}>) => {
    const transformedData = transformTrainingData(selectedTraining);
    const sortedData = sortTrainingDataByWeekDay(transformedData);

    return formatTrainingResults(sortedData);
};
