import {Pie} from '@ant-design/plots';

import {TrainingParams} from '../../../calendar/model/types/types.ts';

import {onFindPopularExercises} from './utils/on-find-popular-exercises.ts';
import {onTransformDataDate} from './utils/on-transform-data-date.ts';
import {onTransformMonthDataDate} from './utils/on-transform-month-data-date.ts';

import './most-common-exercises-block.css';
import {
    onFindPopularExercisesInMonth
} from "../achievements-for-the-month/utils/on-find-popular-exercises-in-month.ts";

export type MostCommonExercisesBlockProps = {
    filterTraining: TrainingParams[]
    section: string
}

export const MostCommonExercisesBlock = ({
                                             filterTraining,
                                             section
                                         }: MostCommonExercisesBlockProps) => {
    let resultList
    let trainingDays

    console.log(filterTraining)
    if (section !== '2') {
        resultList = onFindPopularExercises(filterTraining);
        trainingDays = onTransformDataDate(resultList);
    } else {
        resultList = onFindPopularExercisesInMonth(filterTraining);
        console.log(resultList)
        trainingDays = onTransformMonthDataDate(resultList);
    }

    const config = {
        data: trainingDays,
        axis: {
            y: {
                tick: false,
            },
            x: {
                tick: false,
            },
        },
        angleField: 'count',
        colorField: 'mostPopularExercise',
        innerRadius: 0.3,
        radius: 0.4,
        legend: false,
        width: 520,
        height: 334,
        style: {
            width: '156px'
        },
        label: {
            text: 'mostPopularExercise',
            style: {
                fontWeight: 'bold',
            },
            connector: false,
            position: 'outside',
            line: false,
        },
    };

    return (
        <div className='common_exercises_container'>
            <Pie {...config} />
            <div className='column_training_info_wrapper'>
                <h6 style={{width: '194px'}} className='column_info_title'>
                    {section !== '2' ? 'Самые частые упражнения по дням недели' : 'Самые частые упражнения по дням недели за месяц'}
                </h6>
                {trainingDays.map((item, index) => {
                    return (
                        <div className='column_info_wrapper' key={index}>
                            <div className='info_number_of_day'
                                 style={{backgroundColor: 'red'}}>{index + 1}</div>
                            <span className='info_day_name'>{item.dayOfWeek}</span>
                            <span
                                className='info_day_load'>{item.mostPopularExercise === '' || item.mostPopularExercise === null
                                ? '' : `${item.mostPopularExercise}`}</span>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};
