import {isShouldAddDay} from './is-should-add-day.ts';

export const appendTrainingList = (trainingList: Array<{ date: string; mostPopularExercise: string; count: number }>, sevenDaysArray: string[]) => {
    sevenDaysArray.forEach(day =>
        isShouldAddDay(trainingList, day) &&
        trainingList.push({
            date: day,
            mostPopularExercise: '',
            count: 0
        })
    );
};
