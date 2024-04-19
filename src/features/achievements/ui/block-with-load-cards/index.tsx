import {useIsMobile} from '@utils/use-is-mobile.ts';
import {Card, Statistic} from 'antd';

import {BlockWithLoadCardsProps} from './types/types.ts';
import {getCardWidth} from './utils/get-card-width.ts';
import {getFormatNumber} from './utils/get-format-number.ts';
import {onCalculationLoadPerDay} from './utils/on-calculation-load-per-day.ts';
import {onGetApproaches} from './utils/on-get-approaches.ts';
import {onGetNumberOfRepetitions} from './utils/on-get-number-of-repetitions.ts';
import {onGetTotalLoad} from './utils/on-get-total-load.ts';

import './block-with-load-cards.css';

export const BlockWithLoadCards = ({filterTraining, training}: BlockWithLoadCardsProps) => {
    const isMobile = useIsMobile();

    const totalLoad = onGetTotalLoad(training);
    const loadPerDay = onCalculationLoadPerDay(totalLoad, training);
    const numberOfRepetitions = onGetNumberOfRepetitions(filterTraining);
    const approaches = onGetApproaches(filterTraining);
    const formatNumber = getFormatNumber();

    return (
        <div className='block_load_card_container'>
            <Card style={getCardWidth(isMobile)} className='load_card_wrapper'>
                <Statistic title="Общая нагрузка, кг" value={totalLoad} />
            </Card>
            <Card style={getCardWidth(isMobile)} className='load_card_wrapper'>
                <Statistic title="Нагрузка в день, кг" value={loadPerDay} precision={1} formatter={formatNumber}/>
            </Card>
            <Card style={getCardWidth(isMobile)} className='load_card_wrapper'>
                <Statistic title="Количество повторений, раз" value={numberOfRepetitions}/>
            </Card>
            <Card style={getCardWidth(isMobile)} className='load_card_wrapper'>
                <Statistic title="Подходы, раз" value={approaches}/>
            </Card>
        </div>
    );
};
