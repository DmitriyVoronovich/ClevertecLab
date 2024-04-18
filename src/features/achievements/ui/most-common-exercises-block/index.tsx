import {Pie} from '@ant-design/plots';

import {
    onFindPopularExercisesInMonth
} from '../achievements-for-the-month/utils/on-find-popular-exercises-in-month.ts';

import {MostCommonExercisesBlockProps} from './types/types.ts';
import {onFindPopularExercises} from './utils/on-find-popular-exercises.ts';
import {onTransformDataDate} from './utils/on-transform-data-date.ts';
import {onTransformMonthDataDate} from './utils/on-transform-month-data-date.ts';

import './most-common-exercises-block.css';
import {useIsMobile} from "@utils/useIsMobile.ts";

export const MostCommonExercisesBlock = ({
                                             filterTraining,
                                             section
                                         }: MostCommonExercisesBlockProps) => {
    const isMobile = useIsMobile();

    let resultList
    let trainingDays

    if (section !== '2') {
        resultList = onFindPopularExercises(filterTraining);
        trainingDays = onTransformDataDate(resultList);
    } else {
        resultList = onFindPopularExercisesInMonth(filterTraining);

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
        width: isMobile? 318 : 520,
        height: isMobile? 211 : 334,
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
