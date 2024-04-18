import {WeekDayLoadProps} from "./types/types.ts";

export const WeekDayLoad = ({index, day, load}: WeekDayLoadProps) => {
    return (
        <div className='column_info_wrapper'>
            <div className='info_number_of_day'>{index + 1}</div>
            <span className='info_day_name'>{day}</span>
            <span
                className='info_day_load'>{load === 0 ? '' : `${load} кг`}</span>
        </div>
    );
};
