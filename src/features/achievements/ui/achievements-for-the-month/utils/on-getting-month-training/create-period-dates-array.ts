export const createPeriodDatesArray = (startDate: string, endDate: string) => {
    const startDateObj = new Date(startDate);

    startDateObj.setUTCHours(0, 0, 0, 0);

    const endDateObj = new Date(endDate);

    endDateObj.setUTCHours(0, 0, 0, 0);

    const daysDiff = Math.ceil((endDateObj.valueOf() - startDateObj.valueOf()) / (1000 * 3600 * 24)) + 1;

    return Array(daysDiff).fill(null).map((_, index) => {
        const date = new Date(startDate);

        date.setUTCHours(0, 0, 0, 0);
        date.setDate(date.getDate() + index);

        return date.toISOString();
    });
};
