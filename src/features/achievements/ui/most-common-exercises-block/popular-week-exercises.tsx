import {PopularWeekExercisesProps} from "./types/types.ts";

export const PopularWeekExercises = ({index, item}: PopularWeekExercisesProps) => {
    return (
        <div className='column_info_wrapper'>
            <div className='info_number_of_day'
                 style={{backgroundColor: 'red'}}>{index + 1}</div>
            <span className='info_day_name'>{item.dayOfWeek}</span>
            <span
                className='info_day_load'>{item.mostPopularExercise === '' || item.mostPopularExercise === null
                ? '' : `${item.mostPopularExercise}`}</span>
        </div>
    );
};
