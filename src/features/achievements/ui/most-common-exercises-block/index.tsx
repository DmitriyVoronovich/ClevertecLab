import {Pie} from '@ant-design/plots';

import {
    onFindPopularExercisesInMonth
} from '../achievements-for-the-month/utils/on-find-popular-exercises-in-month.ts';

import {MostCommonExercisesBlockProps} from './types/types.ts';
import {onFindPopularExercises} from './utils/on-find-popular-exercises.ts';
import {onTransformDataDate} from './utils/on-transform-data-date.ts';
import {onTransformMonthDataDate} from './utils/on-transform-month-data-date.ts';

import './most-common-exercises-block.css';
import {useIsMobile} from "@utils/use-is-mobile.ts";
import {pieConfig} from "./utils/pie-config.ts";
import {POPULAR_MONTH_EXERCISES_TITLE, POPULAR_WEEK_EXERCISES_TITLE} from "@data/constant.ts";
import {PopularWeekExercises} from "./popular-week-exercises.tsx";

export const MostCommonExercisesBlock = ({
                                             filterTraining,
                                             section
                                         }: MostCommonExercisesBlockProps) => {
    const isMobile = useIsMobile();

    let resultList
    let trainingDays

    if (section !== 'За месяц') {
        resultList = onFindPopularExercises(filterTraining);
        trainingDays = onTransformDataDate(resultList);
    } else {
        resultList = onFindPopularExercisesInMonth(filterTraining);

        trainingDays = onTransformMonthDataDate(resultList);
    }

    const config = pieConfig(trainingDays, isMobile);

    return (
        <div className='common_exercises_container'>
            <Pie {...config} />
            <div className='column_training_info_wrapper'>
                <h6 style={{width: '194px'}} className='column_info_title'>
                    {section !== 'За месяц' ? POPULAR_WEEK_EXERCISES_TITLE : POPULAR_MONTH_EXERCISES_TITLE}
                </h6>
                {trainingDays.map((item, index) => {
                    return (
                        <PopularWeekExercises index={index} key={index} item={item}/>
                    )
                })}
            </div>
        </div>
    );
};
