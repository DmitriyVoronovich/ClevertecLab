import {TrainingParams} from '../../../../calendar/model/types/types.ts';

export const onFilterLastFourWeeks = (training: TrainingParams[]) => {

    const sortedData = [...training].sort((a, b) => {
        const dateA = /^\d+$/.test(a.date) ? new Date(+a.date) : new Date(a.date);
        const dateB = /^\d+$/.test(b.date) ? new Date(+b.date) : new Date(b.date);

        return dateB.getTime() - dateA.getTime();
    });

    const fourWeeksAgo = new Date();

    fourWeeksAgo.setDate(fourWeeksAgo.getDate() - 27);

    while (fourWeeksAgo.getDay() !== 1) {
        fourWeeksAgo.setDate(fourWeeksAgo.getDate() + 1);
    }

    const nextSunday = new Date();

    while (nextSunday.getDay() !== 0) {
        nextSunday.setDate(nextSunday.getDate() + 1);
    }

    const filteredData = sortedData.filter(item => {
        const itemDate = /^\d+$/.test(item.date) ? new Date(+item.date) : new Date(item.date);

        itemDate.setUTCHours(0, 0, 0, 0);

        return itemDate >= fourWeeksAgo && itemDate <= nextSunday;
    });

    return {
        filteredData,
        start: `${fourWeeksAgo}`,
        end: `${nextSunday}`,
    };
}
