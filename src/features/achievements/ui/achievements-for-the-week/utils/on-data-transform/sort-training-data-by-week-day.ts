export const sortTrainingDataByWeekDay = (modifiedLoadByDateArray: Array<{date: string, load: number, dayOfWeek: number}>) => {
    modifiedLoadByDateArray.sort((a, b) => {
        const dayA = a.dayOfWeek || 7;
        const dayB = b.dayOfWeek || 7;

        return dayA - dayB;
    });

    return modifiedLoadByDateArray;
};
