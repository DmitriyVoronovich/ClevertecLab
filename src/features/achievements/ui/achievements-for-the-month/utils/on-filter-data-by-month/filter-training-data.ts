import {TrainingParams} from '../../../../../calendar/model/types/types.ts';

export const filterTrainingData = (sortedData: TrainingParams[], start: Date, end: Date) => sortedData.filter(item => {
    const itemDate = /^\d+$/.test(item.date) ? new Date(+item.date) : new Date(item.date);

    itemDate.setUTCHours(0, 0, 0, 0);

    return itemDate >= start && itemDate <= end;
});
