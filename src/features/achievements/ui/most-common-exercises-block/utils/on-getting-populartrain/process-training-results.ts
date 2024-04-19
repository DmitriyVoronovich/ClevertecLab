import {getCompareFn} from './get-compare-function.ts';

export const processTrainingResults = (trainingList: Array<{ date: string; mostPopularExercise: string; count: number }>) => trainingList.sort(getCompareFn());
