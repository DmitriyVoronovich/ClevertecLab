import Badge from "antd/lib/badge";
import {DateCellRenderProps} from "../types/types.ts";
import {useAppSelector} from "@hooks/typed-react-redux-hooks.ts";
import type {Dayjs} from "dayjs";
import {TrainingParams} from "../../../model/types/types.ts";
import {formateDate} from "../../drawerModal/utils/formateDate.ts";

export const DateCellRender = ({value}: DateCellRenderProps) => {
    const training = useAppSelector(state => state.calendar.training);
    const trainingList = useAppSelector(state => state.calendar.trainingList);

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
        <ul className="calendar_list">
            {listData.map((item) => {
                const color = trainingList.find(element => element.name === item.name)
                return (<li key={item._id} className={'calendar_list_item'}>
                    <Badge color={color?.color} text={item.name} style={{
                        fontWeight: '400',
                        fontSize: '12px',
                        lineHeight: '130%'
                    }}/>
                </li>)
            })}
        </ul>
    );
};
