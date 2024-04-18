import {formateDate} from "../../../calendar/ui/drawer-modal/utils/formate-date.ts";
import {DayLoadInformationProps} from "./types/types.ts";
import './achievements-for-the-month.css';

export const DayLoadInformation = ({index, item}: DayLoadInformationProps) => {
    return (
        <div className='column_week_info_wrapper'>
            <div
                className='info_number_of_day'>{index + 1}</div>
            <span
                className='info_week_day_name'>{formateDate(item.date)}</span>
            <span
                className='info_day_load'>{item.load === 0 ? '' : `${item.load} кг`}</span>
        </div>
    );
};
