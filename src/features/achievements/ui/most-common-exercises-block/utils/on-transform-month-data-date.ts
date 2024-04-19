const days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

export const onTransformMonthDataDate = (training: Array<{
    count: number,
    date: string,
    mostPopularExercise: string | null
}>) => training.map(item => {
    const dayNumber = parseInt(item.date, 10);

    return {
        ...item,
        mostPopularExercise: item.mostPopularExercise || '',
        dayOfWeek: days[dayNumber]
    };
});
