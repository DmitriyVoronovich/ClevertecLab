import {LoadByDate, LoadByDateItem} from '../../types/types.ts';

export const formatMonthTrainResults = (loadByDate: LoadByDate, daysArray: string[]) => {
    const endDateObj = new Date(daysArray[daysArray.length - 1]);

    endDateObj.setUTCHours(0, 0, 0, 0);

    const loadByDateArray: LoadByDateItem[] = Object.entries(loadByDate).map(([date, load]) => {
        const updatedDate = new Date(date);

        if (updatedDate.getUTCDate() === endDateObj.getUTCDate()) {
            updatedDate.setUTCHours(0, 0, 0, 0);
        }

        return {
            date: updatedDate.toISOString(),
            load: Number(load),
        };
    });

    daysArray.forEach(day => {
        const existingDay = loadByDateArray.find(item => item.date === day);

        if (!existingDay) {
            loadByDateArray.push({
                date: day,
                load: 0
            });
        }
    });

    return loadByDateArray.sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();

        return dateA - dateB;
    });
};
