export const transformTrainingData = (selectedTraining: Array<{date: string | number, load: number}>) => selectedTraining.map(item => {
        const date = !isNaN(Number(item.date))
            ? new Date(Number(item.date))
            : new Date(item.date);

        return {
            date: date.toISOString(),
            load: item.load,
            dayOfWeek: date.getDay()
        };
    });
