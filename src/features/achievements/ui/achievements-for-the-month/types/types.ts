export type AchievementsForTheMonthProps = {
    section: string
};

export type ExerciseCount = {
    [exercise: string]: number;
};

export type PopularExercisesByWeekDay = {
    [day: number]: ExerciseCount;
};

export type PopularExercise = {
    exercise: string | null;
    count: number;
};

export type LoadByDate = {
    [date: string]: number;
};

export type LoadByDateItem = {
    date: string;
    load: number;
};

export type DayLoadInformationProps = {
    color?: string
    index: number
    name: string
    load: string
}
