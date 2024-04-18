import {TrainingParams} from '../../../../calendar/model/types/types.ts';

export const onFilterLastFourWeeks = (training) => {
    // Отсортировать массив по дате
    const sortedData = [...training].sort((a, b) => {
        const dateA = /^\d+$/.test(a.date) ? new Date(+a.date) : new Date(a.date);
        const dateB = /^\d+$/.test(b.date) ? new Date(+b.date) : new Date(b.date);

        return dateB.getTime() - dateA.getTime();
    });

    // Определить дату 28 дней назад
    const fourWeeksAgo = new Date();

    fourWeeksAgo.setDate(fourWeeksAgo.getDate() - 27);

    // Найти ближайший понедельник
    while (fourWeeksAgo.getDay() !== 1) {
        fourWeeksAgo.setDate(fourWeeksAgo.getDate() + 1);
    }

    // Найти ближайшее воскресенье
    const nextSunday = new Date();

    while (nextSunday.getDay() !== 0) {
        nextSunday.setDate(nextSunday.getDate() + 1);
    }

    // Отфильтровать данные по дате, соответствующей фильтру последних 4 недель
    const filteredData = sortedData.filter(item => {
        const itemDate = /^\d+$/.test(item.date) ? new Date(+item.date) : new Date(item.date);

        itemDate.setUTCHours(0, 0, 0, 0);

        return itemDate >= fourWeeksAgo && itemDate <= nextSunday;
    });

    return {
        filteredData,
        start: fourWeeksAgo,
        end: nextSunday,
    };
}
