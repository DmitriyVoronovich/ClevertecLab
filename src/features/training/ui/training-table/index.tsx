import {useEffect, useRef, useState} from 'react';
import {PeriodicitySelectorData, TableSelectorData} from '@data/data.ts';
import {AddTrainingStatus, RequestTrainStatus} from '@enums/enums.ts';
import {useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import {Table} from 'antd';

import {TrainingParams} from '../../../calendar/model/types/types.ts';
import {AddErrorModal} from '../../../calendar/ui';
import {EditTrainingDrawer} from '../edit-training-modal';

import './training-table.css';
import {trainingColumns} from './components/training-columns.tsx';


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

        setModalStyle({left: rect.x + 10, top: rect.y});
        setModalOpen(true);
    };

    const onChangePeriodicity = (changePeriod: string) => {
        const period = TableSelectorData.find((item) => item.id === parseInt(changePeriod, 10));

        if (period?.title) {
            setValue(period.title)
        }
    };

    useEffect(() => {
        const observer = new MutationObserver(mutations => {

            for (const mutation of mutations) {

                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    const addedNode = mutation.addedNodes[0];

                    if (addedNode instanceof HTMLSpanElement && addedNode.getAttribute('aria-live') === 'polite') {
                        addedNode.innerText = 'Non visible text to fix';
                    }
                }
            }
        });

        observer.observe(ref.current, {childList: true, subtree: true});

        return () => {
            observer.disconnect();
        };
    }, []);

    const columns = trainingColumns(onModalOpen, modalOpen, onModalClose, modalStyle, onEditDrawerOpen, ref, onChangePeriodicity, value, formatPeriod);

    return (
        <>
            <div className='table_container'>
                <Table columns={columns}
                       dataSource={training}
                       className='tablet'
                       showSorterTooltip={false}
                       pagination={training.length < 10 ? false : {pageSize: 10}}
                       data-test-id='my-trainings-table'
                />
            </div>
            {
                editDrawerOpen &&
                <EditTrainingDrawer onClose={onEditDrawerClose} separateWorkout={separateWorkout}/>
            }
            {addTrainingStatus === AddTrainingStatus.Error && (
                <AddErrorModal onClose={onModalClose}/>
            )}
        </>

    );
};
