import {useEffect, useRef, useState} from 'react';
import {DownOutlined, EditOutlined} from '@ant-design/icons';
import {PeriodicitySelectorData, TableSelectorData} from '@data/data.ts';
import {AddTrainingStatus, RequestTrainStatus} from '@enums/enums.ts';
import {useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import {Button, Select, Table, TableProps} from 'antd';

import {TrainingParams} from '../../../calendar/model/types/types.ts';
import {AddErrorModal} from '../../../calendar/ui';
import {formateDate} from '../../../calendar/ui/drawer-modal/utils/formate-date.ts';
import {EditTrainingDrawer} from '../edit-training-modal';

import {Element} from './element';
import {TableModal} from './table-modal';

import './training-table.css';


export const TrainingTable = () => {
    const training = useAppSelector((state) => state.calendar.training);
    const requestTrainStatus = useAppSelector((state) => state.training.requestTrainStatus);
    const addTrainingStatus = useAppSelector((state) => state.calendar.addTrainingStatus);
    const ref = useRef<HTMLDivElement>(document.createElement('div'));
    const [modalOpen, setModalOpen] = useState(false);
    const [value, setValue] = useState(TableSelectorData[0].title);
    const [modalStyle, setModalStyle] = useState({left: 0, top: 0});
    const [editDrawerOpen, setEditDrawerOpen] = useState(false);
    const [separateWorkout, setSeparateWorkout] = useState<TrainingParams>({} as TrainingParams);

    useEffect(() => {
        if (requestTrainStatus === RequestTrainStatus.Succeeded) {
            setModalOpen(false);
        }
    }, [requestTrainStatus]);

    const onModalClose = () => setModalOpen(false);

    const onEditDrawerOpen = (train: TrainingParams) => {
        setEditDrawerOpen(true);
        setSeparateWorkout(train);
    };

    const onEditDrawerClose = () => setEditDrawerOpen(false);

    const formatPeriod = (period: number) => PeriodicitySelectorData.find((item) => item.key === period)?.title;

    const onModalOpen = (e: any) => {
        const rect = e.target.getBoundingClientRect();

        setModalStyle({left: rect.x + 10, top: rect.y})
        setModalOpen(true);
    }

    const onChangePeriodicity = (changePeriod: string) => {
        const period = TableSelectorData.find((item) => item.id === parseInt(changePeriod, 10));

        if (period?.title) {
            setValue(period.title)
        }
    };


    const columns: TableProps<TrainingParams>['columns'] = [
        {
            title: 'Тип тренировки',
            dataIndex: 'name',
            key: 'name',
            width: 240,
            fixed: 'left',
            render: (text, record) => (
                <>
                    <div onClick={(e) => onModalOpen(e)} className='training_element_wrapper'
                         ref={ref}>
                        <Element title={text}/>
                        <DownOutlined size={14}/>

                    </div>
                    {modalOpen &&
                        <TableModal onModalClose={onModalClose}
                                    train={record} modalStyle={modalStyle} onEditDrawerOpen={onEditDrawerOpen}/>}
                </>
            )
        },
        {
            title: () => (
                    <Select
                        onChange={onChangePeriodicity}
                        className="table_title_selector"
                        value={value}
                        options={TableSelectorData.map((item) => ({
                            value: item.id,
                            label: (
                                <span className='date_title'>{item.title}</span>
                            ),
                        }))}
                    />
                ),
            key: 'date',
            width: 240,
            sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
            dataIndex: 'date',
            render: (date, record) => {

                let formatedDate;

                switch (value) {
                    case 'Сортировка по дате':
                        formatedDate = formateDate(date);
                        break;
                    case 'Переодичность':
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
                <Button onClick={() => onEditDrawerOpen(record)} className='edit_button' data-test-id={`update-my-training-table-icon${index}`}>
                    <EditOutlined
                        size={25}
                        className="edit_svg"
                    />
                </Button>
            ),
        },
    ];

    return (
        <>
            <div className='table_container'>
                <Table columns={columns}
                       dataSource={training}
                       className='tablet'
                       showSorterTooltip={false}
                       pagination={training.length < 14 ? false : {pageSize: 14}}
                       data-test-id='my-trainings-table'
                />
            </div>
            {
               editDrawerOpen && <EditTrainingDrawer onClose={onEditDrawerClose} separateWorkout={separateWorkout}/>
            }
            {addTrainingStatus === AddTrainingStatus.Error && (
                <AddErrorModal onClose={onModalClose} />
            )}
        </>

    );
};
