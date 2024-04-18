export const onGettingPopularTrain = (trainList: { date: string, mostPopularExercise: string, count: number}[]) => {
    const lastSevenDays = Array(7).fill(null).map((_, index) => {
        const date = new Date();

        date.setUTCHours(0, 0, 0, 0)
        date.setDate(date.getDate() - index);

        return date.toISOString();
    });

    lastSevenDays.forEach(day => {
        // Проверяем, есть ли этот день уже в loadByDateArray
        const existingDay = trainList.find(item => item.date === day);

        // Если день не найден, добавляем его с нагрузкой 0
        if (!existingDay) {
            trainList.push({
                date: day,
                mostPopularExercise: '',
                count: 0
            });
        }

    });

    return trainList.sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();

        return dateA - dateB;
    });
}
