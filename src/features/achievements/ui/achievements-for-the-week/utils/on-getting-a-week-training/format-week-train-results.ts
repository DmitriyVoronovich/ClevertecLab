import {LoadByDate, LoadByDateItem} from '../../../achievements-for-the-month/types/types.ts';

export const formatWeekTrainResults = (loadByDate: LoadByDate, sevenDaysArray: string[]) => {
    const loadByDateArray: LoadByDateItem[] = Object.entries(loadByDate).map(
        ([date, load]) => ({date, load: Number(load)})
    );

    sevenDaysArray.forEach(day => {
        const existingDay = loadByDateArray.find(({date}) => date === day);

        if (!existingDay) {
            loadByDateArray.push({
                date: day,
                load: 0,
            });
        }
    });

    return loadByDateArray.sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();

        return dateA - dateB;
    });
};
