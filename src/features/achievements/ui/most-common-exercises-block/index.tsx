import {Pie} from '@ant-design/plots';
import {POPULAR_MONTH_EXERCISES_TITLE, POPULAR_WEEK_EXERCISES_TITLE} from '@data/constant.ts';
import {useIsMobile} from '@utils/use-is-mobile.ts';

import {DayLoadInformation} from '../achievements-for-the-month/day-load-information.tsx';
import {
    onFindPopularExercisesInMonth
} from '../achievements-for-the-month/utils/on-find-popular-exercises-in-month/on-find-popular-exercises-in-month.ts';
import {PER_MONTH} from '../achievements-section/constant/constant.ts';

import {MostCommonExercisesBlockProps} from './types/types.ts';
import {onFindPopularExercises} from './utils/on-find-popular-exercises/on-find-popular-exercises.ts';
import {onTransformDataDate} from './utils/on-transform-data-date/on-transform-data-date.ts';
import {onTransformMonthDataDate} from './utils/on-transform-month-data-date.ts';
import {pieConfig} from './utils/pie-config/pie-config.ts';

import './most-common-exercises-block.css';

export const MostCommonExercisesBlock = ({
                                             filterTraining,
                                             section
                                         }: MostCommonExercisesBlockProps) => {
    const isMobile = useIsMobile();

    const resultList = section !== PER_MONTH
        ? onFindPopularExercises(filterTraining)
        : onFindPopularExercisesInMonth(filterTraining)
    const trainingDays = section !== PER_MONTH
        ? onTransformDataDate(resultList)
        : onTransformMonthDataDate(resultList)

    const config = pieConfig(trainingDays, isMobile);

    return (
        <div className='common_exercises_container'>
            <Pie {...config} />
            <div className='column_training_info_wrapper'>
                <h6 style={{width: '194px'}} className='column_info_title'>
                    {section !== PER_MONTH ? POPULAR_WEEK_EXERCISES_TITLE : POPULAR_MONTH_EXERCISES_TITLE}
                </h6>
                {trainingDays.map((item, index) => {
                    return (
                        <DayLoadInformation load={item.mostPopularExercise || ''}
                                            name={item.dayOfWeek}
                                            index={index}
                                            key={index}
                                            color='#FF4D4F'/>
                    )
                })}
            </div>
        </div>
    );
};
