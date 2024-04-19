import {DayLoadInformationProps} from './types/types.ts';

import './achievements-for-the-month.css';

export const DayLoadInformation = ({index, name, load, color}: DayLoadInformationProps) => (
        <div className='column_week_info_wrapper'>
            <div style={{backgroundColor: `${color}`}}
                className='info_number_of_day'>{index + 1}</div>
            <span
                className='info_week_day_name'>{name}</span>
            <span
                className='info_day_load'>{load}</span>
        </div>
    );
