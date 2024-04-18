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
import {useIsMobile} from "@utils/use-is-mobile.ts";
import {DownOutlined} from "@ant-design/icons";
import {useIsTablet} from "@utils/use-is-tablet.ts";
import {columnMonthConfig} from "./utils/column-month-config.ts";
import {onFourWeekDivision} from "./utils/four-week-division.ts";
import {DayLoadInformation} from "./day-load-information.tsx";

export const AchievementsForTheMonth = ({section}: AchievementsForTheMonthProps) => {
    const training = useAppSelector((state) => state.calendar.training);
    const [segmentValue, setSegmentValue] = useState('Все');
    const isMobile = useIsMobile();
    const isTablet = useIsTablet();
    const { Panel } = Collapse;

    let segmentedFilteredTraining
    let selectedTraining

    const filteredWeekTraining = onFilterLastFourWeeks(training);

    if (segmentValue !== 'Все') {
        segmentedFilteredTraining = filteredWeekTraining.filteredData.filter((item) => item.name === segmentValue);
        selectedTraining = onGettingMonthTraining(segmentedFilteredTraining, filteredWeekTraining.start, filteredWeekTraining.end);

    } else {
        segmentedFilteredTraining = filteredWeekTraining.filteredData;
        selectedTraining = onGettingMonthTraining(filteredWeekTraining.filteredData, filteredWeekTraining.start, filteredWeekTraining.end);
        console.log(selectedTraining)
    }

    const fourWeekArray = onFourWeekDivision(selectedTraining);

    const onHandleChange = (value: string) => setSegmentValue(value);

    const config = columnMonthConfig(selectedTraining, isMobile, isTablet);

    const trainingsArePresent = selectedTraining.filter(item => item.load !== 0).length
        && segmentedFilteredTraining.length !== 0;

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
                                        fourWeekArray.map((week) => (
                                            <Collapse bordered={false} ghost={true} expandIconPosition="end"
                                                      expandIcon={({ isActive }) => <DownOutlined rotate={isActive ? 180 : 0} />}>
                                                <Panel
                                                    header={`Неделя ${formateDate(week[0].date).slice(0, 5)} - ${formateDate(week[6].date).slice(0, 5)}`}
                                                    key={week[0].date}>
                                                    {
                                                        week.map((item, index) => (
                                                            <DayLoadInformation index={index} item={item} key={index}/>
                                                        ))
                                                    }
                                                </Panel>
                                            </Collapse>
                                        ))
                                    )
                                    : (
                                        fourWeekArray.map((week) => (
                                            <div className='week_training_info_wrapper'>
                                                <span className='week_period'>
                                                    Неделя {formateDate(week[0].date).slice(0, 5)} - {formateDate(week[6].date).slice(0, 5)}
                                                </span>
                                                {
                                                    week.map((item, index) => (
                                                        <DayLoadInformation index={index} item={item} key={index}/>
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
