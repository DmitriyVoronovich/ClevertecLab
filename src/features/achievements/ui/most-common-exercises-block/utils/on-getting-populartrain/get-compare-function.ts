export const getCompareFn = () => (a: { date: string | number | Date; }, b: {
    date: string | number | Date;
}) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();

    return dateA - dateB;
}
