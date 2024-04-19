import {MostCommonWorkoutsBlockProps, PopularItems} from './types/types.ts';

import './most-common-workouts-block.css';
import {TrainingParams} from "../../../calendar/model/types/types.ts";
import {ALL_DAYS} from "../achievements-for-the-week/constant/constant.ts";

function getPopularData(filterTraining: TrainingParams[]) {
    const popularTraining: PopularItems = {};
    const popularExercise: PopularItems = {};

    for (let i = 0; i < filterTraining.length; i++) {
        const item: TrainingParams = filterTraining[i];

        if (popularTraining[item.name]) {
            popularTraining[item.name]++;
        } else {
            popularTraining[item.name] = 1;
        }

        for (let j = 0; j < item.exercises.length; j++) {
            const exercise: { name: string } = item.exercises[j];

            if (popularExercise[exercise.name]) {
                popularExercise[exercise.name]++;
            } else {
                popularExercise[exercise.name] = 1;
            }
        }
    }

    return {popularTraining, popularExercise};
}

function getMostPopular() {
    return (obj: PopularItems) => Object.keys(obj)?.reduce((a, b) => obj[a] > obj[b] ? a : b);
}

export const MostCommonWorkoutsBlock = ({filterTraining, segmentValue}: MostCommonWorkoutsBlockProps) => {
    const {popularTraining, popularExercise} = getPopularData(filterTraining);

    const mostPopular = getMostPopular();

    return (
        <div className='common_workouts_container'>
            {segmentValue === ALL_DAYS && <div className='common_workouts_wrapper'>
                <span className='common_workouts_title'>Самая частая тренировка</span>
                <span className='common_workouts_name'>{mostPopular(popularTraining)}</span>
            </div>}
            <div className='common_workouts_wrapper'>
                <span className='common_workouts_title'>Самое частое упражнение</span>
                <span className='common_workouts_name'>{mostPopular(popularExercise)}</span>
            </div>
        </div>
    );
};
