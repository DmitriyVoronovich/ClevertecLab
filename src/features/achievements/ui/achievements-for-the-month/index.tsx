import {useState} from 'react';
import {Column} from '@ant-design/plots';
import {useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import notTrain from '@image/not_train.png';
import {Card, Collapse, Segmented} from 'antd';

import {formateDate} from '../../../calendar/ui/drawer-modal/utils/formate-date.ts';
import {BlockWithLoadCards} from '../block-with-load-cards';
import {MostCommonExercisesBlock} from '../most-common-exercises-block';
import {MostCommonWorkoutsBlock} from '../most-common-workouts-block';

import {AchievementsForTheMonthProps} from './types/types.ts';
import {onFilterLastFourWeeks} from './utils/on-filter-data-by-month.ts';
import {onGettingMonthTraining} from './utils/on-getting-month-training.ts';

import '../achievements-for-the-week/achievements-for-the-week.css';
import './achievements-for-the-month.css';
import {useIsMobile} from "@utils/useIsMobile.ts";
import {DownOutlined} from "@ant-design/icons";

export const AchievementsForTheMonth = ({section}: AchievementsForTheMonthProps) => {
    const training = useAppSelector((state) => state.calendar.training);
    const [segmentValue, setSegmentValue] = useState('Все');
    const isMobile = useIsMobile();
    const { Panel } = Collapse;

    let segmentedFilteredTraining
    let selectedTraining

    const filteredWeekTraining = onFilterLastFourWeeks(training);

    if (segmentValue !== 'Все') {
        segmentedFilteredTraining = filteredWeekTraining.filteredData.filter((item) => item.name === segmentValue);

        selectedTraining = onGettingMonthTraining(segmentedFilteredTraining, filteredWeekTraining.start, filteredWeekTraining.end);

    } else {
        const weekTraining = onFilterLastFourWeeks(training);

        segmentedFilteredTraining = weekTraining.filteredData;
        selectedTraining = onGettingMonthTraining(weekTraining.filteredData, weekTraining.start, weekTraining.end);
    }

    const numSubArrays = 4;
    const lenSubArray = 7;
    const newArray = [];

    for (let i = 0; i < numSubArrays; i++) {
        newArray.push(selectedTraining.slice(i * lenSubArray, (i + 1) * lenSubArray));
    }

    const onHandleChange = (value: string) => setSegmentValue(value);

    const config = {
        axis: {
            lineExtension: [0, 2],
            y: {
                tick: false,
                labelFormatter: (datum) => `${datum} кг`
            },
            x: {
                tick: false,
            },
        },
        data: selectedTraining.map((item) => ({
            date: formateDate(item.date).slice(0, 5),
            load: item.load
        })),
        xField: 'date',
        yField: 'load',
        width: isMobile && 326,
        height: isMobile && 236,
        style: {
            maxWidth: 30,
        },
        scrollbar: {
            x: {
                ratio: 0.5,
            },
        },
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
                        <div className='column_month_container'>
                            <h6 className='column_month_info_title'>Средняя нагрузка по дням
                                недели</h6>
                            <Card className='column_month_card'>
                                <Column {...config}/>
                                <div className='column_month_title'>Нагрузка, кг</div>
                            </Card>
                            <div className='column_month_training_info_wrapper'>
                                {isMobile
                                    ? (
                                        newArray.map((week) => (
                                            <Collapse bordered={false} ghost={true} expandIconPosition="end"
                                                      expandIcon={({ isActive }) => <DownOutlined rotate={isActive ? 180 : 0} />}>
                                                <Panel
                                                    header={`Неделя ${formateDate(week[0].date).slice(0, 5)} - ${formateDate(week[6].date).slice(0, 5)}`}
                                                    key={week[0].date}>
                                                    {
                                                        week.map((item, index) => (
                                                            <div
                                                                className='column_week_info_wrapper'
                                                                key={item.date}>
                                                                <div
                                                                    className='info_number_of_day'>{index + 1}</div>
                                                                <span
                                                                    className='info_week_day_name'>{formateDate(item.date)}</span>
                                                                <span
                                                                    className='info_day_load'>{item.load === 0 ? '' : `${item.load} кг`}</span>
                                                            </div>
                                                        ))
                                                    }
                                                </Panel>
                                            </Collapse>
                                        ))
                                    )
                                    : (
                                        newArray.map((week) => (
                                            <div className='week_training_info_wrapper'>
                                                <span className='week_period'>
                                                    Неделя {formateDate(week[0].date).slice(0, 5)} - {formateDate(week[6].date).slice(0, 5)}
                                                </span>
                                                {
                                                    week.map((item, index) => (
                                                        <div className='column_week_info_wrapper'
                                                             key={item.date}>
                                                            <div
                                                                className='info_number_of_day'>{index + 1}</div>
                                                            <span
                                                                className='info_week_day_name'>{formateDate(item.date)}</span>
                                                            <span
                                                                className='info_day_load'>{item.load === 0 ? '' : `${item.load} кг`}</span>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        ))
                                    )
                                }

                            </div>
                        </div>
                        <BlockWithLoadCards filterTraining={segmentedFilteredTraining}
                                            training={selectedTraining}/>
                        <MostCommonWorkoutsBlock filterTraining={segmentedFilteredTraining}
                                                 segmentValue={segmentValue}/>
                        <MostCommonExercisesBlock section={section}
                                                  filterTraining={segmentedFilteredTraining}/>
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
