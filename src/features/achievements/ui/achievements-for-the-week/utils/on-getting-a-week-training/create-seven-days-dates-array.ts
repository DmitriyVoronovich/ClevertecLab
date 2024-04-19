export const createSevenDaysDatesArray = () => Array(7)
    .fill(null)
    .map((_, index) => {
        const date = new Date();

        date.setUTCHours(0, 0, 0, 0);
        date.setDate(date.getDate() - index);

        return date.toISOString();
    });
