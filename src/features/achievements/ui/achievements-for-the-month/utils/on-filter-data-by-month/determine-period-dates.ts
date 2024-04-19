export const determinePeriodDates = () => {
    const fourWeeksAgo = new Date();

    fourWeeksAgo.setDate(fourWeeksAgo.getDate() - 27);
    while (fourWeeksAgo.getDay() !== 1) {
        fourWeeksAgo.setDate(fourWeeksAgo.getDate() + 1);
    }

    const nextSunday = new Date();

    while (nextSunday.getDay() !== 0) {
        nextSunday.setDate(nextSunday.getDate() + 1);
    }

    return {
        start: fourWeeksAgo,
        end: nextSunday,
    };
};
