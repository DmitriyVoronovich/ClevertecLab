export const formatTrainingResults = (modifiedLoadByDateArray: Array<{date: string, load: number, dayOfWeek: number}>) => modifiedLoadByDateArray.map((item) => {
        const dateObject = new Date(item.date);
        const formatter = new Intl.DateTimeFormat('ru', { weekday: 'long', });

        return {
            date: item.date,
            load: item.load,
            dayOfWeek: formatter.format(dateObject)
        }
    });
