import {formateDate} from '../../../../calendar/ui/drawer-modal/utils/formate-date.ts';

export const onDataTransform = (selectedTraining: Array<{date: string | number, load: number}>) => {
    const modifiedLoadByDateArray = selectedTraining.map(item => {
        const date = !isNaN(Number(item.date))
            ? new Date(Number(item.date))
            : new Date(item.date);

        return {
            date: date.toISOString(),
            load: item.load,
            dayOfWeek: date.getDay()
        };
    });

    modifiedLoadByDateArray.sort((a, b) => {
        const dayA = a.dayOfWeek || 7;
        const dayB = b.dayOfWeek || 7;

        return dayA - dayB;
    });

    return modifiedLoadByDateArray.map((item) => {
        const dateObject = new Date(item.date);
        const formatter = new Intl.DateTimeFormat('ru', { weekday: 'long', });

        return {
            date: item.date,
            load: item.load,
            dayOfWeek: formatter.format(dateObject)
        }
    });
};
