import {DownOutlined, EditOutlined} from "@ant-design/icons";
import {TableSelectorData} from "@data/data.ts";
import {Button, Select, TableProps} from "antd";

import {TrainingParams} from "../../../../calendar/model/types/types.ts";
import {formateDate} from "../../../../calendar/ui/drawer-modal/utils/formate-date.ts";
import {Element} from "../element";
import {TableModal} from "../table-modal";
import {getSorter} from "../utils/sort.ts";

export const trainingColumns = (onModalOpen: (e: any) => void, modalOpen: boolean, onModalClose: () => void, modalStyle: {
    top: number;
    left: number
}, onEditDrawerOpen: (train: TrainingParams) => void, ref: React.MutableRefObject<HTMLDivElement>, onChangePeriodicity: (changePeriod: string) => void, value: string, formatPeriod: (period: number) => string | undefined) => {
    const columns: TableProps<TrainingParams>['columns'] = [
        {
            title: 'Тип тренировки',
            dataIndex: 'name',
            key: 'name',
            width: 240,
            fixed: 'left',
            render: (text, record) => (
                <>
                    <div onClick={(e) => onModalOpen(e)} className='training_element_wrapper'>
                        <Element title={text}/>
                        <DownOutlined size={14}/>
                    </div>
                    {modalOpen &&
                        <TableModal onModalClose={onModalClose}
                                    train={record} modalStyle={modalStyle}
                                    onEditDrawerOpen={onEditDrawerOpen}/>}
                </>
            )
        },
        {
            title: (
                <div ref={ref}>
                    <Select
                        onChange={onChangePeriodicity}
                        className="table_title_selector"
                        value={value}
                        virtual={false}
                        options={TableSelectorData.map((item) => ({
                            value: item.id,
                            label: (
                                <span className='date_title'>{item.title}</span>
                            ),
                        }))}
                    />
                </div>
            ),
            key: 'date',
            width: 240,
            sorter: getSorter(value),
            dataIndex: 'date',
            render: (date, record) => {
                let formatedDate;

                switch (value) {
                    case 'Сортировка по дате':
                        formatedDate = formateDate(date);
                        break;
                    case 'Периодичность':
                        formatedDate = formatPeriod(record.parameters.period);
                        break;
                    case 'Сортировка по дням':
                        formatedDate = formateDate(date);
                        break;
                    default:
                        formatedDate = formateDate(date);
                }

                return (<span className='training_element_wrapper'>
            {formatedDate}
            </span>)
            },
        },
        {
            title: '',
            key: 'jointTraining',
            width: 30,
            dataIndex: 'jointTraining',
            render: (_, record, index) => (
                <Button onClick={() => onEditDrawerOpen(record)} className='edit_button'
                        data-test-id={`update-my-training-table-icon${index}`}>
                    <EditOutlined
                        size={25}
                        className="edit_svg"
                    />
                </Button>
            ),
        },
    ];

    return columns;
}
