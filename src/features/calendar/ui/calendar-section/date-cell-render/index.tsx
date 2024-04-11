import { useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import type { Dayjs } from 'dayjs';

import { BadgeComponent } from '@components/badge-component';
import { TrainingParams } from '../../../model/types/types.ts';
import { formateDate } from '../../drawer-modal/utils/formate-date.ts';
import { DateCellRenderProps } from '../types/types.ts';

export const DateCellRender = ({ value }: DateCellRenderProps) => {
    const training = useAppSelector((state) => state.calendar.training);
    const trainingList = useAppSelector((state) => state.calendar.trainingList);

    const getListData = (value: Dayjs) => {
        const listData: TrainingParams[] = [];

        training.forEach((item) => {
            if (value.format('DD.MM.YYYY') === formateDate(item.date)) {
                listData.push(item);
            }
        });

        return listData;
    };

    const listData = getListData(value);

    return (
        <ul className='calendar_list'>
            {listData.map((item, index) => {
                const color = trainingList.find((element) => element.name === item.name);

                return (
                    <li key={item._id} className="calendar_list_item">
                        <BadgeComponent
                            name={item?.name}
                            color={color?.color}
                            index={index}
                            fontSize="12px"
                            fontWeight="400"
                        />
                    </li>
                );
            })}
        </ul>
    );
};
