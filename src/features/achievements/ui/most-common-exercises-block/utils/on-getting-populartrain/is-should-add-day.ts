export const isShouldAddDay = (trainList: Array<{
    date: string;
    mostPopularExercise: string;
    count: number
}>, day: string) => !trainList.find(item => item.date === day);
