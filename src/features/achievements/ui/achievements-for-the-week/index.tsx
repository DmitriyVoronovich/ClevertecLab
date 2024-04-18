import {useState} from 'react';
import {Column} from '@ant-design/plots';
import {useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import {Card, Segmented} from 'antd';

import notTrain from '../../../../assets/not_train.png';
import {formateDate} from '../../../calendar/ui/drawer-modal/utils/formate-date.ts';
import {BlockWithLoadCards} from '../block-with-load-cards';
import {MostCommonExercisesBlock} from '../most-common-exercises-block';
import {MostCommonWorkoutsBlock} from '../most-common-workouts-block';

import {AchievementsForTheWeekProps} from './types/types.ts';
import {onFilteredWeekTraining} from './utils/filtered-week-training.ts';
import {onDataTransform} from './utils/on-data-transform.ts';
import {onGettingWeekTraining} from './utils/on-getting-a-week-training.ts';

import './achievements-for-the-week.css';
import {useIsMobile} from "@utils/useIsMobile.ts";

export const AchievementsForTheWeek = ({section}: AchievementsForTheWeekProps) => {
    const training = useAppSelector((state) => state.calendar.training);
    const [segmentValue, setSegmentValue] = useState('Все');
    const isMobile = useIsMobile();

    let segmentedFilteredTraining
    let selectedTraining

    const filteredWeekTraining = onFilteredWeekTraining(training);

    if (segmentValue !== 'Все') {
        segmentedFilteredTraining = onFilteredWeekTraining(training).filter((item) => item.name === segmentValue);
        const weekTraining = filteredWeekTraining.filter((item) => item.name === segmentValue);

        selectedTraining = onGettingWeekTraining(weekTraining);

    } else {
        segmentedFilteredTraining = onFilteredWeekTraining(training);

        selectedTraining = onGettingWeekTraining(filteredWeekTraining);
    }

    const trainingDays = onDataTransform(selectedTraining)

    const onHandleChange = (value: string) => setSegmentValue(value);

    const config = {
        axis: {
            lineExtension: [0, 2],
            x: {
                tick: false,
            },
            y: {
                tick: false,
                labelFormatter: (datum) => `${datum} кг`,
            },
        },
        data: selectedTraining.map(item => ({
            date: formateDate(item.date).slice(0, 5),
            load: item.load
        })),
        xField: 'date',
        yField: 'load',
        width: isMobile ? 318 : 520,
        style: {
            maxWidth: 30,
        },
        scrollbar: {type: 'horizontal'},
    };

    const trainingsArePresent = selectedTraining.filter(item => item.load !== 0).length
        && segmentedFilteredTraining.length !== 0

    return (
        <div className='achievements_for_week_container'>
            <div className='load_chart_container'>
                <div className='load_chart_header'>
                    <span className='load_chart_type'>Тип тренировки:</span>
                    <Segmented<string>
                        className='load_chart_segmented'
                        options={['Все', 'Силовая', 'Ноги', 'Грудь', 'Спина', 'Руки']}
                        onChange={onHandleChange}
                    />
                </div>
                {trainingsArePresent
                    ? <>
                        <div className='column_container'>
                            <Card style={{backgroundColor: 'white'}}>
                                <Column {...config}/>
                                <span className='column_title'>Нагрузка, кг</span>
                            </Card>
                            <div className='column_training_info_wrapper'>
                                <h6 className='column_info_title'>Средняя нагрузка по дням
                                    недели</h6>
                                {trainingDays.map((item, index) => {
                                    return (
                                        <div className='column_info_wrapper' key={index}>
                                            <div className='info_number_of_day'>{index + 1}</div>
                                            <span className='info_day_name'>{item.dayOfWeek}</span>
                                            <span
                                                className='info_day_load'>{item.load === 0 ? '' : `${item.load} кг`}</span>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <BlockWithLoadCards filterTraining={segmentedFilteredTraining}
                                            training={selectedTraining}/>
                        <MostCommonWorkoutsBlock filterTraining={segmentedFilteredTraining}
                                                 segmentValue={segmentValue}/>
                        <MostCommonExercisesBlock section={section} filterTraining={segmentedFilteredTraining}/>
                    </>
                    : <div className='not_train_container'>
                        <img src={notTrain} alt='not found train image' className='not_train_img'/>
                        <p className='not_train_text'>Ой, такой тренировки на этой неделе не
                            было.</p>
                    </div>
                }
            </div>
        </div>
    );
};
