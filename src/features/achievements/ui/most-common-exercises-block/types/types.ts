import {TrainingParams} from '../../../../calendar/model/types/types.ts';
import {ExerciseCount} from "../../achievements-for-the-month/types/types.ts";

export type MostCommonExercisesBlockProps = {
    filterTraining: TrainingParams[]
    section: string
};

export type TrainingDay = {
    date: string,
    mostPopularExercise: string,
    count: number,
    dayOfWeek: string
}

export type PopularWeekExercisesProps = {
    index: number
    item: TrainingDay
}

export type PopularExerciseByDate  = {
    [date: string]: ExerciseCount;
}

export type MostPopularExercise = {
    exercise: string;
    count: number;
}
