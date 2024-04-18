export const onTransformMonthDataDate = (training: Array<{count: number, day: string, mostPopularExercise: string | null}>) => {
    const days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

    return training.map(item => {
        const dayNumber = parseInt(item.day, 10);

        return {
            ...item,
            mostPopularExercise: item.mostPopularExercise === null ? '' : item.mostPopularExercise,
            dayOfWeek: days[dayNumber]
        };
    });

}
